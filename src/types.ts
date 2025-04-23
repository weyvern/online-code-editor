export interface ProjectFile {
  content: string;
}

export interface Project {
  id: number;
  name: string;
  type: 'static';
  files: {
    [filename: string]: ProjectFile;
  };
}
