import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaLeaf, FaSeedling } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header({ lang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to switch language
  const switchLanguage = (newLang) => {
    navigate(`/${newLang}`, { replace: true });
  };

  const navLinks = [
    { name: lang === 'es' ? 'Inicio' : 'Home', href: '#' },
    { name: lang === 'es' ? 'Acerca de' : 'About', href: '#about' },
    { name: lang === 'es' ? 'Detalles' : 'Details', href: '#details' },
    { name: lang === 'es' ? 'Galería' : 'Gallery', href: '#gallery' },
    { name: lang === 'es' ? 'Videos' : 'Videos', href: '#videos' },
    { name: lang === 'es' ? 'Contacto' : 'Contact', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-lg' : 'bg-black bg-opacity-70'} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-200 to-green-300 rounded-full blur opacity-70"></div>
                <div className="relative">
                  <FaSeedling className="text-green-200 h-10 w-10" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-white font-bold text-base sm:text-xl tracking-wide truncate">Flor de Agarthi Corcovado</div>
                <div className="text-green-200 text-xs tracking-wider">
                  {lang === 'es' ? 'FINCA EN CORCOVADO' : 'ESTATE IN CORCOVADO'}
                </div>
              </div>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <div className="ml-4 pl-4 border-l border-gray-700 flex items-center">
              <button 
                onClick={() => switchLanguage('es')} 
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  lang === 'es' 
                    ? 'bg-gradient-to-r from-green-200 to-green-300 text-gray-800' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                ES
              </button>
              <button 
                onClick={() => switchLanguage('en')} 
                className={`ml-2 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  lang === 'en' 
                    ? 'bg-gradient-to-r from-green-200 to-green-300 text-gray-800' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white p-2"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 border-t border-gray-800 animate-fadeIn">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex space-x-2 px-3 py-4 border-t border-gray-800 mt-2">
              <button 
                onClick={() => {
                  switchLanguage('es');
                  setMenuOpen(false);
                }} 
                className={`flex-1 px-3 py-2 rounded-md text-base font-medium ${
                  lang === 'es' 
                    ? 'bg-gradient-to-r from-green-200 to-green-300 text-gray-800' 
                    : 'text-gray-300 hover:text-white border border-gray-700'
                }`}
              >
                Español
              </button>
              <button 
                onClick={() => {
                  switchLanguage('en');
                  setMenuOpen(false);
                }} 
                className={`flex-1 px-3 py-2 rounded-md text-base font-medium ${
                  lang === 'en' 
                    ? 'bg-gradient-to-r from-green-200 to-green-300 text-gray-800' 
                    : 'text-gray-300 hover:text-white border border-gray-700'
                }`}
              >
                English
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header; 