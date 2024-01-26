const {Users,Profiles,Songs,PlaylistContents,Playlists} = require('../models/index')
let session = require('express-session')
let bcrypt = require('bcryptjs')
class ControllerLanding{
    static async renderLanding(req,res){
        try {
            if(req.session.userId) delete req.session.userId
            res.render('landing')      
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async renderRegister(req,res){
        let errors = []
        if(req.query.error) errors = req.query.error.split(',')
        res.render('register',{errors})
}
    static async registerUser(req,res){
        try {
            let newUser = req.body
            await Users.create(newUser)
            let msg = `Please login first.`
            res.redirect(`/sonus/login?error=${msg}`)
        } catch (error) {
            if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
                let errorMsg = error.errors.map(el=>{
                    return el.message
                })
                res.redirect(`/sonus/register?error=${errorMsg}`)
            }
        }
    }
    static async renderLogin(req,res){
        let errors = []
        if(req.query.error) errors = req.query.error.split(',')
        res.render('login',{errors})
    }
    static async loginValidation(req,res){
        try {
            let {email,password} = req.body
        
            Users.findOne({where:{email},}).then((user) => {
                if(user){
                    const isPasswordValid = bcrypt.compareSync(password,user.password)
                    if(isPasswordValid){
                        req.session.userId = user.id
                        res.redirect('/sonus/profile')
                    }
                    else {
                        let error = 'Email/Password is invalid!'
                        res.redirect(`/sonus/login?error=${error}`)
                    }
                } else{
                    let error = 'Email is not found!'
                    res.redirect(`/sonus/login?error=${error}`)
                }
            }).catch((err) => {
                throw err
            });
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
}

module.exports = ControllerLanding