const router = require('express').Router();
const User = require('../models/user-model');

router.get('/signin',(req,res)=>{
    res.render('signin',{message:req.query.message});
});

router.get('/signup',(req,res)=>{
    res.render('signup',{message:req.query.message});
});

router.post('/signup',(req,res)=>{
  
    username = req.body.username;
    password = req.body.password;
    User.findOne({username:username}).then((user)=>{
        if(!user)
        {
            User.create({username:username,password:password}).then((user)=>{
                console.log('User Created');
                res.redirect('/login/signin?message=UserCreated');
            });
        }
        else
        {
            console.log('User Exists');
            res.redirect('/login/signup?message=UserIdExists');
        }
    });

});
module.exports = router;