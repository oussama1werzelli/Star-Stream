
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, User, Film, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import SearchModal from './SearchModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <nav className="bg-black/90 border-b border-gray-800 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center">
                  <span className="text-white text-xl font-bold mr-1">Star</span>
                  <span className="text-blue-500 text-xl font-bold">Stream</span>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <Home className="inline-block h-4 w-4 ml-1" />
                  الرئيسية
                </Link>
                <Link to="/movies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <Film className="inline-block h-4 w-4 ml-1" />
                  أفلام
                </Link>
                <Link to="/series" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  أقسام
                </Link>
                <Link to="/news" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  أخبار
                </Link>
                <Link to="/watchlist" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  قائمة المشاهدة
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-2 text-gray-300 hover:text-white"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-300 hover:text-white"
                  onClick={handleProfileClick}
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                الرئيسية
              </Link>
              <Link to="/movies" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                أفلام
              </Link>
              <Link to="/series" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                مسلسلات
              </Link>
              <Link to="/news" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                أخبار
              </Link>
              <Link to="/watchlist" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                قائمة المشاهدة
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
