import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  placeholder?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = 'Search for books...', 
  variant = 'light',
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const getBgColor = () => {
    if (variant === 'dark') {
      return isFocused ? 'bg-indigo-800' : 'bg-indigo-900/50';
    }
    return isFocused ? 'bg-white' : 'bg-indigo-50';
  };

  const getTextColor = () => {
    return variant === 'dark' ? 'text-white' : 'text-indigo-900';
  };

  const getPlaceholderColor = () => {
    return variant === 'dark' ? 'placeholder-indigo-300' : 'placeholder-indigo-400';
  };

  const getIconColor = () => {
    return variant === 'dark' ? 'text-indigo-300' : 'text-indigo-500';
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`flex items-center ${getBgColor()} ${getTextColor()} rounded-full overflow-hidden transition-all duration-200 shadow-sm ${
        isFocused ? 'shadow-md ring-2 ring-purple-300' : ''
      } ${className}`}
    >
      <span className={`pl-4 ${getIconColor()}`}>
        <Search className="h-5 w-5" />
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full py-3 px-3 bg-transparent outline-none ${getPlaceholderColor()}`}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          className={`pr-2 ${getIconColor()} hover:text-indigo-700 transition-colors`}
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <button
        type="submit"
        className={`py-3 px-5 ${
          variant === 'dark' 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        } transition-colors`}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;