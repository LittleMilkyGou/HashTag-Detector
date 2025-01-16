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

export const updateContent = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>,
  resizeTextarea: () => void,
) => {
  const userInput = event.target.value;

  const hasConsecutiveEmptyLines = /\n\s*\n\s*\n/.test(userInput);
  if (hasConsecutiveEmptyLines) {
    return;
  }

  setContent(userInput);
  setCursorPosition(event.target.selectionStart);

  resizeTextarea();
};



export const insertHashtag = (
  currentContent: string,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  textareaRef: RefObject<HTMLTextAreaElement>,
) => {
  const updatedContent = currentContent + (currentContent.endsWith('\n') ? '' : '\n') + '#';
  if (textareaRef.current) {
    textareaRef.current.focus();
  }
  setContent(updatedContent);
};

export const extractHashtags = (content: string) => {
  const extractedHashtags = content.match(/#[\p{L}\p{N}_]+/gu) || [];
  return extractedHashtags.map((hashtag) => hashtag.slice(1));
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
    const contentBeforeHash = currentContent.slice(0, lastHashIndex + 1);
    const contentAfterCursor = currentContent.slice(cursorPosition);
    const updatedContent = `${contentBeforeHash}${hashtag} ${contentAfterCursor}`;
    
    setContent(updatedContent);
    cursorPositionRef.current = contentBeforeHash.length + hashtag.length + 1;
  } else {
    setContent((previousContent) => {
      cursorPositionRef.current = previousContent.length + hashtag.length + 1;
      return `${previousContent}#${hashtag}`;
    });
  }

  textareaElement.focus();
  setIsHashtagMode(false);
};

export const parseTextToHighlightHashtags = (text: string) => {
  const specialCharacters = ' \n!@$%^&*(),.?/{}[];\':"`~<>，。';
  const escapedSpecialCharacters = specialCharacters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const hashtagRegex = new RegExp(`#([^${escapedSpecialCharacters}]+)`, 'g');

  const parsedContent: (string | JSX.Element)[] = [];
  var lastParsedIndex = 0;
  var match;

  while ((match = hashtagRegex.exec(text)) !== null) {
    if (match.index > lastParsedIndex) {
      parsedContent.push(text.slice(lastParsedIndex, match.index));
    }
    parsedContent.push(
      <span key={match.index} style={{ color: '#0079FF' }}>
        #{match[1]}
      </span>
    );
    lastParsedIndex = hashtagRegex.lastIndex;
  }

  if (lastParsedIndex < text.length) {
    parsedContent.push(text.slice(lastParsedIndex));
  }
  return parsedContent;
};
