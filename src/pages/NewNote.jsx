import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import EditorForm from "@/components/EditorForm";
import { createNote, getUserEmail } from "@/services/api";

export default function NewNote() {
  const [note] = useState({
    title: '',
    content: '',
    owner: '',
    collaborators: []
  });
  const [userEmail, setUserEmail] = useState('');
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
    fetchUserEmail();
  }, []);

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

  const handleSave = async (updatedNote) => {
    try {
      await createNote(updatedNote);
      alert("Note created successfully!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        console.error("Error fetching user email:", error);
      }
    }
  };

  return (
    <>
      <Navbar onLogout={() => handleUnauthorized()} userEmail={userEmail} />
      <div className="main-content">
        <EditorForm 
          note={note} 
          onSave={handleSave} 
        />
      </div>
    </>
  );
}