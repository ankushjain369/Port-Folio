const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE)
// mongoose.connect("mongodb://127.0.0.1:27017/Application")
.then(()=>{console.log("Connected Successfully")})
.catch(()=>{console.log("Connection Unsuccessful")})