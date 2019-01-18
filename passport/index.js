const passport = require('passport');
const strategies = require('./strategies');
const User = require('../models/user-model');

passport.use(strategies); //might be an error
passport.serializeUser((user,done)=>{
    console.log('serialize');
    done(null,user.id);
})
passport.deserializeUser((userId,done)=>{
    console.log('deserialize');
    User.findOne({_id:userId})
        .then((user)=>{
            done(null,user);
        })
        .catch((err)=>{
            done(err);
        })
})
module.exports = passport;