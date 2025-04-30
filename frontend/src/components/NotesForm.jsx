import React from 'react';

const NotesForm = (props) => {
    const { title, setTitle, content, setContent, handleAddNotes, isSubmitting } = props;

    return (
        <div className='border border-black w-[40rem] h-[30rem] flex flex-col justify-evenly p-6'>
            <h1 className='text-white text-4xl font-bold'>Add a New Note</h1>

            <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Title</label>
            <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Ex: today's task"
                required
            />

            <label htmlFor="content" className="block mb-2 text-sm font-medium text-white">Content</label>
            <textarea
                name="content"
                id="content"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="resize-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Ex: meeting at 5pm"
                required
            />

            <button
                onClick={handleAddNotes}
                disabled={isSubmitting}
                className={`text-white bg-purple-800 rounded-md p-4 mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isSubmitting ? 'Adding...' : 'Add Note'}
            </button>
        </div>
    );
};

export default NotesForm;
