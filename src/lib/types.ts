export interface ProjectFile {
  content: string;
}

export interface Project {
  type: 'static';
  files: {
    [filename: string]: ProjectFile;
  };
}
