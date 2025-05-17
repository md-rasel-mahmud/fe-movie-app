import { useState, useEffect } from "react";
import { useMovies } from "@/context/MovieContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

const Movies = () => {
  const location = useLocation();
  const { movies, search } = useMovies();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  // Extract unique genres from all movies
  const allGenres = ["All", ...new Set(movies.flatMap(movie => movie.genres))];

  // Handle search parameter from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get("search");
    
    if (queryParam) {
      setSearchQuery(queryParam);
      const results = search(queryParam);
      setFilteredMovies(results);
    }
  }, [location.search, search]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      // If no search query, show all movies (filtered by genre if applicable)
      filterMoviesByGenre(selectedGenre);
    } else {
      // Otherwise search within the current genre filter
      const searchResults = search(query);
      if (selectedGenre === "All") {
        setFilteredMovies(searchResults);
      } else {
        setFilteredMovies(
          searchResults.filter(movie => movie.genres.includes(selectedGenre))
        );
      }
    }
  };

  // Handle genre filter change
  const filterMoviesByGenre = (genre: string) => {
    setSelectedGenre(genre);
    
    if (genre === "All") {
      // If searching, apply search filter
      if (searchQuery.trim() !== "") {
        setFilteredMovies(search(searchQuery));
      } else {
        setFilteredMovies(movies);
      }
    } else {
      // Filter by genre, and if searching, apply search filter too
      const genreFiltered = movies.filter(movie => 
        movie.genres.includes(genre)
      );
      
      if (searchQuery.trim() !== "") {
        setFilteredMovies(
          genreFiltered.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredMovies(genreFiltered);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Movies</h1>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Input
                type="search"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-secondary/50 pr-10"
              />
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            
            {/* Genre filters */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2">
                {allGenres.map(genre => (
                  <Button
                    key={genre}
                    variant={genre === selectedGenre ? "default" : "outline"}
                    size="sm"
                    onClick={() => filterMoviesByGenre(genre)}
                    className="whitespace-nowrap"
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Results summary */}
          <div className="mb-6">
            {searchQuery && (
              <p className="text-gray-400">
                {filteredMovies.length} results for "{searchQuery}"
                {selectedGenre !== "All" && ` in ${selectedGenre}`}
              </p>
            )}
          </div>
          
          {/* Movie Grid */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold">No movies found</h3>
              <p className="text-gray-400 mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Movies;
