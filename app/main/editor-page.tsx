import React from 'react'
import EditorProvider from './editor-provider'
import { notFound } from 'next/navigation'
import EditorNavigation from './editor-navigation'
import EditorContent from './editor-content'
import EditorSidebar from './editor-sidebar'

const EditorPage = async () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
    <EditorProvider>
      <EditorNavigation/>
      <div className="h-full flex justify-center">
        <EditorContent liveMode={true} />
      </div>
      <EditorSidebar/>
    </EditorProvider>
   </div>
  ) 
}

export default EditorPage
