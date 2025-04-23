const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-primary'>404</h1>
        <h2 className='text-3xl font-semibold text-gray-800 mt-4'>Page Not Found</h2>
        <p className='text-gray-600 mt-2'>Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
