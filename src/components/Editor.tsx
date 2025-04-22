// src/components/Editor.tsx
'use client';

import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Project } from '@/lib/types';

interface EditorProps {
  initialProject: Project;
}

const Editor: React.FC<EditorProps> = ({ initialProject }) => {
  const [project, setProject] = useState<Project>(initialProject);
  const [activeFile, setActiveFile] = useState<string>(Object.keys(initialProject.files)[0] || '');

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      setProject(prevProject => ({
        ...prevProject,
        files: {
          ...prevProject.files,
          [activeFile]: { content: value }
        }
      }));
      // TODO: Propagate changes up or use state management
    }
  };

  const getLanguage = (filename: string): string => {
    const extension = filename.split('.').pop();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex border-b border-gray-300'>
        {Object.keys(project.files).map(filename => (
          <button
            key={filename}
            onClick={() => setActiveFile(filename)}
            className={`px-4 py-2 text-sm ${
              activeFile === filename
                ? 'border-b-2 border-blue-500 text-blue-600 bg-gray-100'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {filename}
          </button>
        ))}
      </div>
      <div className='flex-grow'>
        {activeFile && (
          <MonacoEditor
            height='100%'
            language={getLanguage(activeFile)}
            theme='vs-dark' // or 'light'
            value={project.files[activeFile]?.content || ''}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              scrollBeyondLastLine: false
            }}
          />
        )}
      </div>
      {/* TODO: Add state propagation logic here or in parent */}
      <div className='p-2 text-xs text-gray-500 border-t'>
        Changes here currently only update local state. Need to lift state up.
      </div>
    </div>
  );
};

export default Editor;
