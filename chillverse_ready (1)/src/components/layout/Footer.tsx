import React from 'react';
import { BookOpen, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-900 text-indigo-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-purple-300" />
              <span className="text-2xl font-bold font-serif text-white">Chillverse</span>
            </Link>
            <p className="text-sm text-indigo-200">
              Chillverse is a fantasy-themed audiobook streaming platform where stories come to life through immersive listening experiences and magical avatars.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-indigo-200 hover:text-purple-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-indigo-200 hover:text-purple-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-indigo-200 hover:text-purple-300 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-indigo-200 hover:text-purple-300 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-indigo-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-indigo-200 hover:text-white transition-colors">
                  Explore Books
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-indigo-200 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore?genre=Fantasy" className="text-indigo-200 hover:text-white transition-colors">
                  Fantasy
                </Link>
              </li>
              <li>
                <Link to="/explore?genre=Science%20Fiction" className="text-indigo-200 hover:text-white transition-colors">
                  Science Fiction
                </Link>
              </li>
              <li>
                <Link to="/explore?genre=Mystery" className="text-indigo-200 hover:text-white transition-colors">
                  Mystery
                </Link>
              </li>
              <li>
                <Link to="/explore?genre=Adventure" className="text-indigo-200 hover:text-white transition-colors">
                  Adventure
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-indigo-200 hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-indigo-800 text-center text-sm text-indigo-300">
          <p>&copy; {new Date().getFullYear()} Chillverse. All rights reserved.</p>
          <p className="mt-2">
            Books provided through the LibriVox API. Images from Pexels.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;