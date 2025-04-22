import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import { getProject } from '@/data/projects';
import { Suspense } from 'react';

const Home = () => {
  const projectPromise = getProject();

  return (
    <main className='flex h-screen w-screen'>
      <Suspense
        fallback={<div className='flex items-center justify-center w-full h-full'>Loading...</div>}
      >
        <div className='flex flex-col w-1/2'>
          <Editor projectPromise={projectPromise} />
        </div>
        <div className='flex flex-col w-1/2'>
          {' '}
          <Preview projectPromise={projectPromise} />
        </div>
      </Suspense>
    </main>
  );
};

export default Home;
