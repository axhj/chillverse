import React from 'react';
import BookGrid from '../components/books/BookGrid';
import SearchBar from '../components/ui/SearchBar';

const ExplorePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center mb-6">Explore Audiobooks</h1>
        <SearchBar />
      </div>
      <BookGrid />
    </div>
  );
};

export default ExplorePage;