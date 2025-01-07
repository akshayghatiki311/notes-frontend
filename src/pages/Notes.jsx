import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import NotesGrid from "@/components/NotesGrid";
import { getNotes,  } from "@/services/api";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const handleEditNote = (noteId) => {
    // Navigate to the editor page with the noteId
    navigate(`/editor/${noteId}`);
  };
  const handleDeleteNote = (noteId) => {
    // Navigate to the editor page with the noteId
    useEffect(() => {
      const deleteNote = async () => {
        await deleteNote();
      };
      deleteNote();
    }, []);
    navigate(`/dashboard`);
  };

  return (
    <div>
      <Navbar onLogout={() => navigate("/")} />
      <NotesGrid notes={notes} onEdit={handleEditNote} onDelete={handleDeleteNote} />
    </div>
  );
};

export default Notes;