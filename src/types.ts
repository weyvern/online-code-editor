export interface ProjectFile {
  content: string;
}

export interface Project {
  name: string;
  type: 'static';
  files: {
    [filename: string]: ProjectFile;
  };
}
