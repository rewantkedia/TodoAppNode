const express = require('express');
const home_route = require('./routes/homepage');
const login_route = require('./routes/login');
const user_route = require('./routes/users');
const cookieSession = require('cookie-session');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

mongoose.connect('mongodb://localhost/todoapp');

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true})); // for sending form data

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: "SomeTempKey"
}));

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

const passportSetup = require('./passport/local_strategy');

app.use(home_route);
app.use('/login',login_route);
app.use('/users',user_route);
const port = 3000;
app.listen(port,()=>{
    console.log('We are live at port '+port);
})