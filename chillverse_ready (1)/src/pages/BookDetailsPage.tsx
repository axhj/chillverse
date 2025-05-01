import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Book Details</h1>
        <p className="text-gray-600">Loading book details for ID: {id}...</p>
      </div>
    </div>
  );
};

export default BookDetailsPage;