import { mock } from './mockData';

// Type definitions
export interface Author {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author: Author;
  description: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
  genre: string[];
  rating: number;
  releaseDate: string;
}

// API service functions - Using mock data for MVP
// Later, these will be replaced with actual API calls to LibriVox or other services

export const getBooks = async (
  category: string = 'all',
  limit: number = 10
): Promise<Book[]> => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      let books = [...mock.books];
      
      if (category !== 'all') {
        books = books.filter(book => book.genre.includes(category));
      }
      
      resolve(books.slice(0, limit));
    }, 500);
  });
};

export const getFeaturedBooks = async (): Promise<Book[]> => {
  // Simulate API call for featured books
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = mock.books.filter((_, index) => index % 5 === 0);
      resolve(featured.slice(0, 5));
    }, 300);
  });
};

export const getTrendingBooks = async (): Promise<Book[]> => {
  // Simulate API call for trending books
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by rating first, then by release date for books with same rating
      const trending = [...mock.books].sort((a, b) => {
        if (b.rating === a.rating) {
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        }
        return b.rating - a.rating;
      });
      // Return top 12 trending books
      resolve(trending.slice(0, 12));
    }, 300);
  });
};

export const getBookById = async (id: string): Promise<Book | null> => {
  // Simulate API call to get a book by ID
  return new Promise((resolve) => {
    setTimeout(() => {
      const book = mock.books.find(book => book.id === id) || null;
      resolve(book);
    }, 300);
  });
};

export const getBooksByGenre = async (genre: string): Promise<Book[]> => {
  // Simulate API call to get books by genre
  return new Promise((resolve) => {
    setTimeout(() => {
      const books = mock.books.filter(book => book.genre.includes(genre));
      resolve(books);
    }, 300);
  });
};

export const searchBooks = async (query: string): Promise<Book[]> => {
  // Simulate API call to search books
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mock.books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};

export const getGenres = async (): Promise<string[]> => {
  // Simulate API call to get all genres
  return new Promise((resolve) => {
    setTimeout(() => {
      const allGenres = mock.books.flatMap(book => book.genre);
      const uniqueGenres = [...new Set(allGenres)];
      resolve(uniqueGenres);
    }, 200);
  });
};