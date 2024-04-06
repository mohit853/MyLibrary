require('dotenv').config()
const express= require('express')
const app= express()
const expressLayouts= require('express-ejs-layouts')
const indexRouter= require('./routes/index')
const mongoose = require('mongoose')
const { parse } = require('dotenv')
//setting view engine
app.set('view engine','ejs')
//path of views used by ejs

app.set('views', __dirname+'/views')

//set path of layout 
app.set('layout','layouts/layout')

//use express layouts
app.use(expressLayouts)

//public files path it would have css,images
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection


db.on('error', function(error){
    console.error(error)
});
db.once('open', function(){
    console.log("connected to mongoose")
});

app.use('/',indexRouter)

app.listen(3000);
