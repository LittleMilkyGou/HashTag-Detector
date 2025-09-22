import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <header className={`mb-6 ${className}`}>
      <h1 className="text-2xl sm:text-3xl font-bold text-grayPrimary mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-grayDark text-sm sm:text-base">
          {subtitle}
        </p>
      )}
    </header>
  );
};