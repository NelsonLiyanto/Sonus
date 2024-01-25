const e = require('express')
const {Users,Profiles,Songs,PlaylistContents,Playlists} = require('../models/index')
class ControllerPlaylists{
    static async renderPlaylists(req,res){
        try {
            let id = req.session.userId
            let playlists = await Playlists.findAll({
                include:{
                    model:PlaylistContents,
                    include:Songs
                }
            })
            res.render('playlists',{playlists})
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
    static async renderAdd(req,res){
        try {
            let errors = []
            if(req.query.error) errors = req.query.error.split(',') 
            let songs = await Songs.findAll()
            res.render('addPlaylist',{errors,songs})
        } catch (error) {  
            res.send(error)
        }
    }
    static async addPlaylist(req,res){
        try {
            let id = req.session.userId
            let profile = await Profiles.findOne({
                where:{
                    UserId: id
                }
            })
            let newPlaylist = req.body
            let songId = newPlaylist.SongId
            newPlaylist.ProfileId = profile.id
            delete newPlaylist.SongId
            await Playlists.create(newPlaylist)

            let playlistId = await Playlists.findOne({
                where:{
                    ProfileId:profile.id
                }
            })
            if(typeof songId == "string"){
                await PlaylistContents.create({
                    PlaylistId:playlistId.id,
                    SongId:songId
                })
            } else{
                console.log(`string`);

                let multipleSongs = songId.map((el)=>{
                    return {
                        PlaylistId:playlistId.id,
                        SongId:el
                    }
                })
                for(const song of multipleSongs){
                    await PlaylistContents.create(song)
                }
            }

            res.redirect('/sonus/profile')
        } catch (error) {
            if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
                let errorMsg = error.errors.map(el=>el.message)
                res.redirect(`/sonus/playlist/add?error=${errorMsg}`)
            }
            else{
                res.send(error)
                console.log(error);
            }
        }
    }
    static async renderEdit(req,res){
        try {

        } catch (error) {
            res.send(error)
        }
    }
    static async editPlaylist(req,res){
        try {
            
        } catch (error) {
            
        }
    }
    static async deletePlaylist(req,res){
        try {
            let id = req.session.userId
            await Playlists.destroy({where:{ProfileId:id}})
            res.redirect('/sonus/profile')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = ControllerPlaylists