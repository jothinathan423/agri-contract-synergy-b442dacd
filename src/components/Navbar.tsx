
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Detect if user is logged in (in a real app, this would check auth state)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openAuthModal = (type: 'login' | 'register') => {
    setAuthType(type);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  // Mock login/logout for demo purposes
  const handleLogin = () => {
    setIsLoggedIn(true);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled || !isHomePage ? 'bg-background/80 backdrop-blur-lg border-b' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                  AgriConnect
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/about' ? 'text-primary' : 'text-foreground'
                }`}
              >
                About
              </Link>
              <Link 
                to="/features" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/features' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Features
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/contact' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Contact
              </Link>
              
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">Dashboard</Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={() => openAuthModal('login')}>
                    Login
                  </Button>
                  <Button size="sm" onClick={() => openAuthModal('register')}>
                    Register
                  </Button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden rounded-md p-2 text-foreground hover:bg-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-background border-b"
            >
              <div className="space-y-1 px-4 py-4">
                <Link 
                  to="/" 
                  className="block py-2 text-base font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="block py-2 text-base font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/features" 
                  className="block py-2 text-base font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  to="/contact" 
                  className="block py-2 text-base font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                {isLoggedIn ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="block py-2 text-base font-medium hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      className="block w-full text-left py-2 text-base font-medium hover:text-primary"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="block w-full text-left py-2 text-base font-medium hover:text-primary"
                      onClick={() => openAuthModal('login')}
                    >
                      Login
                    </button>
                    <button 
                      className="block w-full text-left py-2 text-base font-medium hover:text-primary"
                      onClick={() => openAuthModal('register')}
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        type={authType}
        setType={setAuthType}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navbar;
