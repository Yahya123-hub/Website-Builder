// Page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import EditorPage from './main/editor-page';
import Loading from './loading'; // Import the loading component

const Page = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set a timeout to show the content after 5 seconds
    const timer = setTimeout(() => setShowContent(true), 5000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div>
      {showContent ? (
        <EditorPage />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Page;
