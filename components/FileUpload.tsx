
import React, { useState, useCallback, useRef } from 'react';

interface FileUploadProps {
  onFileUpload: (base64: string, file: File) => void;
  acceptedFileTypes: string;
  label: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, acceptedFileTypes, label }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        if (base64) {
          onFileUpload(base64, file);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onFileUpload]);
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors duration-300 bg-gray-800/50"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        className="hidden"
      />
      <div className="flex flex-col items-center">
        <UploadIcon />
        <p className="mt-2 font-semibold text-indigo-400">{label}</p>
        <p className="text-sm text-gray-400 mt-1">
          {fileName || 'Drag & drop or click to upload'}
        </p>
      </div>
    </div>
  );
};

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);
