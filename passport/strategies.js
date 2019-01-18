const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user-model');

const local_strategy = new LocalStrategy((username,password,done)=>{
    User.findOne({username:username})
        .then((user)=>{
            if(!user)
            {
                return done(null,false,{'message':'usernameNA'});
            }
            else if(user.password != password)
            {
                return done(null,false,{'message':'wrong_password'});
            }
            else
            {
                return done(null,user);
            }
        })
        .catch((err)=>{
            return done(err);
       })
})
module.exports = local_strategy;