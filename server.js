const express = require('express');
const home_route = require('./routes/homepage');
const login_route = require('./routes/login');
const user_route = require('./routes/users');
const cookieSession = require('cookie-session');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); //ORM for mongodb
const passport = require('./passport/index');
const expressSession = require('express-session')
const app = express();

mongoose.connect('mongodb://localhost/todoapp');
//this statement connects to local database 'todoapp'
//If todoapp not present it creates one.

app.set('view engine','ejs');
//to set up ejs templates

app.use(bodyParser.json()); // to parse the incoming http requests
app.use(express.urlencoded({extended: true})); // for sending html form data

app.use(expressSession({       // to create express session. Used by passport js
    secret:'easy very easy',
    resave:false,
    saveUninitialized:false,

}))

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

// const passportSetup = require('./passport/local_strategy');

app.use(home_route); //setting routes
app.use('/login',login_route); //login routes will begin from /login
app.use('/users',user_route);

const port = 3000;
app.listen(port,()=>{ //express server listens to incoming http requests in this port.
    console.log('We are live at port '+port);
})