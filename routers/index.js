const router = require('express').Router()
const ControllerLanding = require('../controllers/controllerUser')
const ControllerProfile = require('../controllers/controllerProfile')
const ControllerPlaylists = require('../controllers/controllerPlaylist')
const ControllerSong = require('../controllers/controllerSong')

router.get('/',(req,res)=>{
    res.redirect('/sonus')
})
router.get('/sonus',ControllerLanding.renderLanding) //Landing. Check if session exists. If so, send user to /sonus/profile

router.get('/sonus/register',ControllerLanding.renderRegister) //Register
router.post('/sonus/register',ControllerLanding.registerUser) //Post register data

router.get('/sonus/login',ControllerLanding.renderLogin) //Login
router.post('/sonus/login',ControllerLanding.loginValidation) //Post login data

router.use((req,res,next)=>{
    if(req.session.userId){
        next()
    } else{
        let error = 'Please login first!'
        res.redirect(`/sonus/login?error=${error}`)
    }
})

router.get('/sonus/profile',ControllerProfile.renderProfile) //Profile page
router.get('/sonus/profile/setup',ControllerProfile.renderSetup) //Profile setup for a new user
router.post('/sonus/profile/setup',ControllerProfile.saveSetup) //Post profile data
router.get('/sonus/profile/edit',ControllerProfile.renderEdit) //Edit profile data
router.post('/sonus/profile/edit',ControllerProfile.editProfile) //Edit profile data
router.get('/sonus/profile/playlist/add',ControllerPlaylists.renderAdd)   //If playlist exists, only allow edit/delete
router.post('/sonus/profile/playlist/add',ControllerPlaylists.addPlaylist)   
router.get('/sonus/profile/playlist/edit',ControllerPlaylists.renderEdit)  //Disable edit & delete if playlist does not exist
router.post('/sonus/profile/playlist/edit',ControllerPlaylists.editPlaylist)  
router.get('/sonus/profile/playlist/delete',ControllerPlaylists.deletePlaylist)

router.get('/sonus/playlists', ControllerPlaylists.renderPlaylists) //Browseplaylists

router.get('/sonus/songs', ControllerSong.renderSong)    //Browse songs
router.get('/sonus/songs/file/:filename',ControllerSong.sendFile)
router.get('/sonus/songs/:songId',ControllerSong.renderPlayer)    //Play specific song

router.get('/sonus/player')
module.exports = router