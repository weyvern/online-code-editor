import { Suspense } from 'react';
import Editor from '@/components/Editor';
import Loading from '@/components/Loading';
import Preview from '@/components/Preview';
import Resize from '@/components/Resize';
import EditorProvider from '@/context/EditorContext';
import { getProject } from '@/data/projects';

const Home = () => {
  const projectPromise = getProject(1);

  return (
    <main className='flex h-screen w-screen'>
      <Suspense fallback={<Loading />}>
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
