import { Suspense } from 'react';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import EditorProvider from '@/context/EditorContext';
import { getProject } from '@/data/projects';

const Home = () => {
  const projectPromise = getProject();

  return (
    <main className='flex h-screen w-screen'>
      <Suspense
        fallback={<div className='flex items-center justify-center w-full h-full'>Loading...</div>}
      >
        <EditorProvider projectPromise={projectPromise}>
          <div className='flex flex-col w-1/2'>
            <Editor />
          </div>
          <div className='flex flex-col w-1/2'>
            <Preview />
          </div>
        </EditorProvider>
      </Suspense>
    </main>
  );
};

export default Home;
