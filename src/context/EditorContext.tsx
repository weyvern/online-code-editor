'use client';

import { createContext, useContext, useState, use } from 'react';
import type { ReactNode } from 'react';
import type { Project } from '@/lib/types';

interface EditorContextType {
  project: Project;
}

interface EditorProviderProps {
  children: ReactNode;
  projectPromise: Promise<Project>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const EditorProvider: React.FC<EditorProviderProps> = ({ children, projectPromise }) => {
  const [project, setProject] = useState<Project>(use(projectPromise));

  const value = {
    project
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};

export default EditorProvider;
