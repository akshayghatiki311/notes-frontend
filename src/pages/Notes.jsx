import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import NotesGrid from "@/components/NotesGrid";
import { getNotes, deleteNote } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    try {
      localStorage.clear(); 
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        console.error("Error fetching notes:", error);
      }
    }
  };

  const handleEditNote = (noteId) => {
    navigate(`/editor/${noteId}`);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      await fetchNotes();
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        console.error("Error deleting note:", error);
      }
    }
  };

  const handleCreateNote = () => {
    navigate('/create/new');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showTabs={true} onLogout={handleUnauthorized} />
      <div className="pt-20 px-6 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
          <Button 
            onClick={handleCreateNote}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Note
          </Button>
        </div>

        {notes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl text-gray-600 mb-4">No notes yet</h2>
            <p className="text-gray-500 mb-6">Create your first note to get started!</p>
            <Button 
              onClick={handleCreateNote}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Create Note
            </Button>
          </div>
        ) : (
          <div>
            <NotesGrid 
              notes={notes} 
              onEdit={handleEditNote} 
              onDelete={handleDeleteNote} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;