import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! It seems the magical page you're looking for has vanished into thin air. 
          Let's get you back on track to your reading adventure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
          >
            <Home className="h-5 w-5" />
            Return Home
          </Link>
          <Link 
            to="/explore" 
            className="inline-flex items-center justify-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-colors"
          >
            <BookOpen className="h-5 w-5" />
            Explore Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;