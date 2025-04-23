'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditorContext } from '@/context/EditorContext';
import { parsingStaticProjects, useDebouncedValue } from '@/utils';
import type { Project } from '@/types';

const Preview = () => {
  const { project } = useEditorContext();
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
    <div className='mockup-browser border border-base-300' style={{ width: 'calc(100% - 2rem)' }}>
      <div className='mockup-browser-toolbar'>
        <div className='input'>https://preview.wbscod.in</div>
        <div className='flex-none'>
          <button
            className='btn btn-ghost btn-sm'
            onClick={() => {
              if (iframeRef.current) {
                iframeRef.current.contentWindow?.location.reload();
              }
            }}
          >
            Reload
          </button>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={iframeContent}
        title={project.name}
        sandbox='allow-scripts allow-same-origin'
        className='grid place-content-center w-full h-full'
      />
    </div>
  );
};

export default Preview;
