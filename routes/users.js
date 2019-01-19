const router = require('express').Router();
const User = require('../models/user-model');
router.get('/',(req,res)=>{
    // res.send('You are logged in as '+req.user.username);
    // console.log(req.user);
    // console.log(req.user);
    var todos;
    User.findOne({username:req.user.username}).then((user)=>{
        todos = user.todo;
        console.log("TODOS ARE");
        console.log(todos.length);
        if(todos.length>0)
        res.render('users',{username:req.user.username,todos:todos}); //passing data to ejs template
        else
        res.render('users',{username:req.user.username});
    })
});
router.post('/add',(req,res)=>{
    User.findOne({username:req.user.username}).then((user)=>{
        todos = req.body.todo;
        console.log(todos);
        console.log("HERE");
        console.log(user);
        // $addToSet adds an element only if not present in the database.
        user.update({$addToSet:{todo:todos}},{safe: true, upsert: true},function(err,doc){
            if(err)
            console.log(err);
            if(doc)
            {
                console.log(doc);
                res.redirect('/users');
            }
        });
        
    })
})
router.post('/delete',(req,res)=>{
    console.log(req.body.message);
    User.findOne({username:req.user.username}).then((user)=>{
        console.log(user);
        //$pull is used to delete the element from db.
        user.update({$pull:{todo:req.body.message}},{safe: true, upsert: true},function(err,doc){
            if(err)
            console.log(err);
            if(doc)
            {
                console.log("DELETED");
                console.log(doc);
                res.send({redirect:'/users'});
                //since this handle receives an AJAX request, it cannot directly redirect to another site like done in '/users/add' endpoint.
                //thus we send a response to the method where the AJAX request is made.That AJAX redirects to another site.
                //We use AJAX requests when we dont want to refresh the page.
                //If refreshing the page is not a problem then post requests can be made using html forms as well.
            }
        });
    })
})
module.exports = router;