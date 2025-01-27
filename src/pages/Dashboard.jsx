import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NotesGrid from "../components/NotesGrid";
import { getNotes, getSharedNotes, deleteNote, getUserEmail } from "../services/api";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { 
  Toast, 
  ToastProvider, 
  ToastViewport, 
  ToastTitle, 
  ToastDescription 
} from "@/components/ui/toast";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState('my-notes');
  const [userEmail, setUserEmail] = useState('');
  const [toast, setToast] = useState({
    open: false,
    title: '',
    description: '',
    variant: 'default'
  });
  const navigate = useNavigate();

  const handleUnauthorized = async () => {
    try {
      console.log(localStorage);
      await localStorage.clear();
      if (localStorage.length !== 0) {
        console.error("Error clearing local storage");
      }
      console.log(localStorage);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [activeTab]);

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = activeTab === 'my-notes' 
        ? await getNotes()
        : await getSharedNotes();
      setNotes(data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        console.error("Error fetching notes:", error);
      }
    }
  };

  const fetchUserEmail = async () => {
    try {
      const email = await getUserEmail();
      setUserEmail(email);
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        console.error("Error fetching user email:", error);
      }
    }
  };

  const handleEditNote = (noteId) => {
    navigate(`/editor/${noteId}`);
  };

  const showToast = (title, description, variant = 'default') => {
    setToast({
      open: true,
      title,
      description,
      variant
    });
    setTimeout(() => {
      setToast(prev => ({ ...prev, open: false }));
    }, 3000);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      await fetchNotes();
      showToast('Success', 'Note deleted successfully!');
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        console.error("Error deleting note:", error);
        showToast('Error', 'Failed to delete note', 'destructive');
      }
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          onLogout={() => handleUnauthorized()} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userEmail={userEmail}
        />
        <div className="pt-20 px-6 max-w-[1280px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {activeTab === 'my-notes' ? 'My Notes' : 'Shared Notes'}
            </h1>
            {activeTab === 'my-notes' && (
              <Button 
                onClick={() => navigate('/create/new')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Create Note
              </Button>
            )}
          </div>

          {notes.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl text-gray-600 mb-4">
                {activeTab === 'my-notes' ? 'No notes yet' : 'No shared notes'}
              </h2>
              <p className="text-gray-500 mb-6">
                {activeTab === 'my-notes' 
                  ? 'Create your first note to get started!' 
                  : 'Notes shared with you will appear here'}
              </p>
              {activeTab === 'my-notes' && (
                <Button 
                  onClick={() => navigate('/create/new')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  Create Note
                </Button>
              )}
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

        {toast.open && (
          <Toast 
            variant={toast.variant}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.description}</ToastDescription>
          </Toast>
        )}
        <ToastViewport 
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col p-4 gap-2 w-[400px] m-0 list-none z-[100] outline-none"
        />
      </div>
    </ToastProvider>
  );
};

export default Dashboard;