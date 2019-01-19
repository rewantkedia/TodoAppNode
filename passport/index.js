const passport = require('passport');
const strategies = require('./strategies');
const User = require('../models/user-model');

//An object of 'passport' module is made. A middleware is invoked "passport.use" to use the local strategy made in the "strategies.js" file.
//serializeUser is defined to store the credentials of the user wanting to log in in the express-cookie
//serializeUser creates cookie for the logged in user.
//serializeUser logs the mongodb unique-id in the cookie
//deserializeUser is called by passport to fetch the user details from the cookie.
//All of these is done to the passport object and the object is then exported to the server.js where it is initialised.
//passport attaches the logged in user to all the requests in the "req" parameter.
//req.user gives the details of the user at any method.


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