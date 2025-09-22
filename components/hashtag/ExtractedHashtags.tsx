import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ExtractedHashtagsProps } from '@/types/hashtag';
import { UI_TEXT } from '@/utils/constants';

/**
 * Component for displaying extracted hashtags
 */
export const ExtractedHashtags: React.FC<ExtractedHashtagsProps> = ({
  hashtags,
  title = UI_TEXT.EXTRACTED_TAGS,
  className = '',
}) => {
  return (
    <div className={`w-full mt-6 ${className}`}>
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          {title}
        </h3>
        {hashtags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {hashtags.map((hashtag, index) => (
              <Badge
                key={`${hashtag}-${index}`}
                variant="hashtag"
                size="sm"
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                #{hashtag}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">
            {UI_TEXT.NO_TAGS_FOUND}
          </p>
        )}
      </div>
    </div>
  );
};