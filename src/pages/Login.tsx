
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, hardcode admin login
    if (loginEmail === "admin@movieflix.com" && loginPassword === "admin123") {
      toast({
        title: "Login Successful",
        description: "Welcome to MovieFlix Admin Dashboard"
      });
      navigate("/admin");
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome back to MovieFlix!"
      });
      navigate("/");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account Created",
      description: "Your account has been created successfully!"
    });
    navigate("/");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop)" }}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 left-4 text-white hover:bg-white/10"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back to Home</span>
      </Button>
      
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-movie-red mb-2">MovieFlix</h1>
          <p className="text-gray-400">Sign in to your account or create a new one</p>
        </div>
        
        <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
          <CardHeader>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="bg-gray-900/70 border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs text-movie-red hover:underline">
                          Forgot Password?
                        </a>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="bg-gray-900/70 border-gray-700"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-movie-red hover:bg-movie-red/90">
                      Sign In
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-400">
                    For admin access, use:
                    <br />
                    Email: admin@movieflix.com
                    <br />
                    Password: admin123
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="bg-gray-900/70 border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="you@example.com" 
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="bg-gray-900/70 border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="bg-gray-900/70 border-gray-700"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-movie-red hover:bg-movie-red/90">
                      Create Account
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardHeader>
          
          <CardFooter className="border-t border-gray-800 flex flex-col gap-4 pt-6">
            <Button variant="outline" className="w-full">
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              Continue with Facebook
            </Button>
            
            <div className="text-xs text-center text-gray-500 mt-2">
              By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
