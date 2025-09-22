import { RefObject } from 'react';

// Common React types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Ref types for textarea components
export interface TextareaRefs {
  textareaRef: RefObject<HTMLTextAreaElement>;
  displayRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
}

// Event handler types
export interface TextareaEventHandlers {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSelect: (event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

// Configuration types
export interface TextareaConfig {
  maxLength: number;
  placeholder: string;
  minHeight: string;
  autoResize: boolean;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  $values: T[];
  totalCount?: number;
  pageSize?: number;
  currentPage?: number;
}