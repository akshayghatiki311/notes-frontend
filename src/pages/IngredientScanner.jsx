import React, { useState, useRef } from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Copy, Loader2, Search } from 'lucide-react';
import axios from 'axios';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const IngredientScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [editableText, setEditableText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [useHuggingFace, setUseHuggingFace] = useState(false);
  const [userInfo, setUserInfo] = useState({
    age: '',
    gender: 'other',
    conditions: ''
  });
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPreviewUrl(reader.result);
        // Reset crop when new file is selected
        setCrop(undefined);
      });
      reader.readAsDataURL(file);
      setError('');
      setAnalysis('');
      setEditableText('');
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const crop = centerAspectCrop(width, height, 16 / 9);
    setCrop(crop);
  };

  const handleUpload = async () => {
    if (!selectedFile || !completedCrop) {
      setError('Please select an image and crop it');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      // Create a canvas with the crop
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      // Convert canvas to blob
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
      const croppedFile = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('image', croppedFile);

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
      setEditableText(response.data.text);
    } catch (error) {
      setError('Failed to extract text from image');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!editableText.trim()) {
      setError('No text to analyze');
      return;
    }

    if (!userInfo.age || !userInfo.gender) {
      setError('Please provide age and gender');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ocr/analyze-ingredients?useHuggingFace=${useHuggingFace}`,
        { 
          ingredients: editableText,
          age: parseInt(userInfo.age),
          gender: userInfo.gender,
          conditions: userInfo.conditions || 'none'
        }
      );
      setAnalysis(response.data.analysis);
    } catch (error) {
      setError('Failed to analyze ingredients');
      console.error('Error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editableText);
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

          {/* Image Preview and Crop */}
          {previewUrl && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Crop Image</h2>
              <div className="max-w-full overflow-auto">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={undefined}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={previewUrl}
                    onLoad={onImageLoad}
                    className="max-w-full h-auto"
                  />
                </ReactCrop>
              </div>
            </div>
          )}

          {/* Extract Text Button */}
          <div className="flex gap-4 mb-8">
            <Button
              onClick={handleUpload}
              className="flex items-center gap-2"
              disabled={isLoading || !selectedFile || !completedCrop}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {isLoading ? 'Extracting...' : 'Extract Text'}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* Model Selection */}
          <div className="flex items-center gap-2 mb-4">
            <label className="text-sm text-gray-600">
              <input
                type="checkbox"
                checked={useHuggingFace}
                onChange={(e) => setUseHuggingFace(e.target.checked)}
                className="mr-2"
              />
              Use Hugging Face Model (Free)
            </label>
          </div>

          {/* Extracted Text and Analysis Section */}
          {extractedText && (
            <div className="space-y-6">
              {/* User Information Form */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">User Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age*
                    </label>
                    <input
                      type="number"
                      value={userInfo.age}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, age: e.target.value }))}
                      className="w-full p-2 border rounded-md bg-white text-gray-700"
                      min="1"
                      max="120"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender*
                    </label>
                    <select
                      value={userInfo.gender}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full h-[42px] p-2 border rounded-md bg-white text-gray-700"
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pre-existing Conditions (optional)
                  </label>
                  <Textarea
                    value={userInfo.conditions}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, conditions: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="E.g., diabetes, allergies, high blood pressure"
                  />
                </div>
              </div>

              {/* Extracted Text Editor */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Ingredients</h2>
                <Textarea
                  value={editableText}
                  onChange={(e) => setEditableText(e.target.value)}
                  className="w-full h-32 p-4 text-gray-700 bg-gray-50 rounded-lg"
                  placeholder="Edit the extracted ingredients here..."
                />
                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={handleAnalyze}
                    className="flex items-center gap-2"
                    disabled={isAnalyzing || !editableText.trim() || !userInfo.age || !userInfo.gender}
                  >
                    {isAnalyzing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Ingredients'}
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Text
                  </Button>
                </div>
              </div>

              {/* Analysis Results */}
              {analysis && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Analysis</h2>
                  <div className="bg-blue-50 p-4 rounded-lg text-gray-700 whitespace-pre-line">
                    {analysis}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientScanner; 