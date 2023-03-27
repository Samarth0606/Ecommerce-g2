const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/fakeuser' , async(req,res)=>{

    const user = {
        email:'sam@gmail.com',
        username:'sam'
    }

    await User.register(user,'sam123');
    res.send(user);

})


module.exports = router;