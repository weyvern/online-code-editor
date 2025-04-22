'use client';

import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useEditorContext } from '@/context/EditorContext';
import { base64ToUtf8 } from '@/utils';

const Editor = () => {
  const { project, dispatch } = useEditorContext();
  const [activeFile, setActiveFile] = useState<string>(
    project ? Object.keys(project.files)[0] || '' : ''
  );

  const handleEditorChange = (value: string | undefined) => {
    dispatch({
      type: 'EDIT_FILE',
      payload: { filename: activeFile, content: value }
    });
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
        {activeFile && project.files[activeFile] ? (
          <MonacoEditor
            language={getLanguage(activeFile)}
            theme='vs-dark'
            value={base64ToUtf8(project.files[activeFile]?.content || '')}
            onChange={handleEditorChange}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              scrollBeyondLastLine: false
            }}
          />
        ) : (
          <div className='flex items-center justify-center h-full text-gray-500'>
            Select a file to edit
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
