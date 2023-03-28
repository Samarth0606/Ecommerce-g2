const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
// const passport = require('passport');
// const { registerForm, registerNewUser, loginForm, loginUser,logoutUser } = require('../controllers/auth');

// router.get('/fakeuser', async(req, res) => {
    

    // const user = {
    //     email: 'samarth@gmail.com',
    //     username:'samarth'
    // }
    // const newUser = await User.register(user, 'sam123');

    // res.send(newUser);
// });


router.get('/register' , (req,res)=>{
    res.render('auth/signup');
})

router.post('/register' , async(req,res)=>{
    let {email,username,password} = req.body;
    const user = new User({email,username});
    const newUser = await User.register(user,password);
    res.send(newUser);
})

router.get('/login' , (req,res)=>{
    res.render('auth/login');
})
        
    
router.post('/login',
    passport.authenticate('local', { 
       failureRedirect: '/login', 
       failureMessage: true ,
    }),
    function(req, res) {
        // console.log(req.user);
        req.flash('success' , `welcome back ${req.user.username}`)
        res.redirect('/products');
    }
);

router.get('/logout',(req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success' , 'goodbye friend');
    res.redirect('/products');
});

module.exports = router;