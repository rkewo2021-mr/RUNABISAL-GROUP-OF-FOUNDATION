
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          AI Video Face Animator
        </h1>
        <p className="text-gray-400 mt-2">Bring your photos to life with generative AI</p>
      </div>
    </header>
  );
};
