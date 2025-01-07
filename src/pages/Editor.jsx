import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import EditorForm from "@/components/EditorForm";
import { getNoteById, saveNote, createNote, getUserEmail } from "@/services/api";
import WebSocketService from "@/services/websocket";

export default function Editor() {
  const { noteId } = useParams();
  const [note, setNote] = useState(noteId === 'new' ? {
    title: '',
    content: '',
    owner: '',
    collaborators: []
  } : null);
  const [realTimeUpdate, setRealTimeUpdate] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (noteId && noteId !== 'new') {
      const fetchNote = async () => {
        try {
          const data = await getNoteById(noteId);
          if (data) {
            setNote(data);
            WebSocketService.connect(noteId, (event) => {
              try {
                if (event.data) {
                  const parsedData = JSON.parse(event.data);
                  if (parsedData.type === 'note_updated') {
                    setRealTimeUpdate(parsedData);
                  }
                } else {
                  console.warn('Received empty message');
                }
              } catch (error) {
                console.error('Error processing message:', error);
              }
            });
          }
        } catch (error) {
          console.error("Error fetching note:", error);
          navigate('/dashboard');
        }
      };
      fetchNote();

      return () => {
        WebSocketService.close();
      };
    }
  }, [noteId, navigate]);

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
      let savedNote;
      if (noteId === 'new') {
        savedNote = await createNote(updatedNote);
      } else {
        savedNote = await saveNote({
          ...updatedNote,
          id: note._id,
        });
        WebSocketService.send({
          type: 'update_note',
          noteId: savedNote._id,
          content: savedNote.content,
          title: savedNote.title
        });
      }
      setNote(savedNote);
      alert("Note saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save the note.");
    }
  };

  if (!note && noteId !== 'new') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar onLogout={() => window.location.href = "/"} userEmail={userEmail} />
      <div className="main-content">
        <EditorForm 
          note={note || { title: '', content: '', owner: '', collaborators: [] }} 
          onSave={handleSave} 
          onContentUpdate={realTimeUpdate}
        />
      </div>
    </>
  );
}