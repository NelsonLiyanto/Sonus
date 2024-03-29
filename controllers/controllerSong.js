const {Users,Profiles,Songs,PlaylistContents,Playlists} = require('../models/index')
const {Howl, Howler} = require('howler');
const {Op} = require('sequelize')
const fs = require('fs').promises
const time = require('../helpers/time')
class ControllerSong{
    static async renderSong(req,res){
        try {
            let search = ""
            if(req.query.search) search = req.query.search
            let songs = await Songs.findAll({
                where:{
                    title:{
                        [Op.iLike] : `%${search}%`
                    }
                }
            })
            res.render('songs',{songs,time})
        } catch (error) {
            res.send(error)
        }
    }
    static async renderPlayer (req,res){
        let id = req.params.songId
        let Song = await Songs.findOne({
            where:{
                id
            }
        })
        let path = Song.path

        res.render('player',{path,Song})
    }
    static async sendFile(req,res){
        let path = req.params.filename
        let audio = await fs.readFile(`./data/songs/${path}`)
        res.send(audio)
    }
}

module.exports = ControllerSong