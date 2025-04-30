const { model } = require('mongoose');
const Notes = require('../Models/NotesModel');

//To add new note
const AddNewNote=async (req,res)=>{
    const {title,content}=req.body;
    console.log("Recieved data",req.body);

    if(!title||!content){
        return res.status(400).send("Missing required fields");
    }
    try{
        const newNotes=await Notes.create({
            title,content
        });
        console.log("new user created:",newNotes); 
        return res.json({
            message:"new note successfully created",
            
        });
    }catch(err){
        console.error("error occured",err);
        return res.status(500).send("Error creating user");
    }
}

//function to fetch notes
const fetchNotes=async(req,res)=>{
 
    //TO FETCH NOTES IN CREATED AT DESCENDING ORDER
    try {
        const notes=await Notes.find().sort({createdAt:-1});
        console.log("Notes", notes);
        res.status(200).json({message:"notes fetched and sorted by the most recent ones",notes});
    } catch (error) {
         console.error('error occured:',error);
         res.status(500).json({error:"error occured during fetching notes"});
    }
    
}

//to delete note by id
const deleteNote=async(req,res)=>{
    const id=req.params.id;
    console.log("id found:",id);
    try{
        await Notes.findByIdAndDelete(id);
        res.status(200).json({message:"Note deleted"});
    }catch(error){
        res.status(500).json({error:"Failed to delete note"});
    }
}

module.exports={AddNewNote,fetchNotes,deleteNote};