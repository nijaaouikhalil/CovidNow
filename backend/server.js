if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const indexUrls = require('./routes/index')
const registerUrls = require('./routes/register')
const loginUrls = require('./routes/login')
const cors = require('cors')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const registerModel = require('./models/registerModel')
const initializePassport = require('./passport-config')
const methodOverride = require('method-override')


mongoose.connect(process.env.DATABASE_URL, () => console.log("Database Connected"))

//middleware
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(flash())
app.use(cors())
app.use(methodOverride('_method'))

//Passport.js
initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

//express routes
app.use(indexUrls)
app.use('/register', registerUrls)
app.use('/login', loginUrls)

app.listen(3000, () => console.log("server is up and running"))

