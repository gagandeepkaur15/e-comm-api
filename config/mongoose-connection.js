const mongoose = require('mongoose');
const config = require("config")
const debug = require("debug")("development:mongoose");
// To see logs in terminal execute: export (set for mac) DEBUG=development:*

mongoose.connect(`${config.get("MONGODB_URI")}/shopshere`)
.then(function(){
    debug("Connected to MongoDB");
    // console.log("Connected to MongoDB");
})
.catch(function(){
    debug(err);
    // console.log(err);
})

module.exports = mongoose.connection;