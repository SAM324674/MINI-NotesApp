import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotesForm from '../components/NotesForm';
import { MdDeleteOutline } from "react-icons/md";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const MyNotesPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // Button disabled state

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

            console.log('response:', response.data);

            // Add new note to the top of the notes list
            setNotes(prev => [response.data.note, ...prev]);

            // Clear inputs
            setTitle('');
            setContent('');
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
        } catch (error) {
            console.error(`Error fetching notes: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    // Shimmer placeholder
    const shimmerCard = (
        <div className="bg-slate-700 shadow-md shadow-blue-900 w-[20rem] p-6 flex flex-col rounded-md animate-pulse">
            <div className="h-6 bg-gray-500 rounded w-[60%] mb-4"></div>
            <div className="h-4 bg-gray-500 rounded mb-2"></div>
            <div className="h-4 bg-gray-500 rounded w-[80%]"></div>
        </div>
    );

    return (
        <div className='flex border justify-center w-full h-auto flex-col items-center'>
            <NotesForm
                title={title}
                content={content}
                setTitle={setTitle}
                setContent={setContent}
                handleAddNotes={handleAddNotes}
                isSubmitting={isSubmitting}
            />
            <div className='w-full h-full flex flex-wrap gap-4 justify-evenly p-5'>
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>{shimmerCard}</div>
                    ))
                ) : (
                    notes.map((note, id) => (
                        <div className='bg-slate-700 shadow-md shadow-blue-900 w-[20rem] p-6 flex flex-col rounded-md' key={id}>
                            <h1 className='text-xl text-white font-bold'>{note.title}</h1>
                            <p className='text-white'>{note.content}</p>
                            <span className='text-white text-sm mt-2'>{new Date(note.createdAt).toLocaleString()}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyNotesPage;
