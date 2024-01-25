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
            console.log(profile);
            res.render('profile',{profile})
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = ControllerProfile