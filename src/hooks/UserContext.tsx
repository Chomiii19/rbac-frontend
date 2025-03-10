import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  _id: number;
  username: string;
  password: string;
  followedManga: number[];
  readChapters: { mangaId: number; latestRead: number }[];
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://rbac-zffx.onrender.com/api/v1/getUser",
        {
          withCredentials: true,
        }
      );

      const userData = res.data.data.user;
      setUser(userData);
      console.log("Fetched user:", userData);
      setError(null);
    } catch (err) {
      setUser(null);
      setError("Failed to fetch user");
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, error, refreshUser: fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
