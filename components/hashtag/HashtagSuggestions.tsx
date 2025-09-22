import React from 'react';
import { HashtagSuggestionsProps } from '@/types/hashtag';
import { HashtagService } from '@/services/hashtagService';
import { UI_TEXT } from '@/utils/constants';

/**
 * Component for displaying hashtag suggestions dropdown
 */
export const HashtagSuggestions: React.FC<HashtagSuggestionsProps> = ({
  suggestions,
  isVisible,
  onSelect,
  onClose: _onClose,
}) => {
  if (!isVisible) {
    return null;
  }

  const handleSuggestionClick = (hashtag: string) => {
    onSelect(hashtag);
  };

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden max-h-60 backdrop-blur-sm">
        {suggestions.length > 0 ? (
          <div className="overflow-auto max-h-60">
            {suggestions.map((hashtag, index) => (
              <div
                key={`${hashtag.tagName}-${index}`}
                className="flex justify-between items-center p-4 text-sm border-b border-gray-50 cursor-pointer hover:bg-blue-50 transition-all duration-150 last:border-b-0 group"
                onClick={() => handleSuggestionClick(hashtag.tagName)}
              >
                <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                  {HashtagService.formatHashtagDisplay(hashtag)}
                </span>
                <span className="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                  {HashtagService.formatHashtagCount(hashtag.tagCount)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-sm text-gray-500 text-center">
            {UI_TEXT.NO_MATCHING_TOPICS}
          </div>
        )}
      </div>
    </div>
  );
};