
import { useState } from "react";
import { useMovies } from "@/context/MovieContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  Settings, 
  PlusCircle, 
  Edit,
  Trash2,
  Search
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Movie } from "@/lib/data";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

// Simple Movie Form Component
interface MovieFormProps {
  movie?: Movie;
  onSubmit: (data: Partial<Movie>) => void;
  onCancel: () => void;
}

const MovieForm = ({ movie, onSubmit, onCancel }: MovieFormProps) => {
  const isEditing = !!movie;
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    overview: movie?.overview || "",
    posterUrl: movie?.posterUrl || "",
    backdropUrl: movie?.backdropUrl || "",
    releaseYear: movie?.releaseYear || new Date().getFullYear(),
    genres: movie?.genres.join(", ") || "",
    duration: movie?.duration || "",
    rating: movie?.rating || 0,
    trailerUrl: movie?.trailerUrl || "",
    isNew: movie?.isNew || false,
    isTrending: movie?.isTrending || false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checkbox.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process genres from comma-separated string to array
    const processedData = {
      ...formData,
      genres: formData.genres.split(",").map(genre => genre.trim()),
      releaseYear: Number(formData.releaseYear),
      rating: Number(formData.rating)
    };
    
    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="releaseYear">Release Year</Label>
          <Input 
            id="releaseYear" 
            name="releaseYear" 
            type="number" 
            value={formData.releaseYear} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="overview">Overview</Label>
          <Textarea 
            id="overview" 
            name="overview" 
            value={formData.overview} 
            onChange={handleChange} 
            required 
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="posterUrl">Poster URL</Label>
          <Input 
            id="posterUrl" 
            name="posterUrl" 
            value={formData.posterUrl} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="backdropUrl">Backdrop URL</Label>
          <Input 
            id="backdropUrl" 
            name="backdropUrl" 
            value={formData.backdropUrl} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="genres">Genres (comma-separated)</Label>
          <Input 
            id="genres" 
            name="genres" 
            value={formData.genres} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input 
            id="duration" 
            name="duration" 
            value={formData.duration} 
            onChange={handleChange} 
            required 
            placeholder="e.g. 2h 30m"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input 
            id="rating" 
            name="rating" 
            type="number" 
            step="0.1" 
            min="0" 
            max="10" 
            value={formData.rating} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="trailerUrl">Trailer URL</Label>
          <Input 
            id="trailerUrl" 
            name="trailerUrl" 
            value={formData.trailerUrl} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="isNew" 
              name="isNew" 
              checked={formData.isNew}
              onChange={handleChange as any} 
            />
            <Label htmlFor="isNew">New Release</Label>
          </div>
          
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="isTrending" 
              name="isTrending" 
              checked={formData.isTrending}
              onChange={handleChange as any}
            />
            <Label htmlFor="isTrending">Trending</Label>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? "Update" : "Add"} Movie</Button>
      </DialogFooter>
    </form>
  );
};

// Admin Dashboard Component
const Admin = () => {
  const { movies, addMovie, updateMovie, deleteMovie } = useMovies();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isAddMovieDialogOpen, setIsAddMovieDialogOpen] = useState(false);
  const [isEditMovieDialogOpen, setIsEditMovieDialogOpen] = useState(false);
  
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddMovie = (movieData: Partial<Movie>) => {
    addMovie(movieData as Omit<Movie, "id">);
    setIsAddMovieDialogOpen(false);
    toast({
      title: "Movie Added",
      description: `${movieData.title} has been added successfully.`
    });
  };
  
  const handleEditMovie = (movieData: Partial<Movie>) => {
    if (editingMovie) {
      updateMovie(editingMovie.id, movieData);
      setIsEditMovieDialogOpen(false);
      setEditingMovie(null);
      toast({
        title: "Movie Updated",
        description: `${movieData.title} has been updated successfully.`
      });
    }
  };
  
  const handleDeleteMovie = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMovie(id);
      toast({
        title: "Movie Deleted",
        description: `${title} has been deleted successfully.`
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="bg-movie-darker border-r border-movie-dark">
          <div className="px-3 py-4 border-b border-movie-dark/30">
            <h1 className="text-xl font-bold flex items-center text-movie-red">
              MovieFlix Admin
            </h1>
          </div>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 bg-movie-red/10 text-movie-red">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-3 px-3 py-2">
                    <Film className="h-5 w-5" />
                    <span>Movies</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-3 px-3 py-2">
                    <Users className="h-5 w-5" />
                    <span>Users</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-3 px-3 py-2">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 h-screen overflow-y-auto">
          <header className="h-16 border-b border-movie-dark flex items-center justify-between px-6">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="ml-4 text-xl font-semibold">Dashboard</h1>
            </div>
            
            <div>
              <Button variant="outline" size="sm">
                Admin User
              </Button>
            </div>
          </header>
          
          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-secondary/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Movies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{movies.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">New Releases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {movies.filter(m => m.isNew).length}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Trending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {movies.filter(m => m.isTrending).length}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {(movies.reduce((acc, movie) => acc + movie.rating, 0) / movies.length).toFixed(1)}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Movie Management */}
            <Card className="bg-secondary/20 border-movie-dark">
              <CardHeader>
                <CardTitle>Movie Management</CardTitle>
                <CardDescription>
                  Add, edit, and remove movies from the catalog.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search movies..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Dialog open={isAddMovieDialogOpen} onOpenChange={setIsAddMovieDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <PlusCircle className="h-4 w-4" /> Add Movie
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Movie</DialogTitle>
                        <DialogDescription>
                          Fill in the details for the new movie.
                        </DialogDescription>
                      </DialogHeader>
                      <MovieForm 
                        onSubmit={handleAddMovie} 
                        onCancel={() => setIsAddMovieDialogOpen(false)} 
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="rounded-md border border-movie-dark/30 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-secondary/30">
                        <TableHead>Title</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Genres</TableHead>
                        <TableHead className="text-right">Rating</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMovies.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            No movies found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredMovies.map((movie) => (
                          <TableRow key={movie.id} className="hover:bg-secondary/30">
                            <TableCell className="font-medium">{movie.title}</TableCell>
                            <TableCell>{movie.releaseYear}</TableCell>
                            <TableCell>{movie.genres.join(", ")}</TableCell>
                            <TableCell className="text-right">{movie.rating.toFixed(1)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Dialog open={isEditMovieDialogOpen} onOpenChange={setIsEditMovieDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => setEditingMovie(movie)}
                                    >
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Edit</span>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>Edit Movie</DialogTitle>
                                      <DialogDescription>
                                        Update the details for {editingMovie?.title}.
                                      </DialogDescription>
                                    </DialogHeader>
                                    {editingMovie && (
                                      <MovieForm 
                                        movie={editingMovie} 
                                        onSubmit={handleEditMovie} 
                                        onCancel={() => {
                                          setIsEditMovieDialogOpen(false);
                                          setEditingMovie(null);
                                        }} 
                                      />
                                    )}
                                  </DialogContent>
                                </Dialog>
                                
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDeleteMovie(movie.id, movie.title)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredMovies.length} of {movies.length} movies
                </div>
              </CardFooter>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
