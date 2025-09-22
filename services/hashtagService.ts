import apiClient from '@/lib/apiClient';
import { Hashtag } from '@/types/hashtag';

/**
 * Fetches matching hashtags from the API
 * @param input - The hashtag input string to search for
 * @returns Promise resolving to array of matching hashtags
 */
export const fetchMatchingHashtags = async (input: string): Promise<Hashtag[]> => {
  try {
    if (!input.trim()) {
      return [];
    }

    const response = await apiClient.get(`/api/hashtag?input=${encodeURIComponent(input)}`);
    return response.data.$values || [];
  } catch (error) {
    console.error('Error fetching matching hashtags:', error);
    return [];
  }
};

/**
 * Service class for hashtag-related API operations
 */
export class HashtagService {
  /**
   * Gets hashtag suggestions based on input
   * @param input - The input string to search for
   * @returns Promise resolving to hashtag suggestions
   */
  static async getSuggestions(input: string): Promise<Hashtag[]> {
    return fetchMatchingHashtags(input);
  }

  /**
   * Validates hashtag input
   * @param input - The hashtag input to validate
   * @returns True if input is valid
   */
  static validateHashtagInput(input: string): boolean {
    if (!input || input.trim().length === 0) {
      return false;
    }

    // Check for invalid characters
    const invalidChars = /[!@$%^&*(),.?/{}[\];'":`~<>，。？（）【】、《》]/;
    return !invalidChars.test(input);
  }

  /**
   * Formats hashtag for display
   * @param hashtag - The hashtag object
   * @returns Formatted hashtag string
   */
  static formatHashtagDisplay(hashtag: Hashtag): string {
    return `#${hashtag.tagName}`;
  }

  /**
   * Formats hashtag count for display
   * @param count - The usage count
   * @returns Formatted count string
   */
  static formatHashtagCount(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M people using`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K people using`;
    } else {
      return `${count} people using`;
    }
  }
}