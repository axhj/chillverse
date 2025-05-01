import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Star, Bookmark, ChevronRight } from 'lucide-react';
import { 
  getFeaturedBooks, 
  getTrendingBooks,
  getBooks,
  Book
} from '../services/api';
import BookSlider from '../components/books/BookSlider';
import SearchBar from '../components/ui/SearchBar';
import AudioPlayer from '../components/audio/AudioPlayer';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const HomePage: React.FC = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [newReleases, setNewReleases] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentBook } = useAudioPlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [featured, trending, allBooks] = await Promise.all([
          getFeaturedBooks(),
          getTrendingBooks(),
          getBooks('all', 20)
        ]);

        setFeaturedBooks(featured);
        setTrendingBooks(trending);
        
        // Sort by release date for new releases
        const sorted = [...allBooks].sort((a, b) => 
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
        setNewReleases(sorted.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/70"></div>
          <img 
            src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg" 
            alt="Fantasy landscape" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <div className="max-w-2xl">
            <span className="inline-block bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 animate-pulse">
              Welcome to a world of imagination
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover magical worlds through audiobooks
            </h1>
            <p className="text-lg text-indigo-100 mb-8">
              Stream fantasy audiobooks, level up your magical avatar, and embark on adventures from anywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                to="/explore" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <BookOpen className="h-5 w-5" />
                Explore Books
              </Link>
              <Link 
                to="/register" 
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
              >
                Create Account
              </Link>
            </div>

            {/* Search Bar */}
            <div className="w-full">
              <SearchBar variant="dark" placeholder="Search for fantasy adventures..." />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white animate-bounce">
          <span className="text-sm mb-2">Scroll to discover</span>
          <ChevronRight className="h-6 w-6 transform rotate-90" />
        </div>
      </section>

      {/* Main Content */}
      <main className={`container mx-auto px-4 py-12 ${currentBook ? 'pb-24' : ''}`}>
        {/* Features Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-100 flex flex-col items-center text-center transition-transform hover:transform hover:-translate-y-1">
              <div className="bg-indigo-100 p-3 rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-indigo-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vast Collection</h3>
              <p className="text-gray-600">Explore thousands of fantasy audiobooks from classic tales to modern epics.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-100 flex flex-col items-center text-center transition-transform hover:transform hover:-translate-y-1">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <TrendingUp className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Level Up</h3>
              <p className="text-gray-600">Earn XP for every minute listened and watch your avatar grow stronger.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-100 flex flex-col items-center text-center transition-transform hover:transform hover:-translate-y-1">
              <div className="bg-indigo-100 p-3 rounded-full mb-4">
                <Bookmark className="h-6 w-6 text-indigo-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Save Progress</h3>
              <p className="text-gray-600">Never lose your place with automatic bookmarks and progress tracking.</p>
            </div>
          </div>
        </section>

        {/* Featured Books */}
        {isLoading ? (
          <div className="py-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-4 text-indigo-800">Loading magical content...</p>
          </div>
        ) : (
          <>
            {featuredBooks.length > 0 && (
              <section className="mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-2 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Featured Audiobook</h2>
                    <p className="text-gray-600 mb-6">
                      Immerse yourself in our carefully selected featured title, chosen for its captivating storytelling and mesmerizing narration.
                    </p>
                    <Link 
                      to="/explore" 
                      className="text-indigo-700 hover:text-indigo-800 font-medium flex items-center gap-1 group"
                    >
                      View all featured books
                      <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  
                  <div className="lg:col-span-3">
                    {featuredBooks[0] && (
                      <BookSlider 
                        books={featuredBooks} 
                        title="" 
                        variant="large" 
                      />
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Trending Books */}
            {trendingBooks.length > 0 && (
              <section className="mb-16">
                <BookSlider 
                  books={trendingBooks} 
                  title="Trending This Week" 
                />
              </section>
            )}

            {/* New Releases */}
            {newReleases.length > 0 && (
              <section className="mb-16">
                <BookSlider 
                  books={newReleases} 
                  title="New Releases" 
                />
              </section>
            )}

            {/* Genre Categories */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Explore by Genre</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['Fantasy', 'Science Fiction', 'Mystery', 'Adventure', 'Horror', 'Historical'].map(genre => (
                  <Link 
                    key={genre}
                    to={`/explore?genre=${encodeURIComponent(genre)}`}
                    className="bg-white border border-indigo-100 rounded-lg p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all hover:bg-indigo-50"
                  >
                    <div className="bg-indigo-100 p-3 rounded-full mb-3">
                      <Star className="h-5 w-5 text-indigo-700" />
                    </div>
                    <h3 className="font-medium">{genre}</h3>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="rounded-xl bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Adventure Today</h2>
                  <p className="text-indigo-100 mb-6 max-w-xl">
                    Create your account now and begin your journey through magical worlds. Customize your avatar, track your listening progress, and join our community of book lovers.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      to="/register" 
                      className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-full font-medium transition-colors"
                    >
                      Sign Up Free
                    </Link>
                    <Link 
                      to="/explore" 
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                    >
                      Browse Books
                    </Link>
                  </div>
                </div>
                <div className="w-48 h-48 relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  <img 
                    src="https://images.pexels.com/photos/3712396/pexels-photo-3712396.jpeg" 
                    alt="Magical world" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Audio Player */}
      {currentBook && <AudioPlayer />}
    </>
  );
};

export default HomePage;