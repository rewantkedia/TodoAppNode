const router = require('express').Router();

router.get('/signin',(req,res)=>{
    // res.send('You are in the sign in page');
    res.render('signin');
});

router.get('/signup',(req,res)=>{
    // res.send('You are in the sign up page');
    res.render('signup');
});
router.post('/signup',(req,res)=>{
    console.log('REQUEST');
    console.log(req);
    console.log('REQUESTBODY');
    console.log(req.body);
});
module.exports = router;