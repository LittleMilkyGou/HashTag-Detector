import { RefObject, useCallback } from 'react';

/**
 * Custom hook for managing textarea auto-resize functionality
 * @param textareaRef - Reference to the textarea element
 * @param displayRef - Reference to the display div element
 * @param containerRef - Reference to the container element
 * @returns Resize function
 */
export const useTextareaResize = (
  textareaRef: RefObject<HTMLTextAreaElement>,
  displayRef: RefObject<HTMLDivElement>,
  containerRef: RefObject<HTMLDivElement>
) => {
  const resizeTextarea = useCallback(() => {
    if (textareaRef.current && displayRef.current && containerRef.current) {
      // Reset heights to auto to get natural height
      textareaRef.current.style.height = 'auto';
      displayRef.current.style.height = 'auto';
      containerRef.current.style.height = 'auto';

      // Get the scroll height and apply it to both elements
      const scrollHeight = textareaRef.current.scrollHeight;
      const adjustedHeight = `${scrollHeight}px`;
      
      textareaRef.current.style.height = adjustedHeight;
      displayRef.current.style.height = adjustedHeight;
      containerRef.current.style.height = 'auto';
    }
  }, [textareaRef, displayRef, containerRef]);

  return { resizeTextarea };
};