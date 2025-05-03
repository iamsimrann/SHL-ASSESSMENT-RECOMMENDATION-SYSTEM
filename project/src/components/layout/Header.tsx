import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flame, BookOpen, BarChart3, Users, Search } from 'lucide-react';
import Logo from '../ui/Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <Flame size={20} /> },
    { name: 'Find Assessments', path: '/questionnaire', icon: <Search size={20} /> },
    { name: 'Catalogue', path: '/catalogue', icon: <BookOpen size={20} /> },
    { name: 'Compare', path: '/compare', icon: <BarChart3 size={20} /> },
    { name: 'Contact', path: '/contact', icon: <Users size={20} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-3'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-bold text-primary-600">SHL Finder</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md flex items-center transition-colors duration-200 ${location.pathname === item.path 
                  ? 'bg-primary-100 text-primary-600 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg animate-slide-up overflow-hidden">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-3 flex items-center transition-colors duration-200 ${location.pathname === item.path 
                    ? 'bg-primary-50 text-primary-600 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;