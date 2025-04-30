import React, { useState } from 'react'
import axios from 'axios'
import NotesForm from '../components/NotesForm';
const MyNotesPage = () => {
      const [title,setTitle]=useState('');
      const [content,setContent]=useState('');
    //for adding notes 
    const handleAddNotes=async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post(`http://localhost:8000/notes`,{
                title,
                content
            });
           console.log('response:',response.data);
        }catch(error){
            console.error(`Error adding notes:${error}`);
        }
    };
  return (
    <>
    <div className='flex border justify-center w-full h-[100vh]'>
        <NotesForm title={title} content={content} setTitle={setTitle} setContent={setContent} handleAddNotes={handleAddNotes}/>
    </div>
        
    </>
  )
}

export default MyNotesPage