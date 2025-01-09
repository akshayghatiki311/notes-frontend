import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NotesGrid from "../components/NotesGrid";
import { getNotes, getSharedNotes, deleteNote, getUserEmail } from "../services/api";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState('my-notes');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    localStorage.removeItem("token");
    navigate("/");
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

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      await fetchNotes();
      alert("Note deleted successfully!");
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        console.error("Error deleting note:", error);
        alert("Failed to delete the note.");
      }
    }
  };

  return (
    <div>
      <Navbar 
        onLogout={() => navigate("/")} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userEmail={userEmail}
      />  
        <NotesGrid 
          notes={notes} 
          onEdit={handleEditNote} 
          onDelete={handleDeleteNote} 
        />
    </div>
  );
};

export default Dashboard;