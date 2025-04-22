'use client';

import { useEffect, useState } from 'react';
import { useEditorContext } from '@/context/EditorContext';

const Preview = () => {
  const { project } = useEditorContext();
  const [iframeContent, setIframeContent] = useState('');

  useEffect(() => {
    // Assemble the HTML document whenever the project state changes
    const htmlFile = project.files['index.html']?.content || '';
    const cssFile = project.files['styles.css']?.content || '';
    const jsFile = project.files['index.js']?.content || '';

    // Basic assembly: Inject CSS into <style> and JS into <script>
    // More robust assembly might be needed for complex cases (e.g., multiple scripts, modules)
    const assembledHtml = htmlFile
      .replace('</head>', `<style>${cssFile}</style></head>`)
      .replace('</body>', `<script>${jsFile}</script></body>`);

    setIframeContent(assembledHtml);
  }, [project]); // Re-run effect when project data changes

  return (
    <iframe
      srcDoc={iframeContent}
      title='Preview'
      sandbox='allow-scripts allow-same-origin' // Security sandbox settings
      className='w-full h-full border-none'
    />
  );
};

export default Preview;
