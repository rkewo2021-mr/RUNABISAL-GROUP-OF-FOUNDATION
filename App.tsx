
import React, { useState, useCallback } from 'react';
import { CreateVideoView } from './views/CreateVideoView';
import { AnimatePhotoView } from './views/AnimatePhotoView';
import { Header } from './components/Header';
import { TabButton } from './components/TabButton';
import { AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.CREATE_VIDEO);

  const renderView = () => {
    switch (mode) {
      case AppMode.CREATE_VIDEO:
        return <CreateVideoView />;
      case AppMode.ANIMATE_PHOTO:
        return <AnimatePhotoView />;
      default:
        return <CreateVideoView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-center space-x-2 md:space-x-4 mb-8 bg-gray-800 p-2 rounded-xl max-w-md mx-auto">
          <TabButton
            label="Create Real-Face Video"
            isActive={mode === AppMode.CREATE_VIDEO}
            onClick={() => setMode(AppMode.CREATE_VIDEO)}
            icon={<SparklesIcon />}
          />
          <TabButton
            label="Animate Your Photo"
            isActive={mode === AppMode.ANIMATE_PHOTO}
            onClick={() => setMode(AppMode.ANIMATE_PHOTO)}
            icon={<CameraIcon />}
          />
        </div>
        {renderView()}
      </main>
    </div>
  );
};


const SparklesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1.586l.707-.707a1 1 0 011.414 0l.707.707V3a1 1 0 112 0v1.586l.707-.707a1 1 0 011.414 0l.707.707V3a1 1 0 112 0v1.586l.293.293a1 1 0 010 1.414l-1 1a1 1 0 01-1.414-1.414L15.586 6H14a1 1 0 110-2h-1.586l-.707.707a1 1 0 01-1.414 0L9.586 4H8a1 1 0 01-1-1V2a1 1 0 011-1zM3 10a1 1 0 011-1h1.586l.707.707a1 1 0 010 1.414l-1 1a1 1 0 01-1.414 0L4.586 11H3a1 1 0 01-1-1zm14 0a1 1 0 011-1h1.586l.707.707a1 1 0 010 1.414l-1 1a1 1 0 01-1.414 0L16.586 11H15a1 1 0 01-1-1zm-8 4a1 1 0 011-1h1.586l.707.707a1 1 0 010 1.414l-1 1a1 1 0 01-1.414 0L9.586 15H8a1 1 0 01-1-1zm-5-4a1 1 0 00-1 1v1.586l-.707.707a1 1 0 000 1.414l1 1a1 1 0 001.414-1.414L3.414 16H5a1 1 0 100-2H3.414l.293-.293a1 1 0 000-1.414L3 11.586V10zm12 0a1 1 0 00-1 1v1.586l-.707.707a1 1 0 000 1.414l1 1a1 1 0 001.414-1.414L15.414 16H17a1 1 0 100-2h-1.586l.293-.293a1 1 0 000-1.414L15 11.586V10z" clipRule="evenodd" />
  </svg>
);

const CameraIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);


export default App;

