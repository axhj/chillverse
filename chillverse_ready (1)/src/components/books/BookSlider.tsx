import React, { useRef } from 'react';
import { Book } from '../../services/api';
import BookCard from './BookCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookSliderProps {
  books: Book[];
  title: string;
  variant?: 'small' | 'medium' | 'large';
}

const BookSlider: React.FC<BookSliderProps> = ({ books, title, variant = 'medium' }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const { scrollLeft, clientWidth } = sliderRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth * 0.75 
      : scrollLeft + clientWidth * 0.75;
    
    sliderRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div className="relative mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 transition-colors"
            aria-label="Previous books"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 transition-colors"
            aria-label="Next books"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div 
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {books.map(book => (
          <div 
            key={book.id} 
            className={`flex-none ${
              variant === 'small' ? 'w-48' : 
              variant === 'large' ? 'w-full sm:w-3/4 md:w-2/3 lg:w-1/2' : 
              'w-64 sm:w-72'
            }`}
          >
            <BookCard book={book} variant={variant} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSlider;