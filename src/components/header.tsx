import { ChevronDown, CircleUser, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext"; // Import User Context
import axios from "axios";

function Header() {
  const { user, refreshUser } = useUser(); // Get user & refreshUser function
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "https://rbac-zffx.onrender.com/api/v1/users/logout",
        {
          withCredentials: true,
        }
      );
      console.log("Logout response:", res.data);

      await refreshUser(); // Refresh context to reflect logout
      setTimeout(() => navigate("/"), 100);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="w-full flex justify-between items-center fixed px-10 py-2 border-b border-b-zinc-700 font-manrope text-zinc-200 backdrop-blur-sm z-50 bg-primary-800/80">
      <Link to={"/home"} className="text-zinc-200 text-xl font-bold">
        NovelKokoro
      </Link>

      <form className="flex items-center bg-primary-600 rounded-lg px-2 py-1 text-zinc-400 border border-transparent hover:border-primary transition-colors duration-150 ease-in-out">
        <Search className="h-5 mr-2" />
        <input
          placeholder="Search Novel"
          type="text"
          className="outline-0 text-sm bg-transparent text-zinc-200"
        />
        <p className="text-xs px-2 py-0.5 border border-zinc-700 rounded-lg">
          Ctrl K
        </p>
      </form>

      <div className="flex gap-4 font-semibold text-zinc-400">
        <nav className="flex gap-3">
          <button className="flex items-center cursor-pointer hover:text-primary transition-colors duration-150 ease-in-out">
            Categories <ChevronDown className="h-4" />
          </button>
          <button className="cursor-pointer hover:text-primary transition-colors duration-150 ease-in-out">
            My List
          </button>
          <button className="cursor-pointer hover:text-primary transition-colors duration-150 ease-in-out">
            Support Us
          </button>
        </nav>

        <div className="flex gap-2 pl-4 border-l border-l-zinc-700 transition-colors duration-150 ease-in-out cursor-pointer">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-primary cursor-pointer"
            >
              <CircleUser />
              <span>{user.username}</span>
            </button>
          ) : (
            <Link to="/login" className="hover:text-primary">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
