'use client';
import React, { useState, useEffect } from 'react';
import { HashtagInput } from './HashtagInput';
import { ExtractedHashtags } from './ExtractedHashtags';
import { extractHashtags } from '@/utils/textUtils';
import { MAX_CONTENT_LENGTH, UI_TEXT } from '@/utils/constants';

interface HashtagEditorProps {
  initialContent?: string;
  maxLength?: number;
  onContentChange?: (content: string) => void;
  onHashtagsChange?: (hashtags: string[]) => void;
  showExtractedTags?: boolean;
  className?: string;
}

/**
 * Complete hashtag editor with input and extracted tags display
 */
export const HashtagEditor: React.FC<HashtagEditorProps> = ({
  initialContent = '',
  maxLength = MAX_CONTENT_LENGTH,
  onContentChange,
  onHashtagsChange,
  showExtractedTags = true,
  className = '',
}) => {
  const [content, setContent] = useState<string>(initialContent);

  const [extractedHashtags, setExtractedHashtags] = useState<string[]>([]);

  // Handle content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onContentChange?.(newContent);
  };

  // Handle cursor position changes
  const handleCursorPositionChange = (position: number) => {
    // Position tracking for future use
    console.log('Cursor position:', position);
  };

  // Extract hashtags when content changes
  useEffect(() => {
    const hashtags = extractHashtags(content);
    setExtractedHashtags(hashtags);
    onHashtagsChange?.(hashtags);
  }, [content, onHashtagsChange]);

  return (
    <div className={`w-full ${className}`}>
      <HashtagInput
        content={content}
        onContentChange={handleContentChange}
        onCursorPositionChange={handleCursorPositionChange}
        maxLength={maxLength}
        placeholder={UI_TEXT.PLACEHOLDER_TEXT}
      />
      
      {showExtractedTags && (
        <ExtractedHashtags
          hashtags={extractedHashtags}
          title={UI_TEXT.EXTRACTED_TAGS}
        />
      )}
    </div>
  );
};