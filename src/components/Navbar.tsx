import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  LogOut,
  Bell,
  Settings,
  FileText,
  Home,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Simulate checking if user is logged in based on route
  useEffect(() => {
    if (location.pathname.includes('/dashboard') || 
        location.pathname.includes('/contracts') || 
        location.pathname.includes('/profile')) {
      setIsLoggedIn(true);
    } else {
      // For demo purposes, we'll keep the user logged in
      // In a real app, this would check auth state
      // setIsLoggedIn(false);
    }
  }, [location.pathname]);
  
  // Change navbar style on scroll
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
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogin = () => {
    navigate('/dashboard');
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };
  
  const navLinks = [
    { 
      name: 'Home', 
      path: '/',
      icon: <Home className="h-4 w-4 mr-2" />
    },
    { 
      name: 'Dashboard', 
      path: '/dashboard',
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      requiresAuth: true
    },
    { 
      name: 'Contracts', 
      path: '/contracts',
      icon: <FileText className="h-4 w-4 mr-2" />,
      requiresAuth: true
    },
    { 
      name: 'Profile', 
      path: '/profile',
      icon: <User className="h-4 w-4 mr-2" />,
      requiresAuth: true
    },
  ];
  
  const filteredNavLinks = isLoggedIn 
    ? navLinks 
    : navLinks.filter(link => !link.requiresAuth);
  
  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-full p-1.5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-white"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">AgriConnect</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {filteredNavLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path 
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Auth buttons or user menu */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                        3
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-80 overflow-y-auto">
                      {[1, 2, 3].map((i) => (
                        <DropdownMenuItem key={i} className="cursor-pointer py-3">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 h-6 w-6 flex items-center justify-center p-0 rounded-full">
                                <Bell className="h-3 w-3" />
                              </Badge>
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium leading-none">
                                New contract offer received
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Fresh Foods Ltd. has sent you a new contract for Organic Tomatoes.
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {i * 2} hour{i * 2 !== 1 ? 's' : ''} ago
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer justify-center text-primary">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:inline-block font-medium">John Doe</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate('/profile')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>My Contracts</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="hidden sm:inline-flex"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  onClick={handleLogin}
                >
                  Get Started
                </Button>
              </>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {filteredNavLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className={`flex items-center py-2 text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === link.path 
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                
                {!isLoggedIn && (
                  <Button 
                    variant="outline" 
                    className="w-full sm:hidden"
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
