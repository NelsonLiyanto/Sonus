const e = require('express')
const {Users,Profiles,Songs,PlaylistContents,Playlists} = require('../models/index')
let session = require('express-session')
class ControllerProfile{
    static async renderProfile(req,res){
        try {
            let id = req.session.userId
            let profile =await Profiles.findOne({
                where:{
                    UserId:id
                }
            })
            let playlist = await Playlists.findOne({
                where:{
                    ProfileId:id
                },
                include:{
                    model:PlaylistContents,
                    include:Songs
                }
            })
            let emoji = Playlists.randomEmoji()
            console.log(emoji);
            if(!profile) res.redirect('/sonus/profile/setup')
            res.render('profile',{profile,playlist,emoji})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async renderSetup(req,res){
        try {
            let errors = []
            if(req.query.error) errors = req.query.error.split(',') 
            res.render('setup',{errors})
        } catch (error) {
            res.send(error)
        }
    }
    static async saveSetup(req,res){
        try {
            let id = req.session.userId
            let profileData = req.body
            profileData.UserId = id
            await Profiles.create(profileData)
            res.redirect('/sonus/profile')

        } catch (error) {
            if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
                let errorMsg = error.errors.map(el=>el.message)
                res.redirect(`/sonus/profile/setup?error=${errorMsg}`)
            }
            else{
                res.send(error)
            }
        }
    }
    static async renderEdit(req,res){
        try {
            let id = req.session.userId
            let errors = []
            if(req.query.error) errors = req.query.error.split(',') 
            let profile = await Profiles.findOne({
                where:{
                    UserId:id
                }
            })
            res.render('edit',{profile,errors})
        } catch (error) {
            res.render(error)
        }
    }
    static async editProfile(req,res){
        try {
            let id = req.session.userId
            let profileData = req.body
            await Profiles.update(profileData,{
                where:{
                    UserId:id
                }
            })
            res.redirect('/sonus/profile')
        } catch (error) {
            if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
                let errorMsg = error.errors.map(el=>el.message)
                res.redirect(`/sonus/profile/edit?error=${errorMsg}`)
            }
            else{
                res.send(error)
            }
        }
    }
}
module.exports = ControllerProfile