import { useState, useRef, useCallback, RefObject } from 'react';
import { MAX_CONTENT_LENGTH } from '@/utils/constants';
import { hasConsecutiveEmptyLines, replaceHashtagAtCursor } from '@/utils/textUtils';

/**
 * Custom hook for managing hashtag input functionality
 * @param initialContent - Initial content value
 * @param maxLength - Maximum content length (optional)
 * @returns Input state and handlers
 */
export const useHashtagInput = (
  initialContent: string = '',
  maxLength: number = MAX_CONTENT_LENGTH
) => {
  const [content, setContent] = useState<string>(initialContent);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const cursorPositionRef = useRef<number | null>(null);

  // Update content with validation
  const updateContent = useCallback((
    newContent: string,
    newCursorPosition?: number
  ) => {
    // Validate content length
    if (newContent.length > maxLength) {
      return false;
    }

    // Validate consecutive empty lines
    if (hasConsecutiveEmptyLines(newContent)) {
      return false;
    }

    setContent(newContent);
    
    if (newCursorPosition !== undefined) {
      setCursorPosition(newCursorPosition);
      cursorPositionRef.current = newCursorPosition;
    }

    return true;
  }, [maxLength]);

  // Handle textarea change event
  const handleContentChange = useCallback((
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContent = event.target.value;
    const newCursorPosition = event.target.selectionStart;
    
    updateContent(newContent, newCursorPosition);
  }, [updateContent]);

  // Handle cursor position change
  const handleCursorPositionChange = useCallback((
    event: React.SyntheticEvent<HTMLTextAreaElement>
  ) => {
    const newPosition = (event.target as HTMLTextAreaElement).selectionStart;
    setCursorPosition(newPosition);
    cursorPositionRef.current = newPosition;
  }, []);

  // Insert hashtag at the end of content
  const insertHashtagAtEnd = useCallback(() => {
    const newContent = content + (content.endsWith(' ') ? '' : ' ') + '#';
    
    if (newContent.length > maxLength) {
      return false;
    }

    const newCursorPosition = newContent.length;
    setContent(newContent);
    setCursorPosition(newCursorPosition);
    cursorPositionRef.current = newCursorPosition;
    
    return true;
  }, [content, maxLength]);

  // Insert selected hashtag at cursor position
  const insertHashtagAtCursor = useCallback((
    hashtag: string,
    textareaRef: RefObject<HTMLTextAreaElement>
  ) => {
    const result = replaceHashtagAtCursor(content, hashtag, cursorPosition);
    
    if (result.content.length > maxLength) {
      return false;
    }

    setContent(result.content);
    setCursorPosition(result.newCursorPosition);
    cursorPositionRef.current = result.newCursorPosition;

    // Focus textarea after insertion
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Set cursor position after a brief delay to ensure it's applied
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(
            result.newCursorPosition,
            result.newCursorPosition
          );
        }
      }, 0);
    }

    return true;
  }, [content, cursorPosition, maxLength]);

  // Reset content
  const resetContent = useCallback(() => {
    setContent('');
    setCursorPosition(0);
    cursorPositionRef.current = 0;
  }, []);

  // Get remaining character count
  const getRemainingCount = useCallback(() => {
    return maxLength - content.length;
  }, [content.length, maxLength]);

  return {
    content,
    cursorPosition,
    cursorPositionRef,
    updateContent,
    handleContentChange,
    handleCursorPositionChange,
    insertHashtagAtEnd,
    insertHashtagAtCursor,
    resetContent,
    getRemainingCount,
  };
};