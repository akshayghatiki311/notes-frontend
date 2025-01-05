import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EditorForm from "../components/EditorForm";
import { createNote, getUserEmail } from "../services/api";

export default function NewNote() {
  const [note] = useState({
    title: '',
    content: '',
    owner: '',
    collaborators: []
  });
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const fetchUserEmail = async () => {
    try {
      const email = await getUserEmail();
      setUserEmail(email);
    } catch (error) {
      console.error("Error fetching user email:", error);
    }
  };

  const handleSave = async (updatedNote) => {
    try {
      await createNote(updatedNote);
      alert("Note created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create the note.");
    }
  };

  return (
    <>
      <Navbar onLogout={() => window.location.href = "/"} userEmail={userEmail} />
      <div className="main-content">
        <EditorForm 
          note={note} 
          onSave={handleSave} 
        />
      </div>
    </>
  );
}