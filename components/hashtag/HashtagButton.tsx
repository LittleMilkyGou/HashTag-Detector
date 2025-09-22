import React from 'react';
import { Button } from '@/components/ui/Button';
import { UI_TEXT } from '@/utils/constants';

interface HashtagButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Button component for inserting hashtags
 */
export const HashtagButton: React.FC<HashtagButtonProps> = ({
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <Button
      variant="hashtag"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 text-xs font-medium ${className}`}
    >
      {UI_TEXT.HASHTAG_BUTTON}
    </Button>
  );
};