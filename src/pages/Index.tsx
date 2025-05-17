
import { useMovies } from "@/context/MovieContext";
import FeaturedMovie from "@/components/FeaturedMovie";
import MovieGrid from "@/components/MovieGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const { featuredMovie, trendingMovies, newReleases, movies } = useMovies();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Featured Movie */}
        <FeaturedMovie movie={featuredMovie} />
        
        {/* Movie Sections */}
        <div className="container mx-auto px-4">
          {/* Trending Movies */}
          <MovieGrid title="Trending Now" movies={trendingMovies} />
          
          {/* New Releases */}
          <MovieGrid title="New Releases" movies={newReleases} />
          
          {/* Popular Movies */}
          <MovieGrid title="Popular on MovieFlix" movies={movies.slice(0, 6)} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
