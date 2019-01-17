const express = require('express');
const home_route = require('./routes/homepage');
const login_route = require('./routes/login');
const app = express();

app.set('view engine','ejs');

app.use(home_route);
app.use('/login',login_route);
const port = 3000;
app.listen(port,()=>{
    console.log('We are live at port '+port);
})