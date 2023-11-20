import React, { useEffect, useRef } from 'react';

const triggers = {
  context: 'contextmenu',
  click: 'click',
};

export function ContextMenu({ target, trigger = 'context', children }) {
  const contextMenuRef = useRef();

  useEffect(() => {
    if (!target || !contextMenuRef.current) {
      return;
    }

    const event = triggers[trigger];
    let currentRect = null;
    let menuVisible = false;

    function handleContextMenu(event) {
      event.preventDefault();
      event.stopPropagation();

      currentRect = target.getBoundingClientRect();

      var x = event.clientX - currentRect.left;
      var y = event.clientY - currentRect.top;

      contextMenuRef.current.style.left = currentRect.left + x + 'px';
      contextMenuRef.current.style.top = currentRect.top + y + 'px';
      contextMenuRef.current.style.display = 'flex';
      menuVisible = true;
    }
    target.addEventListener(event, handleContextMenu);

    function handleScroll() {
      if (menuVisible) {
        const newRect = target.getBoundingClientRect();
        const deltaX = newRect.left - currentRect.left;
        const deltaY = newRect.top - currentRect.top;

        contextMenuRef.current.style.left =
          parseInt(contextMenuRef.current.style.left, 10) + deltaX + 'px';
        contextMenuRef.current.style.top =
          parseInt(contextMenuRef.current.style.top, 10) + deltaY + 'px';

        currentRect = newRect;
      }
    }
    window.addEventListener('scroll', handleScroll);

    function handleOutsideClick(event) {
      if (menuVisible && event.target !== target) {
        contextMenuRef.current.style.display = 'none';
        menuVisible = false;
      }
    }
    document.addEventListener('click', handleOutsideClick);

    return () => {
      target.removeEventListener(event, handleContextMenu);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [target, trigger]);

  if (!target) {
    return null;
  }

  return (
    <div className="context-menu" ref={contextMenuRef}>
      {children}
    </div>
  );
}
