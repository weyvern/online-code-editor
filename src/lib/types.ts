// src/lib/types.ts
export interface ProjectFile {
  content: string;
}

export interface Project {
  type: 'static'; // For now, only static HTML/JS/CSS
  files: {
    [filename: string]: ProjectFile;
  };
}
