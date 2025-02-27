import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Notes from "@/pages/Notes";
import Editor from '@/pages/Editor';
import Dashboard from '@/pages/Dashboard';
import NewNote from '@/pages/NewNote';
import About from '@/pages/About';
import Portfolio from '@/pages/Portfolio';
import TextAlter from '@/pages/TextAlter';
import IngredientScanner from '@/pages/IngredientScanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/create/new" element={<NewNote />} />
        <Route path="/editor/:noteId" element={<Editor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/text-alter" element={<TextAlter />} />
        <Route path="/scan-ingredients" element={<IngredientScanner />} />
      </Routes>
    </Router>
  );
}

export default App;