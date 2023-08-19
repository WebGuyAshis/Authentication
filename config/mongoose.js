const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongoDbUrl)

const db = mongoose.connection;

db.on('error',console.error.bind(console, "Error Connecting to MongoDb Database!!"))

db.once('open', ()=>{
    console.log("Successfully Connected to the MongoDB Database!!");
})

module.exports = db;