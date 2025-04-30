const mongoose=require('mongoose');
// const bcrypt =require('bcrypt');


const NotesSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },

},{timestamps:true});

const Notes=mongoose.model('note',NotesSchema);

module.exports=Notes;