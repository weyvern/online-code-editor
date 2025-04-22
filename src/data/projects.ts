import type { Project } from '@/lib/types';

export const getProject = async (): Promise<Project> => {
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
