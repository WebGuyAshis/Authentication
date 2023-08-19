const express               = require('express');
const app                   = express();
const db                    = require('./config/mongoose');
const path                  = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Routes
app.use('/', require('./routes'));

app.listen(8000,(err)=>{
    if(err){
        console.log("Error In Starting the server!",err);
    }
    console.log("Successfully Connected to Port: 8000");
})