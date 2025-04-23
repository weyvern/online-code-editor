'use client';

import { useEffect, useRef } from 'react';

const Resize = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isResizing = false;
    const divider = ref.current!;
    const playground = divider.parentElement as HTMLElement;
    const editor = divider.previousSibling as HTMLElement;
    const preview = divider.nextSibling as HTMLElement;

    const handleMouseMove = (event: MouseEvent) => {
      if (isResizing) {
        const containerRect = playground.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;
        const percent = (mouseX / containerRect.width) * 100;
        editor.style.width = `${percent}%`;
        preview.style.width = `${100 - percent}%`;
      }
    };

    const handleMouseDown = () => {
      isResizing = true;
      preview.style.pointerEvents = 'none';
      playground.addEventListener('mousemove', handleMouseMove);
      playground.addEventListener('mouseup', () => {
        isResizing = false;
        preview.style.pointerEvents = 'auto';
        playground.removeEventListener('mousemove', handleMouseMove);
      });
    };

    divider.addEventListener('mousedown', handleMouseDown);

    return () => {
      divider.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className='w-8 flex cursor-ew-resize justify-center' ref={ref}>
      <div className='divider divider-horizontal divider-primary h-screen'>
        <span>div</span>
      </div>
    </div>
  );
};

export default Resize;
