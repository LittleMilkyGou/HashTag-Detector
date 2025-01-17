'use client';
import React, { RefObject } from 'react';
import apiClient from '@/lib/apiClient';
import { Hashtag } from '@/interface/hashtag';

export const MAX_CONTENT_LENGTH = 500;

export const fetchMatchingHashtags = async (
  content: string,
  textareaRef: RefObject<HTMLTextAreaElement>,
  updateMatchedHashtags: React.Dispatch<React.SetStateAction<Hashtag[]>>,
) => {
  const textareaElement = textareaRef.current;
  if (!textareaElement) return;

  // Extract the substring between current cursor position and last '#'
  const cursorPosition = textareaElement.selectionStart;
  const lastHashIndex = content.lastIndexOf('#', cursorPosition - 1);
  const hashtagSubstring = content.slice(lastHashIndex + 1, cursorPosition).trim();

  try {
    if (!hashtagSubstring) return;

    const response = await apiClient.get(`/api/hashtag?input=${encodeURIComponent(hashtagSubstring)}`);
    updateMatchedHashtags(response.data.$values);
  } catch (error) {
    console.error('Error fetching matching hashtags:', error);
  }
};

/** Updates the content from the textarea */
export const updateContent = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>,
  resizeTextarea: () => void,
) => {
  const userInput = event.target.value;

  if (userInput.length > MAX_CONTENT_LENGTH) {
    return;
  }

  const hasConsecutiveEmptyLines = /\n\s*\n\s*\n/.test(userInput);
  if (hasConsecutiveEmptyLines) {
    return;
  }

  setContent(userInput);
  setCursorPosition(event.target.selectionStart);

  resizeTextarea();
};


/** Inserts a new '#' at the end of text */
export const insertHashtag = (
  currentContent: string,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  textareaRef: RefObject<HTMLTextAreaElement>,
  setIsHashtagMode: React.Dispatch<React.SetStateAction<boolean>>,
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>,
) => {
  const newContent = currentContent + (currentContent.endsWith(' ') ? '' : ' ') + '#';

  if (newContent.length > MAX_CONTENT_LENGTH) {
    return; 
  }

  if (textareaRef.current) {
    textareaRef.current.focus();
  }

  const newCursorPosition = newContent.length;

  setCursorPosition(newCursorPosition)
  setContent(newContent);
  setIsHashtagMode(true);
};

export const extractHashtags = (content: string) => {
  const extractedHashtags = content.match(/#[\p{L}\p{N}_]+/gu) || [];
  return extractedHashtags.map((hashtag:string) => hashtag.slice(1));
};

export const resizeTextareaElement = (
  textareaRef: RefObject<HTMLTextAreaElement>,
  divRef: RefObject<HTMLDivElement>,
  containerRef: RefObject<HTMLDivElement>,
) => {
  if (textareaRef.current && divRef.current && containerRef.current) {
    textareaRef.current.style.height = 'auto';
    divRef.current.style.height = 'auto';
    containerRef.current.style.height = 'auto';

    const adjustedHeight = `${textareaRef.current.scrollHeight}px`;
    textareaRef.current.style.height = adjustedHeight;
    divRef.current.style.height = adjustedHeight;
    containerRef.current.style.height = 'auto';
  }
};

/** Inserts selected hashtag at the current position */
export const insertContentAtCursor = (
  hashtag: string,
  currentContent: string,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  cursorPositionRef: React.MutableRefObject<number | null>,
  textareaRef: RefObject<HTMLTextAreaElement>,
  setIsHashtagMode: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const textareaElement = textareaRef.current;
  if (!textareaElement) return;

  const cursorPosition = textareaElement.selectionStart;
  const lastHashIndex = currentContent.lastIndexOf('#', cursorPosition - 1);

  if (lastHashIndex !== -1) {
    //insert hashtags in the middle of text
    const contentBeforeHash = currentContent.slice(0, lastHashIndex + 1);
    const contentAfterCursor = currentContent.slice(cursorPosition);
    const updatedContent = `${contentBeforeHash}${hashtag} ${contentAfterCursor}`;
    
    setContent(updatedContent);
    cursorPositionRef.current = contentBeforeHash.length + hashtag.length + 1;
  } else {
    //insert hashtags at the end of text
    setContent((previousContent) => {
      cursorPositionRef.current = previousContent.length + hashtag.length + 1;
      return `${previousContent}#${hashtag}`;
    });
  }

  textareaElement.focus();
  setIsHashtagMode(false);
};

/** 
 * Parses text and wraps hashtags as highlighted JSX elements
 * @returns Array of strings and JSX elements
 */
export const parseTextToHighlightHashtags = (text: string) => {
  const specialCharacters = ' \n!@$%^&*(),.?/{}[];\':"`~<>，。';
  const escapedSpecialCharacters = specialCharacters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const hashtagRegex = new RegExp(`#([^${escapedSpecialCharacters}]+)`, 'g');

  const parsedContent: (string | JSX.Element)[] = []; 
  var lastParsedIndex = 0;
  var match: RegExpExecArray | null; 

  while ((match = hashtagRegex.exec(text)) !== null) {
    // If there's text between the last match and the current match, add it as plain text
    if (match.index > lastParsedIndex) {
      parsedContent.push(text.slice(lastParsedIndex, match.index));
    }

    parsedContent.push(
      <span key={match.index} style={{ color: '#0079FF', fontWeight: 'bold',letterSpacing: '-0.4px' }}>
        #{match[1]}
      </span>
    );

    lastParsedIndex = hashtagRegex.lastIndex;
  }

  // If there's remaining text after the last match, add it as plain text
  if (lastParsedIndex < text.length) {
    parsedContent.push(text.slice(lastParsedIndex));
  }
  return parsedContent;
};
