const mongoose = require('mongoose')

const authorSchema= new mongoose.Schema({
    name:{
        type : String,
        required : true
    }
})


//create a model and assign schema to it 
module.exports = mongoose.model('Author',authorSchema)