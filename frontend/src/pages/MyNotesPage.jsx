import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotesForm from '../components/NotesForm';
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const MyNotesPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [IsAdding,setIsAdding]=useState(false);
    // Add note
    const handleAddNotes = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${baseURL}/notes`, {
                title,
                content
            });

            const newNote = response.data.note || response.data;
            fetchNotes();
            setNotes(prev => [newNote, ...prev]); // Add to top of list
            setTitle('');
            setContent('');
            setIsAdding(false);
        } catch (error) {
            console.error(`Error adding notes: ${error}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fetch notes
    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${baseURL}/notes`);
            setNotes(response.data.notes);
            console.log('Fetched notes:', response.data);
        } catch (error) {
            console.error(`Error fetching notes: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid date' : date.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    //Delete note
    const handleDelete=async(note)=>{
        try{
            const response =await axios.delete(`${baseURL}/notes/${note._id}`);
            console.log("response:",response.data);
            fetchNotes();
            setNotes(prev=>prev.filter((n)=>n._id!==note._id));
            console.log("deleted note:",note._id);
        }catch(error){
            console.error(`Error deleting note:${error}`);
        }
    };
    // Shimmer placeholder
    const shimmerCard = (
        <div className="bg-slate-700 shadow-md shadow-blue-900 w-[20rem] p-6 flex flex-col rounded-md animate-pulse">
            <div className="h-6 bg-gray-500 rounded w-[60%] mb-4"></div>
            <div className="h-4 bg-gray-500 rounded mb-2"></div>
            <div className="h-4 bg-gray-500 rounded w-[80%]"></div>
        </div>
    );

    return (
        <div className='flex  justify-center w-full h-[100vh] flex-col items-center p-10'>
            
            <div className='flex w-full justify-center'>
            <h1 className='text-3xl font-bold text-white  '>My Notes</h1>
            <button className='w-16 h-16 rounded-md absolute top-[2rem] right-[20rem] bg-blue-500 flex justify-center items-center 'onClick={()=>setIsAdding(!IsAdding)}>
                <IoAdd size={30}/>
            </button>
            </div>
            {notes.length===0 && 
                        (<button onClick={()=>setIsAdding(!IsAdding)} className='border border-blue-300 rounded-lg w-[60rem] h-[30rem] mt-[5rem]'>
                        <div className='m-10 border-blue-300 border-2 rounded-lg h-[20rem] flex flex-col justify-center items-center gap-[5rem]'>
                            <h1 className='text-4xl text-white font-bold'>Add your First Note</h1>
                           <div className='p-4 w-[5rem] h-[5rem] flex justify-center rounded-md shadow-md shadow-blue-300'> <IoMdAddCircleOutline size={40} color='#93c5fd'/></div>
                        </div>
                    </button>)
            }
            {IsAdding && (
                <NotesForm
                title={title}
                content={content}
                setTitle={setTitle}
                setContent={setContent}
                handleAddNotes={handleAddNotes}
                isSubmitting={isSubmitting}
                setIsAdding={setIsAdding}
                IsAdding={IsAdding}
            />
            )}
            <div className='w-full h-full flex flex-wrap gap-10 justify-start p-5 '>
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>{shimmerCard}</div>
                    ))
                ) : (
                    notes.map((note, id) => (
                        <div className='border-blue-300 border mt-[4rem] shadow-md shadow-slate-800 w-[20rem] h-[20rem]  p-6 flex flex-col justify-center items-start gap-[2rem] rounded-md' key={note._id || id}>
                            <div className='flex justify-between w-full'>
                                <h1 className='text-xl text-white font-bold'>{note.title}</h1>
                                <button onClick={()=>handleDelete(note)}><MdDeleteOutline size={25} color='white'/></button>
                            </div>
                            <p className='text-white break-words whitespace-pre-wrap overflow-y-scroll scrollbar overflow-x-hidden w-[18rem] h-[10rem] '>{note.content}</p>
                            <span className='text-gray-400 text-sm mt-2'>{formatDate(note.createdAt)}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyNotesPage;
