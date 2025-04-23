import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Code Editor',
  description: 'A simple code editor built with Next.js and Monaco Editor'
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
