const express = require('express');
const home_route = require('./routes/homepage');
const login_route = require('./routes/login');
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
app.use(home_route);
app.use('/login',login_route);
const port = 3000;
app.listen(port,()=>{
    console.log('We are live at port '+port);
})