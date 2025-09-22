export const MAX_CONTENT_LENGTH = 500;

export const HASHTAG_REGEX = /#[\p{L}\p{N}_]+/gu;

export const SPECIAL_CHARACTERS = ' \n!@$%^&*(),.?/{}[];\':"`~<>，。？（）【】、《》';

export const HASHTAG_COLORS = {
  primary: '#0079FF',
  hover: '#005bb5',
} as const;

export const UI_TEXT = {
  HASHTAG_BUTTON: '# Topic',
  CREATE_NOTE: 'Create Note',
  NOTE_CONTENT: 'Note Content',
  EXTRACTED_TAGS: 'Extracted Tags:',
  NO_TAGS_FOUND: 'No tags found',
  NO_MATCHING_TOPICS: 'No matching topics',
  PEOPLE_USING: 'people using',
  PLACEHOLDER_TEXT: 'Enter your text here...',
} as const;

export const TEXTAREA_CONFIG = {
  MIN_HEIGHT: '7rem', // 28 * 0.25rem = 7rem (min-h-28)
  RESIZE_DELAY: 0,
} as const;