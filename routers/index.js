const router = require('express').Router()
const ControllerLanding = require('../controllers/controllerUser')
const ControllerProfile = require('../controllers/controllerProfile')
const e = require('express')

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
router.get('/sonus/profile/setup') //Profile setup for a new user
router.post('/sonus/profile/setup') //Post profile data
router.get('/sonus/profile/edit') //Edit profile data
router.post('/sonus/profile/edit') //Edit profile data
router.get('/sonus/profile/playlist') //User's personal playlist
router.get('/sonus/profile/playlist/add')   //If playlist exists, only allow edit/delete
router.get('/sonus/profile/playlist/edit')  //Disable edit & delete if playlist does not exist
router.get('/sonus/profile/playlist/delete')

router.get('/sonus/others') //Other users' profiles
router.get('/sonus/others/:sonusId')    //View one spesific profile

router.get('/playlists') //Browseplaylists
router.get('/playlists/:playlistId') //Browseplaylists

router.get('/songs')    //Browse songs
router.get('/songs/:songId')    //View specific song


module.exports = router