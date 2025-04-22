import { Project } from '@/types';
import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export const parsingStaticProjects = (project: Project) => {
  const nonHtmlFiles = Object.keys(project.files).filter(filename => !filename.endsWith('.html'));

  const htmlFile = project.files['index.html']?.content || '';

  const blobUrls: {
    filename: string;
    blobUrl: string;
  }[] = [];

  for (const filename of nonHtmlFiles) {
    const fileContent = project.files[filename]?.content || '';
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const blobUrl = URL.createObjectURL(blob);
    blobUrls.push({ filename, blobUrl });
  }

  let assembledHtml = htmlFile;

  blobUrls.forEach(({ filename, blobUrl }) => {
    if (filename.endsWith('.js')) {
      const scriptRegex = new RegExp(`<script[^>]*src=['\"]${filename}['\"][^>]*></script>`, 'g');
      assembledHtml = assembledHtml.replace(scriptRegex, `<script src="${blobUrl}"></script>`);
    } else if (filename.endsWith('.css')) {
      const linkRegex = new RegExp(`<link[^>]*href=['\"]${filename}['\"][^>]*>`, 'g');
      assembledHtml = assembledHtml.replace(linkRegex, `<link rel="stylesheet" href="${blobUrl}">`);
    }
  });

  return { assembledHtml, blobUrls };
};
