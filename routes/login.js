const router = require('express').Router();
const User = require('../models/user-model');
const passport = require('passport');
const local_strategy = require('../passport/local_strategy');

router.get('/signin',(req,res)=>{
    res.render('signin',{message:req.query.message});
});

// router.post('/signin',passport.authenticate('local',{
//     failureRedirect: '/login/signin'
// },(err,user,info)=>{
//     var url = '/login/signin?message='+info.message;
//     // console.log(url);
//     res.redirect(url);
// }),(req,res)=>{
    
//     console.log(req.user);
//     res.send(req.body);
//     //handling passport
// });

router.post('/signin', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
    if (err) {
           return next(err);
    }
    if (!user) {
        var url = '/login/signin?message='+info.message;
        console.log(url);
        res.redirect(url);
    }
    req.login(user, function(err) {
        if (err) { return next(err); }
        // res.send(req.user);
        req.session.user = req.user;
        console.log("EXE");
        console.log(req.user);
        return (req,res.redirect('/users/'));
    });
    // req.login(user,()=>{
    //     console.log(req.user);
    // });
    })(req, res, next);
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