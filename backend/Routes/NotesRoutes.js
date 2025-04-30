const express=require('express');

const { AddNewNote, fetchNotes, deleteNote } = require('../Controllers/Notes');

const router=express.Router();

router.get('/',fetchNotes);
router.post('/',AddNewNote);
router.delete('/:id',deleteNote);
module.exports=router;