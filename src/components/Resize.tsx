'use client';

import { useEffect, useRef } from 'react';

const MIN_PERCENT = 0;
const MAX_PERCENT = 100;

const Resize = () => {
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const divider = dividerRef.current;
    if (!divider) return;

    const playground = divider.parentElement as HTMLElement;
    const editor = divider.previousSibling as HTMLElement;
    const preview = divider.nextSibling as HTMLElement;

    const handlePointerMove = (e: PointerEvent) => {
      if (!isResizing.current || !dividerRef.current) return;

      const { left, width } = playground.getBoundingClientRect();
      const percentRaw = ((e.clientX - left) / width) * 100;
      const percent = Math.min(MAX_PERCENT, Math.max(MIN_PERCENT, percentRaw));

      requestAnimationFrame(() => {
        editor.style.width = `${percent}%`;
        preview.style.width = `${100 - percent}%`;
      });
    };

    const stopResizing = () => {
      isResizing.current = false;
      document.body.style.userSelect = '';
      preview.style.pointerEvents = 'auto';
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResizing);
    };

    const startResizing = () => {
      isResizing.current = true;
      document.body.style.userSelect = 'none';
      preview.style.pointerEvents = 'none';
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', stopResizing);
    };

    divider.addEventListener('pointerdown', startResizing);
    return () => divider.removeEventListener('pointerdown', startResizing);
  }, []);

  return (
    <div className='w-8 flex cursor-ew-resize justify-center' ref={dividerRef}>
      <div className='divider divider-horizontal divider-primary h-screen'></div>
    </div>
  );
};

export default Resize;
