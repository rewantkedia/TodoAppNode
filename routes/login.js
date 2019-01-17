const router = require('express').Router();

router.get('/signin',(req,res)=>{
    // res.send('You are in the sign in page');
    res.render('signin');
});

router.get('/signup',(req,res)=>{
    // res.send('You are in the sign up page');
    res.render('signup');
})
module.exports = router;