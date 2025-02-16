import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Copy, Loader2 } from 'lucide-react';
import axios from 'axios';

const IngredientScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ocr/extract-ingredients`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setExtractedText(response.data.text);
    } catch (error) {
      setError('Failed to extract text from image');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showTabs={true} />
      <div className="pt-20 px-6 max-w-[1280px] mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Ingredient Scanner</h1>
          <p className="text-gray-600 mb-8">Upload an image to extract ingredients text</p>

          {/* File Upload Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Image Preview</h2>
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Button
              onClick={handleUpload}
              className="flex items-center gap-2"
              disabled={isLoading || !selectedFile}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {isLoading ? 'Processing...' : 'Extract Text'}
            </Button>
            {extractedText && (
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Text
              </Button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* Extracted Text */}
          {extractedText && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Extracted Text</h2>
              <Textarea
                value={extractedText}
                readOnly
                className="w-full h-64 p-4 text-gray-700 bg-gray-50 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientScanner; 