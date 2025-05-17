
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/Search";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-movie-darker sticky top-0 z-40 w-full border-b border-movie-dark/10">
      <nav className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-movie-red">MovieFlix</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-movie-red ${isActive("/") ? "text-movie-red" : "text-gray-300"}`}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className={`text-sm font-medium transition-colors hover:text-movie-red ${isActive("/movies") ? "text-movie-red" : "text-gray-300"}`}
            >
              Movies
            </Link>
            <Link 
              to="/tv" 
              className={`text-sm font-medium transition-colors hover:text-movie-red ${isActive("/tv") ? "text-movie-red" : "text-gray-300"}`}
            >
              TV Shows
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Search />
          </div>

          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-movie-darker py-4 border-b border-movie-dark/10">
          <div className="container space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-lg font-medium hover:text-movie-red"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className="block py-2 text-lg font-medium hover:text-movie-red"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link 
              to="/tv" 
              className="block py-2 text-lg font-medium hover:text-movie-red"
              onClick={() => setIsMenuOpen(false)}
            >
              TV Shows
            </Link>
            <div className="py-2">
              <Search />
            </div>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Sign In</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
