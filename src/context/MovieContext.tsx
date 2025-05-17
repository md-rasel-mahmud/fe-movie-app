
import { createContext, useContext, ReactNode, useState } from "react";
import { 
  Movie, 
  movies as initialMovies,
  getFeaturedMovie,
  getTrendingMovies,
  getNewReleases,
  getMovieById,
  searchMovies
} from "@/lib/data";

interface MovieContextType {
  movies: Movie[];
  featuredMovie: Movie;
  trendingMovies: Movie[];
  newReleases: Movie[];
  getMovie: (id: number) => Movie | undefined;
  search: (query: string) => Movie[];
  addMovie: (movie: Omit<Movie, "id">) => void;
  updateMovie: (id: number, movie: Partial<Movie>) => void;
  deleteMovie: (id: number) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const featuredMovie = getFeaturedMovie();
  const trendingMovies = getTrendingMovies();
  const newReleases = getNewReleases();

  const getMovie = (id: number) => getMovieById(id);

  const search = (query: string) => searchMovies(query);

  const addMovie = (movie: Omit<Movie, "id">) => {
    const newId = Math.max(...movies.map(m => m.id)) + 1;
    const newMovie = { ...movie, id: newId };
    setMovies([...movies, newMovie]);
  };

  const updateMovie = (id: number, updatedFields: Partial<Movie>) => {
    setMovies(
      movies.map(movie => 
        movie.id === id ? { ...movie, ...updatedFields } : movie
      )
    );
  };

  const deleteMovie = (id: number) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        featuredMovie,
        trendingMovies,
        newReleases,
        getMovie,
        search,
        addMovie,
        updateMovie,
        deleteMovie
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};
