import { useState, useEffect, useCallback, RefObject } from 'react';
import { Hashtag } from '@/types/hashtag';
import { HashtagService } from '@/services/hashtagService';
import { getHashtagSubstring, isSpecialCharacter } from '@/utils/textUtils';

/**
 * Custom hook for managing hashtag suggestions
 * @param content - Current text content
 * @param cursorPosition - Current cursor position
 * @param textareaRef - Reference to textarea element
 * @returns Hashtag suggestions state and handlers
 */
export const useHashtagSuggestions = (
  content: string,
  cursorPosition: number,
  textareaRef: RefObject<HTMLTextAreaElement>
) => {
  const [suggestions, setSuggestions] = useState<Hashtag[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch suggestions based on current input
  const fetchSuggestions = useCallback(async (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await HashtagService.getSuggestions(input);
      setSuggestions(results);
    } catch (error) {
      console.error('Failed to fetch hashtag suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Show hashtag suggestions
  const showSuggestions = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Hide hashtag suggestions
  const hideSuggestions = useCallback(() => {
    setIsVisible(false);
    setSuggestions([]);
  }, []);

  // Handle hashtag selection
  const selectHashtag = useCallback((hashtag: string) => {
    hideSuggestions();
    return hashtag;
  }, [hideSuggestions]);

  // Effect to manage suggestion visibility and fetching
  useEffect(() => {
    if (cursorPosition > 0) {
      const characterBeforeCursor = content[cursorPosition - 1];

      // Hide suggestions if special character is typed
      if (isSpecialCharacter(characterBeforeCursor)) {
        hideSuggestions();
        return;
      }

      // Show suggestions if # is typed
      if (characterBeforeCursor === '#') {
        showSuggestions();
        setSuggestions([]);
        return;
      }
    }

    // Fetch suggestions if in hashtag mode
    if (isVisible) {
      const hashtagSubstring = getHashtagSubstring(content, cursorPosition);
      fetchSuggestions(hashtagSubstring);
    }
  }, [content, cursorPosition, isVisible, fetchSuggestions, hideSuggestions, showSuggestions]);

  return {
    suggestions,
    isVisible,
    isLoading,
    showSuggestions,
    hideSuggestions,
    selectHashtag,
  };
};