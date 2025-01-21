import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NotesGrid from "../components/NotesGrid";
import { getNotes, getSharedNotes, deleteNote, getUserEmail } from "../services/api";
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
      <div>
        <Navbar 
          onLogout={() => handleUnauthorized()} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userEmail={userEmail}
        />  
        <div className="pt-20 px-6 max-w-[1280px] mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            {activeTab === 'my-notes' ? 'My Notes' : 'Shared Notes'}
          </h2>
          <NotesGrid 
            notes={notes} 
            onEdit={handleEditNote} 
            onDelete={handleDeleteNote} 
          />
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