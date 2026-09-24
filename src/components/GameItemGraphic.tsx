'use client';

import React, { useState } from 'react';
import { GameImage } from '../data/images';

interface GameItemGraphicProps {
  item: GameImage;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const GameItemGraphic: React.FC<GameItemGraphicProps> = ({
  item,
  size = 'md',
  className = '',
  onClick,
}) => {
  const [hasError, setHasError] = useState(false);

  const dimensionClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-36 h-36 sm:w-44 sm:h-44',
  };

  const emojiTextClasses = {
    sm: 'text-3xl',
    md: 'text-5xl sm:text-6xl',
    lg: 'text-6xl sm:text-7xl',
    xl: 'text-8xl sm:text-9xl',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center select-none ${className}`}
    >
      {!hasError ? (
        <img
          src={`/images/items/${item.id}.svg`}
          alt={item.name}
          width={160}
          height={160}
          loading="eager"
          decoding="async"
          draggable={false}
          onError={() => setHasError(true)}
          className={`${dimensionClasses[size]} object-contain drop-shadow-xs pointer-events-none transition-transform duration-200`}
        />
      ) : (
        <span
          role="img"
          aria-label={item.name}
          className={`${emojiTextClasses[size]} font-emoji leading-none`}
        >
          {item.emoji}
        </span>
      )}
    </div>
  );
};
