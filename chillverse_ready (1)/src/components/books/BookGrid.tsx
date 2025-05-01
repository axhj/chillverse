import React from 'react';
import { Book } from '../../services/api';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  title?: string;
  variant?: 'small' | 'medium' | 'large';
  columns?: number;
}

const BookGrid: React.FC<BookGridProps> = ({ 
  books, 
  title, 
  variant = 'medium',
  columns = 4
}) => {
  if (!books || books.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No books found</p>
      </div>
    );
  }

  const getGridClass = () => {
    if (variant === 'small') {
      return 'grid grid-cols-1 sm:grid-cols-2 gap-4';
    }
    
    if (variant === 'large') {
      return 'grid grid-cols-1 gap-6';
    }
    
    // Medium (default) cards
    const baseClass = 'grid gap-4 sm:gap-6';
    switch (columns) {
      case 2:
        return `${baseClass} grid-cols-1 sm:grid-cols-2`;
      case 3:
        return `${baseClass} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
      case 5:
        return `${baseClass} grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`;
      case 6:
        return `${baseClass} grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`;
      default:
        return `${baseClass} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
    }
  };

  return (
    <div className="mb-10">
      {title && (
        <h2 className="text-xl md:text-2xl font-bold mb-6">{title}</h2>
      )}
      <div className={getGridClass()}>
        {books.map(book => (
          <BookCard key={book.id} book={book} variant={variant} />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;