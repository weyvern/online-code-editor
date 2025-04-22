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

export const utf8ToBase64 = (str: string) => {
  // Encode string to UTF-8 bytes
  const utf8Bytes = new TextEncoder().encode(str);
  // Convert bytes to Base64
  return btoa(String.fromCharCode(...utf8Bytes));
};

export const base64ToUtf8 = (base64: string) => {
  // Decode Base64 to binary string
  const binaryStr = atob(base64);
  // Convert binary string to Uint8Array
  const utf8Bytes = Uint8Array.from(binaryStr, char => char.charCodeAt(0));
  // Decode UTF-8 bytes to string
  return new TextDecoder().decode(utf8Bytes);
};

export const parsingStaticProjects = (project: Project) => {
  const nonHtmlFiles = Object.keys(project.files).filter(filename => !filename.endsWith('.html'));
  const htmlString = base64ToUtf8(project.files['index.html']?.content || '');

  const blobUrls: {
    filename: string;
    blobUrl: string;
  }[] = [];

  for (const filename of nonHtmlFiles) {
    const fileContent = base64ToUtf8(project.files[filename]?.content || '');
    const type = filename.endsWith('.js') ? 'text/javascript' : 'text/css';
    const blob = new Blob([fileContent], { type });
    const blobUrl = URL.createObjectURL(blob);
    blobUrls.push({ filename, blobUrl });
  }

  let assembledHtml = htmlString;

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
