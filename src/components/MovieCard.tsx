
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Movie } from "@/lib/data";

interface MovieCardProps {
  movie: Movie;
  featured?: boolean;
}

const MovieCard = ({ movie, featured = false }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block group">
      <div className={`movie-card ${featured ? "aspect-[16/9]" : "aspect-[2/3]"}`}>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="movie-card-overlay flex flex-col justify-end p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white movie-title-truncate">
              {movie.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.slice(0, 2).map((genre) => (
                <Badge key={genre} variant="outline" className="text-xs bg-black/50 text-gray-200 border-none">
                  {genre}
                </Badge>
              ))}
              <Badge variant="outline" className="bg-movie-red/90 text-white border-none text-xs">
                {movie.rating.toFixed(1)}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
