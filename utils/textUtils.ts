import { HASHTAG_REGEX, SPECIAL_CHARACTERS } from './constants';

/**
 * Extracts hashtags from text content
 * @param content - The text content to extract hashtags from
 * @returns Array of hashtag strings without the # symbol
 */
export const extractHashtags = (content: string): string[] => {
  const extractedHashtags = content.match(HASHTAG_REGEX) || [];
  return extractedHashtags.map((hashtag: string) => hashtag.slice(1));
};

/**
 * Checks if content has consecutive empty lines
 * @param content - The text content to check
 * @returns True if content has more than 2 consecutive newlines
 */
export const hasConsecutiveEmptyLines = (content: string): boolean => {
  return /\n\s*\n\s*\n/.test(content);
};

/**
 * Gets the hashtag substring being typed at cursor position
 * @param content - The full text content
 * @param cursorPosition - Current cursor position
 * @returns The hashtag substring being typed (without #)
 */
export const getHashtagSubstring = (content: string, cursorPosition: number): string => {
  const lastHashIndex = content.lastIndexOf('#', cursorPosition - 1);
  if (lastHashIndex === -1) return '';
  
  return content.slice(lastHashIndex + 1, cursorPosition).trim();
};

/**
 * Checks if character is a special character that should stop hashtag mode
 * @param char - Character to check
 * @returns True if character is a special character
 */
export const isSpecialCharacter = (char: string): boolean => {
  const specialCharactersRegex = /[ \n!@$%^&*()-=_+|,.?/{}[\];'":`~<>，。？（）【】、《》]/;
  return specialCharactersRegex.test(char);
};

/**
 * Inserts content at a specific position in text
 * @param originalContent - Original text content
 * @param insertContent - Content to insert
 * @param position - Position to insert at
 * @returns New content with inserted text
 */
export const insertContentAtPosition = (
  originalContent: string,
  insertContent: string,
  position: number
): string => {
  return originalContent.slice(0, position) + insertContent + originalContent.slice(position);
};

/**
 * Replaces hashtag substring with selected hashtag
 * @param content - Original content
 * @param hashtag - Selected hashtag (without #)
 * @param cursorPosition - Current cursor position
 * @returns Object with new content and cursor position
 */
export const replaceHashtagAtCursor = (
  content: string,
  hashtag: string,
  cursorPosition: number
): { content: string; newCursorPosition: number } => {
  const lastHashIndex = content.lastIndexOf('#', cursorPosition - 1);
  
  if (lastHashIndex !== -1) {
    // Replace hashtag in the middle of text
    const contentBeforeHash = content.slice(0, lastHashIndex + 1);
    const contentAfterCursor = content.slice(cursorPosition);
    const newContent = `${contentBeforeHash}${hashtag} ${contentAfterCursor}`;
    const newCursorPosition = contentBeforeHash.length + hashtag.length + 1;
    
    return { content: newContent, newCursorPosition };
  } else {
    // Insert hashtag at the end of text
    const newContent = `${content}#${hashtag} `;
    const newCursorPosition = newContent.length;
    
    return { content: newContent, newCursorPosition };
  }
};