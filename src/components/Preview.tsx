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
    <iframe
      srcDoc={iframeContent}
      title='Preview'
      sandbox='allow-scripts allow-same-origin'
      className='w-full h-full border-none'
    />
  );
};

export default Preview;
