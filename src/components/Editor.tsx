'use client';

import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useEditorContext } from '@/context/EditorContext';
import { base64ToUtf8 } from '@/utils';
import type { Project } from '@/types';

interface FileTree {
  [key: string]: FileTree | null;
}

const renderFileTree = (
  files: Project['files'],
  activeFile: string,
  setActiveFile: React.Dispatch<React.SetStateAction<string>>
) => {
  const fileTree: FileTree = {};

  Object.keys(files).forEach(filePath => {
    const parts = filePath.split('/');
    let current = fileTree;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? null : {};
      }
      current = current[part] as FileTree;
    });
  });

  const renderTree = (tree: FileTree, path = '') => {
    return Object.entries(tree).map(([key, value]) => {
      const fullPath = path ? `${path}/${key}` : key;

      if (value === null) {
        return (
          <li key={fullPath}>
            <button
              onClick={() => setActiveFile(fullPath)}
              className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                activeFile === fullPath
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {key}
            </button>
          </li>
        );
      }

      return (
        <li key={fullPath}>
          <div className='px-4 py-2 font-bold text-gray-700'>{key}</div>
          <ul className='pl-4'>{renderTree(value, fullPath)}</ul>
        </li>
      );
    });
  };

  return <ul className='flex-grow overflow-y-auto'>{renderTree(fileTree)}</ul>;
};

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
    <div className='flex h-full w-[calc(100%-2rem)] overflow-hidden'>
      <div className='w-1/5 border-r border-gray-300 bg-gray-50'>
        <div className='p-2 font-bold text-gray-700'>Project</div>
        {renderFileTree(project.files, activeFile, setActiveFile)}
      </div>
      <div className='w-5/6'>
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
