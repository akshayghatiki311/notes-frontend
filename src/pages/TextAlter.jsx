import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowBigUpDash, 
  ArrowBigDownDash, 
  Text, 
  Copy, 
  Eraser, 
  Code
} from 'lucide-react';

const TextAlter = () => {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setPreview(newText);
    updateCounts(newText);
  };

  const updateCounts = (text) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    setWordCount(words);
    setCharCount(chars);
  };

  const convertToUpperCase = () => {
    const newText = text.toUpperCase();
    setText(newText);
    setPreview(newText);
  };

  const convertToLowerCase = () => {
    const newText = text.toLowerCase();
    setText(newText);
    setPreview(newText);
  };

  const capitalizeFirstLetter = () => {
    const newText = text.split('. ')
      .map(sentence => {
        if (sentence.length > 0) {
          return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        }
        return sentence;
      })
      .join('. ');
    setText(newText);
    setPreview(newText);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  const clearText = () => {
    setText('');
    setPreview('');
    updateCounts('');
  };

  const stripHtmlTags = () => {
    const newText = text.replace(/<[^>]*>/g, '');
    setText(newText);
    setPreview(newText);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showTabs={false} userEmail={null} />
      <div className="pt-20 px-6 max-w-[1280px] mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">TextAlter</h1>
          <p className="text-gray-600 mb-8">Transform your text with powerful editing tools</p>

          {/* Text Input Area */}
          <div className="mb-6">
            <Textarea
              placeholder="Enter your text here..."
              className="w-full h-64 p-4 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={text}
              onChange={handleTextChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            <Button
              onClick={convertToUpperCase}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <ArrowBigUpDash className="w-4 h-4" />
              Uppercase
            </Button>
            <Button
              onClick={convertToLowerCase}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <ArrowBigDownDash className="w-4 h-4" />
              Lowercase
            </Button>
            <Button
              onClick={capitalizeFirstLetter}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              <Text className="w-4 h-4" />
              Capitalize
            </Button>
            <Button
              onClick={copyText}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <Button
              onClick={clearText}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
            >
              <Eraser className="w-4 h-4" />
              Clear
            </Button>
            <Button
              onClick={stripHtmlTags}
              className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700"
            >
              <Code className="w-4 h-4" />
              Strip HTML
            </Button>
          </div>

          {/* Text Summary */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Text Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600">Words</p>
                <p className="text-2xl font-bold text-blue-600">{wordCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600">Characters</p>
                <p className="text-2xl font-bold text-green-600">{charCount}</p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Preview</h2>
            <div className="bg-white p-4 rounded-lg min-h-[100px] shadow">
              {preview || 'Enter something in textbox to preview here'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAlter; 