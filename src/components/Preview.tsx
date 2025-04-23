'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditorContext } from '@/context/EditorContext';
import { parsingStaticProjects, useDebouncedValue } from '@/utils';
import type { Project } from '@/types';

const Preview = () => {
  const { project } = useEditorContext();
  const [iframeContent, setIframeContent] = useState('');
  const debouncedProject = useDebouncedValue<Project>(project, 500);
  const lastBlobUrls = useRef<string[]>([]);

  useEffect(() => {
    const { assembledHtml, blobUrls } = parsingStaticProjects(debouncedProject);
    setIframeContent(assembledHtml);
    lastBlobUrls.current = blobUrls.map(b => b.blobUrl);

    return () => {
      lastBlobUrls.current.forEach(URL.revokeObjectURL);
    };
  }, [debouncedProject]);

  return (
    <div className='w-[calc(100%-2rem)] overflow-hidden'>
      {/* Fake address bar */}
      <div className='bg-gray-200 p-2 border-b border-gray-300'>
        <span className='w-full p-1 bg-white border border-gray-400 rounded text-gray-600 cursor-default flex items-center'>
          🔒 https://preview.example.com
        </span>
      </div>
      {/* Iframe preview */}
      <iframe
        srcDoc={iframeContent}
        title='Preview'
        sandbox='allow-scripts allow-same-origin'
        className='w-full h-full border-none'
      />
    </div>
  );
};

export default Preview;
