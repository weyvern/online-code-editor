import { Suspense } from 'react';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import Resize from '@/components/Resize';
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
          <Editor />
          <Resize />
          <Preview />
        </EditorProvider>
      </Suspense>
    </main>
  );
};

export default Home;
