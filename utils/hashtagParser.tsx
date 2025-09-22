import React from 'react';
import { SPECIAL_CHARACTERS, HASHTAG_COLORS } from './constants';

/**
 * Parses text and wraps hashtags as highlighted JSX elements
 * @param text - The text content to parse
 * @returns Array of strings and JSX elements with highlighted hashtags
 */
export const parseTextToHighlightHashtags = (text: string): (string | JSX.Element)[] => {
  const escapedSpecialCharacters = SPECIAL_CHARACTERS.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const hashtagRegex = new RegExp(`#([^${escapedSpecialCharacters}]+)`, 'g');

  const parsedContent: (string | JSX.Element)[] = [];
  let lastParsedIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = hashtagRegex.exec(text)) !== null) {
    // Add plain text before the hashtag
    if (match.index > lastParsedIndex) {
      parsedContent.push(text.slice(lastParsedIndex, match.index));
    }

    // Add highlighted hashtag
    parsedContent.push(
      <span
        key={match.index}
        style={{
          color: HASHTAG_COLORS.primary,
          fontWeight: 'bold',
          letterSpacing: '-0.4px',
        }}
      >
        #{match[1]}
      </span>
    );

    lastParsedIndex = hashtagRegex.lastIndex;
  }

  // Add remaining text after the last hashtag
  if (lastParsedIndex < text.length) {
    parsedContent.push(text.slice(lastParsedIndex));
  }

  return parsedContent;
};

/**
 * Renders text content with line breaks preserved
 * @param content - Array of strings and JSX elements
 * @returns JSX elements with proper line break handling
 */
export const renderContentWithLineBreaks = (
  content: (string | JSX.Element)[]
): (string | JSX.Element)[] => {
  const result: (string | JSX.Element)[] = [];
  
  content.forEach((item, index) => {
    if (typeof item === 'string') {
      const lines = item.split('\n');
      lines.forEach((line, lineIndex) => {
        result.push(line);
        if (lineIndex < lines.length - 1) {
          result.push(<br key={`br-${index}-${lineIndex}`} />);
        }
      });
    } else {
      result.push(item);
    }
  });
  
  return result;
};