export interface Hashtag {
  tagName: string;
  tagCount: number;
}

// Common types
export interface CursorPosition {
  start: number;
  end: number;
}

export interface TextSelection {
  content: string;
  start: number;
  end: number;
}

export interface HashtagInputProps {
  content: string;
  onContentChange: (content: string) => void;
  onCursorPositionChange: (position: number) => void;
  maxLength?: number;
  placeholder?: string;
  className?: string;
}

export interface HashtagSuggestionsProps {
  suggestions: Hashtag[];
  isVisible: boolean;
  onSelect: (hashtag: string) => void;
  onClose: () => void;
}

export interface HashtagHighlighterProps {
  content: string;
  className?: string;
}

export interface ExtractedHashtagsProps {
  hashtags: string[];
  title?: string;
  className?: string;
}