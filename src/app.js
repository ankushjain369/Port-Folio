require('dotenv').config();
const path = require('path');
// require('dotenv').config({path:path.resolve(__dirname,'../env')});
const express = require("express");
const app = express();
const hbs = require("hbs");
const Register = require("./models/register");
const router=require("./router/rout");
require("./db/conn");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.use(cookieParser());

app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath);
app.use(router);

app.listen(port,()=>{
    console.log(`Connected to Port: ${port}`);
})

