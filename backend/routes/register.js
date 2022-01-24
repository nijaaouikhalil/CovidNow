const express = require('express')
const router = express.Router()
const registerModel = require('../models/registerModel')
const bcrypt = require('bcrypt')
const {checkNotAuthenticated} = require('../checkAuth')

router.get('/',checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})


router.post('/',checkNotAuthenticated, async (req, res) => {
    try{
        
        if(req.body.password != req.body.cpassword){
            console.log("Passwords do not match")
            res.redirect('/register')
        }else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const signedUpUser = new registerModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            
            signedUpUser.save()
            res.redirect('/login')
        }    
    }catch(e){
        res.redirect('/register')
    }
})

module.exports = router
