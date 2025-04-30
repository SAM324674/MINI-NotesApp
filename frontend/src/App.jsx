import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import MyNotesPage from './pages/MyNotesPage';

function App() {
   
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MyNotesPage/>} />
        </Routes>
    </BrowserRouter>
  );
}


export default App
