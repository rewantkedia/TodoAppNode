const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user-model');

//A Local Strategy is set up and is exported to "index.js" file where this strategy is put to use.

const local_strategy = new LocalStrategy((username,password,done)=>{
    //username,password are the "name" attributes of the html form input tags in signin/signup page.
    //An user with the username is looked up in the db and corresponding password is matched with the entered one.
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