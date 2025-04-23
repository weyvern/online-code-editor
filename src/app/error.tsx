'use client';

import { useEffect } from 'react';

const Error = ({ error }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-primary'>Ooops!</h1>
        <h2 className='text-3xl font-semibold text-gray-800 mt-4'>Something went wrong</h2>
        <p className='text-gray-600 mt-2'>
          If you are a dev or something, maybe check the console?
        </p>
      </div>
    </div>
  );
};

export default Error;
