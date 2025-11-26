import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { User } from "lucide-react";

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const session = window.sessionStorage.getItem('session');
    if (session) {
      try {
        const sessionData = JSON.parse(session) as {id:string,email:string,role:string};
        setIsLoggedIn(true);
        setIsAdmin(sessionData.role==="admin" ? true : false); // Assuming sessionData has an isAdmin property
        // return username also
        setUsername("User"); // Assuming sessionData has a username property
      } catch (error) {
        console.error("Failed to parse session data:", error);
        window.sessionStorage.removeItem('session');
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUsername("");
      }
    } else {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      fetch(`${baseUrl}/auth/session`, {
        method: 'GET',
        credentials: 'include',
      })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          window.sessionStorage.setItem('session', JSON.stringify(result.data));
          setIsLoggedIn(true);
          setIsAdmin(result.data.isAdmin || false);
          setUsername(result.data.username || "User");
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
          setUsername("");
        }
      })
      .catch(error => {
        console.error("Failed to fetch session:", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUsername("");
      });
    }
  }, []);

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleSignOut = () => {
    window.sessionStorage.removeItem('session');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername("");
    navigate("/"); // Redirect to home or login page
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      {!isLoggedIn ? (
        <Button onClick={handleLogin}>Login</Button>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button className="relative border h-8 w-8 rounded-full">
              <User className="size-4"/>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium leading-none">Welcome, {username}</p>
              <Button onClick={handleSignOut} variant="ghost" className="justify-start">
                Sign out
              </Button>
              {isAdmin && (
                <Button onClick={handleDashboard} variant="ghost" className="justify-start">
                  Dashboard
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
