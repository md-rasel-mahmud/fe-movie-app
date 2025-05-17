
import { Button } from "@/components/ui/button";
import { Movie } from "@/lib/data";
import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";

interface FeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie = ({ movie }: FeaturedMovieProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Backdrop image with gradient overlay */}
      <div className="relative w-full aspect-[21/9]">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-movie-black/90 via-movie-black/60 to-transparent" />
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-8 space-y-4 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold animate-fade-in">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="text-movie-red font-medium">{movie.releaseYear}</span>
            <span className="px-2 py-0.5 bg-movie-red/80 text-white text-sm rounded">
              {movie.rating.toFixed(1)}
            </span>
            <span className="hidden md:inline">{movie.duration}</span>
          </div>
          
          <p className="text-gray-300 max-w-2xl line-clamp-3 md:line-clamp-none animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {movie.overview}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button className="gap-2" size="lg">
              <Play className="h-4 w-4" /> Play
            </Button>
            <Link to={`/movie/${movie.id}`}>
              <Button variant="outline" className="gap-2" size="lg">
                <Info className="h-4 w-4" /> More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
