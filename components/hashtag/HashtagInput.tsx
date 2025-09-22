'use client';
import React, { useRef, useEffect, useState } from 'react';
import { HashtagInputProps } from '@/types/hashtag';
import { HashtagHighlighter } from './HashtagHighlighter';
import { HashtagSuggestions } from './HashtagSuggestions';
import { HashtagButton } from './HashtagButton';
import { useHashtagSuggestions } from '@/hooks/useHashtagSuggestions';
import { useTextareaResize } from '@/hooks/useTextareaResize';
import { UI_TEXT } from '@/utils/constants';

/**
 * Main hashtag input component with highlighting and suggestions
 */
export const HashtagInput: React.FC<HashtagInputProps> = ({
  content,
  onContentChange,
  onCursorPositionChange,
  maxLength = 500,
  placeholder = UI_TEXT.PLACEHOLDER_TEXT,
  className = '',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [cursorPosition, setCursorPosition] = useState(0);

  const {
    suggestions,
    isVisible: isSuggestionsVisible,
    hideSuggestions,
  } = useHashtagSuggestions(content, cursorPosition, textareaRef);

  const { resizeTextarea } = useTextareaResize(textareaRef, displayRef, containerRef);

  // Handle content changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    onContentChange(newContent);
    resizeTextarea();
  };

  // Handle cursor position changes
  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const position = (e.target as HTMLTextAreaElement).selectionStart;
    setCursorPosition(position);
    onCursorPositionChange(position);
  };

  // Handle hashtag button click
  const handleHashtagButtonClick = () => {
    const newContent = content + (content.endsWith(' ') ? '' : ' ') + '#';
    if (newContent.length <= maxLength) {
      onContentChange(newContent);
      if (textareaRef.current) {
        textareaRef.current.focus();
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.setSelectionRange(newContent.length, newContent.length);
          }
        }, 0);
      }
    }
  };

  // Handle hashtag selection from suggestions
  const handleHashtagSelect = (hashtag: string) => {
    const lastHashIndex = content.lastIndexOf('#', cursorPosition - 1);
    
    if (lastHashIndex !== -1) {
      const contentBeforeHash = content.slice(0, lastHashIndex + 1);
      const contentAfterCursor = content.slice(cursorPosition);
      const newContent = `${contentBeforeHash}${hashtag} ${contentAfterCursor}`;
      
      if (newContent.length <= maxLength) {
        onContentChange(newContent);
        const newCursorPosition = contentBeforeHash.length + hashtag.length + 1;
        
        if (textareaRef.current) {
          textareaRef.current.focus();
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
            }
          }, 0);
        }
      }
    }
  };

  // Resize textarea on content change
  useEffect(() => {
    resizeTextarea();
  }, [content, resizeTextarea]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="flex flex-col justify-start relative border border-gray-300 rounded-lg p-3 w-full max-w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        {/* Display layer with highlighted hashtags */}
        <div className="relative">
          <div
            ref={displayRef}
            className="min-h-28 w-full text-gray-800 placeholder-transparent resize-none overflow-hidden focus:outline-none caret-blue-500"
            style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
          >
            <HashtagHighlighter content={content} />
          </div>
          
          {/* Invisible textarea for input */}
          <textarea
            ref={textareaRef}
            className="min-h-28 w-full text-transparent bg-transparent resize-none overflow-hidden focus:outline-none caret-blue-500 absolute top-0 left-0"
            placeholder={placeholder}
            value={content}
            onChange={handleChange}
            onSelect={handleSelect}
            maxLength={maxLength}
          />
        </div>

        {/* Bottom controls */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <HashtagButton
            onClick={handleHashtagButtonClick}
            disabled={maxLength - content.length < 2} // Need at least 2 chars for "# "
          />
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {maxLength - content.length} characters left
            </span>
          </div>
        </div>
      </div>

      {/* Hashtag suggestions dropdown */}
      <HashtagSuggestions
        suggestions={suggestions}
        isVisible={isSuggestionsVisible}
        onSelect={handleHashtagSelect}
        onClose={hideSuggestions}
      />
    </div>
  );
};