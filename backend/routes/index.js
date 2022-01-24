const express = require('express')
const router = express.Router()
const {checkAuthenticated} = require('../checkAuth')

router.get('/',checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

router.delete('/logout', (req,res) => {
    req.logOut()
    res.redirect('/login')
})

module.exports = router