const express               = require('express');
const app                   = express();
const db                    = require('./config/mongoose');
const path                  = require('path');

const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy')


app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(passport.initialize());
// app.use(passport.session());
// Routes
app.use('/', require('./routes'));

app.listen(8000,(err)=>{
    if(err){
        console.log("Error In Starting the server!",err);
    }
    console.log("Successfully Connected to Port: 8000");
})