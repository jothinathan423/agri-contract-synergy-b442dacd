
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useMobile from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useMobile();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate("/");
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      to={href}
      className={cn(
        "relative px-3 py-2 transition-colors hover:text-primary",
        location.pathname === href
          ? "text-primary font-medium"
          : "text-muted-foreground"
      )}
      onClick={closeMenu}
    >
      {label}
      {location.pathname === href && (
        <motion.div
          className="absolute -bottom-[1px] left-0 h-[2px] bg-primary rounded-full w-full"
          layoutId="navbar-indicator"
        />
      )}
    </Link>
  );

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-200",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">ContractFarm</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" label="Home" />
            {isLoggedIn ? (
              <>
                <NavLink href="/dashboard" label="Dashboard" />
                <NavLink href="/contracts" label="Contracts" />
                <NavLink href="/profile" label="Profile" />
                <Button 
                  variant="outline" 
                  className="ml-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink href="/about" label="About" />
                <NavLink href="/features" label="Features" />
                <NavLink href="/pricing" label="Pricing" />
                <div className="ml-4 flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Menu"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white border-b"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link
              to="/"
              className="px-3 py-2 hover:bg-muted rounded-md"
              onClick={closeMenu}
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/contracts"
                  className="px-3 py-2 hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  Contracts
                </Link>
                <Link
                  to="/profile"
                  className="px-3 py-2 hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  className="px-3 py-2 hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  About
                </Link>
                <Link
                  to="/features"
                  className="px-3 py-2 hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className="px-3 py-2 hover:bg-muted rounded-md"
                  onClick={closeMenu}
                >
                  Pricing
                </Link>
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register" onClick={closeMenu}>
                    <Button className="w-full">Register</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
