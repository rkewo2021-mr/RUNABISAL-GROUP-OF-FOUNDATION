
import React, { useState, useCallback } from 'react';
import { AnimationStyle } from '../types';
import { ANIMATION_STYLES } from '../constants';
import { animateImage } from '../services/geminiService';
import { FileUpload } from '../components/FileUpload';
import { Loader } from '../components/Loader';

interface FileData {
  base64: string;
  mimeType: string;
  previewUrl: string;
}

export const AnimatePhotoView: React.FC = () => {
  const [sourcePhoto, setSourcePhoto] = useState<FileData | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<AnimationStyle | null>(ANIMATION_STYLES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animatedPhotoUrl, setAnimatedPhotoUrl] = useState<string | null>(null);

  const handleFileUploaded = useCallback((base64: string, file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setSourcePhoto({ base64, mimeType: file.type, previewUrl });
    setAnimatedPhotoUrl(null);
    setError(null);
  }, []);

  const handleAnimateClick = useCallback(async () => {
    if (!selectedStyle || !sourcePhoto) {
      setError("Please select a style and upload a photo.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setAnimatedPhotoUrl(null);

    try {
      const imageUrl = await animateImage(sourcePhoto.base64, sourcePhoto.mimeType, selectedStyle.promptSuffix);
      setAnimatedPhotoUrl(imageUrl);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An unknown error occurred during animation.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedStyle, sourcePhoto]);
  
  const isButtonDisabled = !selectedStyle || !sourcePhoto || isLoading;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-1 text-white">1. Upload Your Photo</h2>
        <p className="text-gray-400 mb-4">Choose any photo you want to transform.</p>
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <FileUpload onFileUpload={handleFileUploaded} acceptedFileTypes="image/jpeg, image/png" label="Upload Photo" />
            <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center">
                {sourcePhoto ? (
                <img src={sourcePhoto.previewUrl} alt="Source preview" className="w-full h-full object-contain rounded-xl" />
                ) : (
                <p className="text-gray-500">Image Preview</p>
                )}
            </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-1 text-white">2. Choose an Animation Style</h2>
        <p className="text-gray-400 mb-4">Select a style for your new image.</p>
        <div className="flex flex-wrap gap-3">
          {ANIMATION_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${selectedStyle?.id === style.id ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-1 text-white">3. Generate Your Animation</h2>
        <p className="text-gray-400 mb-4">Let's create your animated masterpiece!</p>
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
            <button
                onClick={handleAnimateClick}
                disabled={isButtonDisabled}
                className="w-full max-w-xs bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center text-lg"
            >
                {isLoading ? "Animating..." : "🎨 Animate Photo"}
            </button>
            {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>
      </div>

       {(isLoading || animatedPhotoUrl) && (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Your Result</h2>
            <div className="aspect-square max-w-lg mx-auto bg-gray-800 rounded-xl flex items-center justify-center">
                {isLoading && <Loader messages={["Applying artistic filters...", "Painting with pixels...", "Almost done..."]} title="Animating Your Photo..." />}
                {animatedPhotoUrl && !isLoading && (
                    <img src={animatedPhotoUrl} alt="Animated result" className="w-full h-full object-contain rounded-xl" />
                )}
            </div>
        </div>
      )}

    </div>
  );
};
