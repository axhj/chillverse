import React from 'react';
import { Link } from 'react-router-dom';
import { Book as BookType } from '../../services/api';
import { Play, Clock, Star } from 'lucide-react';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';

interface BookCardProps {
  book: BookType;
  variant?: 'small' | 'medium' | 'large';
}

const BookCard: React.FC<BookCardProps> = ({ book, variant = 'medium' }) => {
  const { playBook } = useAudioPlayer();

  // Format duration (seconds) to hours and minutes
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 
      ? `${hours}h ${minutes}m` 
      : `${minutes} min`;
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    playBook({
      id: book.id,
      title: book.title,
      author: book.author.name,
      coverUrl: book.coverUrl,
      audioUrl: book.audioUrl
    });
  };

  if (variant === 'small') {
    return (
      <Link 
        to={`/book/${book.id}`} 
        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 transition-all"
      >
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-16 h-16 object-cover rounded-md shadow-md"
        />
        <div className="flex-grow">
          <h3 className="font-medium text-sm group-hover:text-indigo-700 transition-colors line-clamp-1">{book.title}</h3>
          <p className="text-xs text-gray-600">{book.author.name}</p>
        </div>
        <button 
          onClick={handlePlay}
          className="p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all transform hover:scale-105"
        >
          <Play className="h-4 w-4" />
        </button>
      </Link>
    );
  }

  if (variant === 'large') {
    return (
      <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-indigo-900/70 to-transparent opacity-80 transition-opacity"></div>
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-2 flex gap-2">
            {book.genre.slice(0, 2).map(genre => (
              <span key={genre} className="text-xs bg-purple-500/80 px-2 py-1 rounded-full">{genre}</span>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
          <p className="text-indigo-200 mb-3">{book.author.name}</p>
          <p className="line-clamp-2 text-sm text-indigo-100 mb-4">{book.description}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-indigo-200 text-sm">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(book.duration)}</span>
            </div>
            <div className="flex items-center gap-1 text-indigo-200 text-sm">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>{book.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Link 
              to={`/book/${book.id}`}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors"
            >
              Details
            </Link>
            <button 
              onClick={handlePlay}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
            >
              <Play className="h-4 w-4" />
              Play
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default (medium) card
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button 
          onClick={handlePlay}
          className="absolute bottom-3 right-3 p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform hover:scale-105"
          aria-label={`Play ${book.title}`}
        >
          <Play className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          {book.genre.slice(0, 2).map(genre => (
            <span key={genre} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">{genre}</span>
          ))}
        </div>
        <Link to={`/book/${book.id}`}>
          <h3 className="font-semibold mb-1 group-hover:text-indigo-700 transition-colors line-clamp-1">{book.title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{book.author.name}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDuration(book.duration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-500" />
            <span>{book.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;