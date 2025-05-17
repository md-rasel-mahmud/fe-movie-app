
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovies } from "@/context/MovieContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ArrowLeft, Star } from "lucide-react";
import MovieGrid from "@/components/MovieGrid";
import { Movie } from "@/lib/data";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovie, movies } = useMovies();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    if (id) {
      const fetchedMovie = getMovie(parseInt(id, 10));
      if (fetchedMovie) {
        setMovie(fetchedMovie);
        
        // Find related movies by genre (excluding current movie)
        const related = movies
          .filter(m => 
            m.id !== fetchedMovie.id && 
            m.genres.some(g => fetchedMovie.genres.includes(g))
          )
          .slice(0, 6);
          
        setRelatedMovies(related);
      } else {
        // Movie not found, navigate to 404
        navigate("/not-found");
      }
    }
  }, [id, getMovie, movies, navigate]);
  
  if (!movie) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Movie Hero Section */}
        <div className="relative w-full aspect-[21/9]">
          <img 
            src={movie.backdropUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-movie-black via-movie-black/60 to-transparent" />
          
          {/* Back button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-4 left-4 bg-black/30 hover:bg-black/50 text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          {/* Play trailer button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Button 
              size="lg" 
              className="rounded-full w-16 h-16 flex items-center justify-center"
              onClick={() => window.open(movie.trailerUrl, "_blank")}
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="bg-movie-darker p-6 rounded-lg shadow-lg border border-movie-dark">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Movie Poster */}
              <div className="w-full md:w-1/4">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="w-full rounded-md shadow-md aspect-[2/3] object-cover"
                />
              </div>
              
              {/* Movie Details */}
              <div className="w-full md:w-3/4">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
                
                <div className="flex items-center flex-wrap gap-3 mb-4">
                  <span className="text-movie-red">{movie.releaseYear}</span>
                  <span className="text-gray-400">•</span>
                  <span>{movie.duration}</span>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
                    <span>{movie.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="border-movie-red/50 text-gray-300">
                      {genre}
                    </Badge>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-medium mb-2">Overview</h2>
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    className="gap-2"
                    onClick={() => window.open(movie.trailerUrl, "_blank")}
                  >
                    <Play className="h-4 w-4" /> Watch Trailer
                  </Button>
                  <Button variant="outline">Add to Watchlist</Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Movies Section */}
          {relatedMovies.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {relatedMovies.map(movie => (
                  <div key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title} 
                      className="w-full rounded-md shadow-md aspect-[2/3] object-cover movie-card"
                    />
                    <h3 className="mt-2 font-medium movie-title-truncate">{movie.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MovieDetail;
