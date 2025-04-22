import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import { Project } from '@/lib/types';

// Mock project data - replace with actual data fetching later
const getProjectData = async (): Promise<Project> => {
  return {
    type: 'static',
    files: {
      'index.html': {
        content: `<!DOCTYPE html>
<html>
<head>
  <title>Preview</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hello from Editor!</h1>
  <script src="index.js"></script>
</body>
</html>`
      },
      'index.js': {
        content: `console.log('Hello from JavaScript!');
document.body.style.backgroundColor = 'lightblue';`
      },
      'styles.css': {
        content: `h1 {
  color: navy;
}`
      }
    }
  };
};

export default async function Home() {
  const project = await getProjectData();

  return (
    <main className='flex h-screen w-screen'>
      <div className='w-1/2 h-full border-r border-gray-300'>
        <Editor initialProject={project} />
      </div>
      <div className='w-1/2 h-full'>
        <Preview project={project} />
      </div>
    </main>
  );
}
