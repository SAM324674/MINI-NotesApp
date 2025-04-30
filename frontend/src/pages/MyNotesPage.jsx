import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NotesForm from '../components/NotesForm';
import { MdDeleteOutline } from "react-icons/md";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const MyNotesPage = () => {
      const [title,setTitle]=useState('');
      const [content,setContent]=useState('');
      const [notes,setNotes]=useState([]);
    //for adding notes 
    const handleAddNotes=async(e)=>{
        e.preventDefault()
        try{
            // TODO: Put link in env
            const response=await axios.post(`${baseURL}/notes`,{
                title,
                content
            });
           console.log('response:',response.data);
        }catch(error){
            console.error(`Error adding notes:${error}`);
        }
    };
    //for fetching notes
    const fetchNotes=async()=>{

        try{
            // TODO: Put link in env
            const response=await axios.get(`${baseURL}/notes`);
            console.log("the notes fetched sorted from the recent ones to least are:",response.data);
            setNotes(response.data.notes);
        }catch(error){
            console.error(`Error fetching notes:${error}`);
        }
    }

    useEffect(()=>{
         fetchNotes();
         console.log("notes:",notes);
    },[]);
  return (
    <>
    <div className='flex border justify-center w-full h-auto flex-col items-center'>
        <NotesForm title={title} content={content} setTitle={setTitle} setContent={setContent} handleAddNotes={handleAddNotes}/>
        <div className='w-full h-full flex justify-evenly p-5'>
            {Array.isArray(notes) && notes.map((note,id)=>(
                <div className='bg-slate-700 shadow-md shadow-blue-900 w-[20rem] p-6 flex flex-col rounded-md' key={id}>
                    <h1 className='text-xl text-white font-bold'>{note.title}</h1>
                    <p className='text-white'>{note.content}</p>
                    <span className='text-white'>{note.createdAt}</span>
                </div>
            ))}
        </div>
    </div>
   
        
    </>
  )
}

export default MyNotesPage