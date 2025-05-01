import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
  level?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'User avatar', 
  size = 'medium',
  level,
  className = ''
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 'h-8 w-8';
      case 'medium': return 'h-12 w-12';
      case 'large': return 'h-16 w-16';
      case 'xl': return 'h-24 w-24 sm:h-32 sm:w-32';
      default: return 'h-12 w-12';
    }
  };

  // Fallback avatar if no src provided
  const fallbackAvatar = (
    <div className={`${getSize()} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium ${className}`}>
      {alt.charAt(0).toUpperCase()}
    </div>
  );

  // If no src provided, return fallback
  if (!src) {
    return fallbackAvatar;
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`${getSize()} rounded-full overflow-hidden border-2 border-purple-200 shadow-md`}>
        <img 
          src={customSrc ?? src} 
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // If image fails to load, replace with fallback
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      
      {/* Level Badge */}
      {level !== undefined && (
        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-md border border-amber-200">
          {level}
        </div>
      )}
    </div>
  );
};

export default Avatar;