import React from 'react';
import { HashtagHighlighterProps } from '@/types/hashtag';
import { parseTextToHighlightHashtags, renderContentWithLineBreaks } from '@/utils/hashtagParser';

/**
 * Component for displaying text with highlighted hashtags
 */
export const HashtagHighlighter: React.FC<HashtagHighlighterProps> = ({
  content,
  className = '',
}) => {
  const parsedContent = parseTextToHighlightHashtags(content);
  const renderedContent = renderContentWithLineBreaks(parsedContent);

  return (
    <>
      {renderedContent}
    </>
  );
};