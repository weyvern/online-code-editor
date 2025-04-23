'use client';

import { createContext, ReactNode, useContext, useReducer, use } from 'react';
import { utf8ToBase64 } from '@/utils';
import type { Project } from '@/types';

type EditorContextType = {
  project: Project;
  dispatch: React.Dispatch<EditorAction>;
};

type EditorProviderProps = {
  children: ReactNode;
  projectPromise: Promise<Project>;
};

type EditorAction = {
  type: 'EDIT_FILE';
  payload: { filename: string; content: string | undefined };
};

const editorReducer = (state: Project, action: EditorAction): Project => {
  switch (action.type) {
    case 'EDIT_FILE': {
      const { filename, content } = action.payload;
      return {
        ...state,
        files: {
          ...state.files,
          [filename]: {
            ...state.files[filename],
            content: content ? utf8ToBase64(content) : ''
          }
        }
      };
    }
    default:
      return state;
  }
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const EditorProvider: React.FC<EditorProviderProps> = ({ children, projectPromise }) => {
  const initialProject = use(projectPromise);
  const [project, dispatch] = useReducer(editorReducer, initialProject);
  const value = {
    project,
    dispatch
  };

  return <EditorContext value={value}>{children}</EditorContext>;
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};

export default EditorProvider;
