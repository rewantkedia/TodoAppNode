const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user-model');

passport.serializeUser(function(user,done){
    console.log("serialize"+user.id);
    done(null,user.id);
})
passport.deserializeUser(function(id,done){
    console.log('EXECUTED');
    User.getUserById(id).then((user)=>{
        console.log(user);
        done(null,user);
    });
})
const local_strategy = new LocalStrategy((username,password,done)=>{
    User.findOne({username:username}).then((user)=>{
        if(!user)
        {
            done(null,false,{'message':'usernameNA'});
        }
        else if(user.password != password) //!= sign might be incorrect ..might be !==
        {
            done(null,false,{'message':'wrong_password'});
        }
        else
        {
            done(null,user);
        }
    });
})
passport.use(local_strategy);
module.exports = passport;