import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Menu, X, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-indigo-900/95 backdrop-blur-sm shadow-lg text-white py-2' 
          : 'bg-transparent text-indigo-900 py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <BookOpen className={`h-8 w-8 ${isScrolled ? 'text-purple-300' : 'text-indigo-700'}`} />
          <span className={`font-serif transition-colors ${isScrolled ? 'text-white' : 'text-indigo-900'}`}>
            Chillverse
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`transition-all hover:text-purple-300 font-medium ${
              location.pathname === '/' ? 'text-purple-300' : isScrolled ? 'text-white' : 'text-indigo-800'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/explore" 
            className={`transition-all hover:text-purple-300 font-medium ${
              location.pathname === '/explore' ? 'text-purple-300' : isScrolled ? 'text-white' : 'text-indigo-800'
            }`}
          >
            Explore
          </Link>
          {isAuthenticated ? (
            <Link 
              to="/profile" 
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-all transform hover:scale-105"
            >
              <span className="font-medium">Profile</span>
              {user?.avatar ? (
                <img src={user.avatar} alt="User avatar" className="w-6 h-6 rounded-full" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 font-medium"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-indigo-900'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-indigo-900'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-900/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className={`py-2 px-4 rounded-md text-white hover:bg-indigo-800 ${
                location.pathname === '/' ? 'bg-indigo-800' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`py-2 px-4 rounded-md text-white hover:bg-indigo-800 ${
                location.pathname === '/explore' ? 'bg-indigo-800' : ''
              }`}
            >
              Explore
            </Link>
            {isAuthenticated ? (
              <Link 
                to="/profile" 
                className={`py-2 px-4 rounded-md text-white hover:bg-indigo-800 flex items-center gap-2 ${
                  location.pathname === '/profile' ? 'bg-indigo-800' : ''
                }`}
              >
                <span>Profile</span>
                {user?.avatar ? (
                  <img src={user.avatar} alt="User avatar" className="w-6 h-6 rounded-full" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-center"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;