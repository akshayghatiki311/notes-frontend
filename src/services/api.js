import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000', // Backend URL
  withCredentials: true, // Ensures cookies are sent if applicable
  headers: {
    'Content-Type': 'application/json',
  }
});

export const login = async (email, password) => {
  try {
    const response = await api.post(`/auth/login`, { email, password });
    await localStorage.setItem("token", response.data.access_token);
    return true;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return false;
  }
};

export const register = async (email, password) => {
  try {
    const response = await api.post(`/auth/register`, { email, password });
    return true;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    return false;
  }
};

export const getUserEmail = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.email;
  } catch (error) {
    console.error("Error fetching user email:", error.response?.data || error.message);
    throw error;
  }
};

export const getNotes = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const getSharedNotes = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/notes/get/collaborations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shared notes:", error);
    throw error;
  }
};

export const getNoteById = async (noteId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching note by id:", error);
    throw error;
  }
};

// Update an existing note
export const saveNote = async (note) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post(`/notes/${note.id}/edit`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  const { data:collabData } = await api.post(`/notes/${note.id}/collaborators`, {"collaboratorEmails":note.collaborators}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return collabData?collabData:data;
};




export const createNote = async (note) => {
  const token = localStorage.getItem("token");
  const { data } = await api.post(`/notes`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Share a note with collaborators
export const shareNote = async (noteId, emails) => {
  const token = localStorage.getItem("token");
  await api.post(
    `/notes/${noteId}/share`,
    { collaborators: emails },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Delete a note
export const deleteNote = async (noteId) => {
  const token = localStorage.getItem("token");
  await api.delete(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
