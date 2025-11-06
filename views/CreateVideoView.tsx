
import React, { useState, useCallback } from 'react';
import { Template } from '../types';
import { TEMPLATES, VIDEO_GENERATION_MESSAGES } from '../constants';
import { describeFace, generateVideo } from '../services/geminiService';
import { FileUpload } from '../components/FileUpload';
import { Loader } from '../components/Loader';

interface FileData {
  base64: string;
  mimeType: string;
  previewUrl: string;
}

export const CreateVideoView: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [faceImage, setFaceImage] = useState<FileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const handleFileUploaded = useCallback((base64: string, file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setFaceImage({ base64, mimeType: file.type, previewUrl });
    setGeneratedVideoUrl(null);
    setError(null);
  }, []);

  const handleGenerateClick = useCallback(async () => {
    if (!selectedTemplate || !faceImage) {
      setError("Please select a template and upload a face image.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedVideoUrl(null);

    try {
      const faceDescription = await describeFace(faceImage.base64, faceImage.mimeType);
      const videoUrl = await generateVideo(faceDescription, selectedTemplate.prompt);
      setGeneratedVideoUrl(videoUrl);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An unknown error occurred during video generation.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedTemplate, faceImage]);

  const isButtonDisabled = !selectedTemplate || !faceImage || isLoading;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-1 text-white">1. Choose a Template</h2>
        <p className="text-gray-400 mb-4">Select a scene for your video.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`relative rounded-xl cursor-pointer overflow-hidden transition-all duration-300 transform hover:scale-105 ${selectedTemplate?.id === template.id ? 'ring-4 ring-indigo-500' : 'ring-2 ring-transparent'}`}
            >
              <img src={template.imageUrl} alt={template.name} className="w-full h-full object-cover aspect-[3/4]" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
                <span className="font-bold text-white text-lg">{template.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-white">2. Upload Your Photo</h2>
          <p className="text-gray-400 mb-4">We'll use this image to guide the AI.</p>
          <FileUpload onFileUpload={handleFileUploaded} acceptedFileTypes="image/jpeg, image/png" label="Upload Face Photo" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-1 text-white">Preview</h2>
          <p className="text-gray-400 mb-4">Your uploaded image will appear here.</p>
          <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center">
            {faceImage ? (
              <img src={faceImage.previewUrl} alt="Face preview" className="w-full h-full object-contain rounded-xl" />
            ) : (
              <p className="text-gray-500">Image Preview</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-1 text-white">3. Generate Your Video</h2>
        <p className="text-gray-400 mb-4">Click the button below to start the magic!</p>
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
          <button
            onClick={handleGenerateClick}
            disabled={isButtonDisabled}
            className="w-full max-w-xs bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center text-lg"
          >
             {isLoading ? "Generating..." : "✨ Generate Video"}
          </button>
          {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>
      </div>
      
      {(isLoading || generatedVideoUrl) && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Your Result</h2>
          <div className="aspect-w-9 aspect-h-16 max-w-md mx-auto bg-gray-800 rounded-xl flex items-center justify-center">
            {isLoading && <Loader messages={VIDEO_GENERATION_MESSAGES} title="Creating Your Video..." />}
            {generatedVideoUrl && !isLoading && (
              <video src={generatedVideoUrl} controls autoPlay loop className="w-full h-full rounded-xl" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
