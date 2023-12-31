const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const Story = require('../models/Story')


// @desc login landing page
// GET /

router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'login'
    })
})

//@desc dashboard page
// GET /dashboard
router.get('/dashboard', ensureAuth, async (req,res) => {
        try{
            const stories = await Story.find({ user: req.user.id }).lean()
            //!lean will parse the data we get back into plain json so handlebars cans use it
            res.render('dashboard', {
                name: req.user.firstName,
                stories
            })
        }catch(err){
            console.error(err)
            res.render('/error/500')
        }

        
    })



module.exports = router