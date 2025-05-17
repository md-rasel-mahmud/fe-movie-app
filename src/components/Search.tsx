
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        type="search"
        placeholder="Search movies..."
        className="max-w-[200px] bg-secondary/50 border-secondary/70 pr-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button 
        type="submit" 
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};
