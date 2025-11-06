
import React, { useState, useEffect } from 'react';

interface LoaderProps {
  messages: string[];
  title: string;
}

export const Loader: React.FC<LoaderProps> = ({ messages, title }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-xl">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-gray-400 text-center transition-opacity duration-500">
        {messages[currentMessageIndex]}
      </p>
    </div>
  );
};
