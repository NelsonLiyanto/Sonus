const express = require('express')
const app = express()
const routers = require('./routers/index')
const port = 3000
const session = require('express-session')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'PrestigeLTD8970',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure:false,
        sameSite:true
    }
}))

app.use(routers)

app.listen(port,()=>{
    console.log(`listening at ${port}`);
})