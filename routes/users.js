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
        res.render('users',{username:req.user.username,todos:todos});
        else
        res.render('users',{username:req.user.username});
    })
    // res.render('users',{username:req.user.username});
});
router.post('/add',(req,res)=>{
    User.findOne({username:req.user.username}).then((user)=>{
        // res.send(user);
        todos = req.body.todo;
        // user.insert({todo:todo});
        console.log(todos);
        console.log("HERE");
        console.log(user);
        user.update({$push:{todo:todos}},{safe: true, upsert: true},function(err,doc){
            if(err)
            console.log(err);
            if(doc)
            {
                console.log(doc);
                res.redirect('/users');
            }
        });
        // user.todo.push(todo);
        // user.save(done);
    })
})

module.exports = router;