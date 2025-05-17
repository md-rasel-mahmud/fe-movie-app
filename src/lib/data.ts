
export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  releaseYear: number;
  genres: string[];
  duration: string;
  rating: number;
  trailerUrl: string;
  isNew?: boolean;
  isTrending?: boolean;
}

export const generateMovieData = (): Movie[] => {
  return [
    {
      id: 1,
      title: "Dune: Part Two",
      overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
      posterUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=2064&auto=format&fit=crop",
      releaseYear: 2024,
      genres: ["Sci-Fi", "Adventure", "Drama"],
      duration: "2h 46m",
      rating: 8.6,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      isNew: true,
      isTrending: true
    },
    {
      id: 2,
      title: "Oppenheimer",
      overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
      releaseYear: 2023,
      genres: ["Biography", "Drama", "History"],
      duration: "3h 0m",
      rating: 8.5,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      isTrending: true
    },
    {
      id: 3,
      title: "Poor Things",
      overview: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.",
      posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1887&auto=format&fit=crop",
      releaseYear: 2023,
      genres: ["Romance", "Sci-Fi", "Comedy"],
      duration: "2h 21m",
      rating: 8.4,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      isTrending: true
    },
    {
      id: 4,
      title: "The Batman",
      overview: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
      posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=2070&auto=format&fit=crop",
      releaseYear: 2022,
      genres: ["Action", "Crime", "Drama"],
      duration: "2h 56m",
      rating: 7.8,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 5,
      title: "Everything Everywhere All at Once",
      overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
      posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1887&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
      releaseYear: 2022,
      genres: ["Action", "Adventure", "Comedy"],
      duration: "2h 19m",
      rating: 8.0,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 6,
      title: "Killers of the Flower Moon",
      overview: "When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one—until the FBI steps in to unravel the mystery.",
      posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1501877008226-4fca48ee50c1?q=80&w=1935&auto=format&fit=crop",
      releaseYear: 2023,
      genres: ["Crime", "Drama", "Western"],
      duration: "3h 26m",
      rating: 7.7,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      isNew: true
    },
    {
      id: 7,
      title: "Barbie",
      overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
      posterUrl: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=2070&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2070&auto=format&fit=crop",
      releaseYear: 2023,
      genres: ["Adventure", "Comedy", "Fantasy"],
      duration: "1h 54m",
      rating: 7.0,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 8,
      title: "Spider-Man: Across the Spider-Verse",
      overview: "Miles Morales returns for the next chapter of the Oscar-winning Spider-Verse saga, an epic adventure that will transport Brooklyn's full-time, friendly neighborhood Spider-Man across the Multiverse to join forces with Gwen Stacy and a new team of Spider-People to face off with a villain more powerful than anything they have ever encountered.",
      posterUrl: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?q=80&w=1887&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1599519667523-ffe0bee58802?q=80&w=1887&auto=format&fit=crop",
      releaseYear: 2023,
      genres: ["Animation", "Action", "Adventure"],
      duration: "2h 20m",
      rating: 8.7,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      isTrending: true
    },
    {
      id: 9,
      title: "Inception",
      overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
      posterUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1887&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1503642551022-c011aafb3c88?q=80&w=2070&auto=format&fit=crop",
      releaseYear: 2010,
      genres: ["Action", "Sci-Fi", "Thriller"],
      duration: "2h 28m",
      rating: 8.8,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 10,
      title: "The Shawshank Redemption",
      overview: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
      posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=2055&auto=format&fit=crop",
      releaseYear: 1994,
      genres: ["Drama"],
      duration: "2h 22m",
      rating: 9.3,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 11,
      title: "The Dark Knight",
      overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=2000&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1559583109-3e7968136c99?q=80&w=1936&auto=format&fit=crop",
      releaseYear: 2008,
      genres: ["Action", "Crime", "Drama"],
      duration: "2h 32m",
      rating: 9.0,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 12,
      title: "Parasite",
      overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      posterUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1887&auto=format&fit=crop",
      releaseYear: 2019,
      genres: ["Drama", "Thriller"],
      duration: "2h 12m",
      rating: 8.6,
      trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ];
};

export const movies = generateMovieData();

export const getFeaturedMovie = (): Movie => {
  return movies.find(movie => movie.id === 1) || movies[0];
};

export const getTrendingMovies = (): Movie[] => {
  return movies.filter(movie => movie.isTrending);
};

export const getNewReleases = (): Movie[] => {
  return movies.filter(movie => movie.isNew);
};

export const getMovieById = (id: number): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

export const searchMovies = (query: string): Movie[] => {
  const searchTerm = query.toLowerCase();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm) ||
    movie.overview.toLowerCase().includes(searchTerm) ||
    movie.genres.some(genre => genre.toLowerCase().includes(searchTerm))
  );
};
