import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { useUser } from "../hooks/UserContext";

function Login() {
  const { refreshUser } = useUser();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        "https://rbac-zffx.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Allows sending cookies
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      refreshUser();
      navigate("/home"); // Redirect on success
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header />
      <main className="h-screen w-full bg-primary-800 flex justify-center items-center font-manrope text-zinc-200">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[300px] items-center"
        >
          <h1 className="text-2xl font-semibold mb-5">
            Log in to your Account
          </h1>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col w-full">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="outline-0 border border-zinc-700 rounded-lg px-2 py-1 bg-primary-700 focus:bg-primary-500/40 mt-1"
              required
            />
          </div>

          <div className="flex flex-col w-full mt-3">
            <div className="w-full flex justify-between">
              <label htmlFor="password">Password</label>
              <Link to={"/"} className="text-primary">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="outline-0 border border-zinc-700 rounded-lg px-2 py-1 bg-primary-700 focus:bg-primary-500/40 mt-1"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary w-full py-2 rounded-lg mt-5"
          >
            Log In
          </button>
          <p className="text-sm mt-2 text-zinc-500">
            No account yet?{" "}
            <Link to={"/signup"} className="text-primary">
              Create an account.
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}

function Signup() {
  const { refreshUser } = useUser();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        "https://rbac-zffx.onrender.com/api/v1/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      refreshUser();
      navigate("/home   "); // Redirect after successful signup
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header />
      <main className="h-screen w-full bg-primary-800 flex justify-center items-center font-manrope text-zinc-200">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[300px] items-center"
        >
          <h1 className="text-2xl font-semibold mb-5">Create an Account</h1>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col w-full">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="outline-0 border border-zinc-700 rounded-lg px-2 py-1 bg-primary-700 focus:bg-primary-500/40 mt-1"
              required
            />
          </div>

          <div className="flex flex-col w-full mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="outline-0 border border-zinc-700 rounded-lg px-2 py-1 bg-primary-700 focus:bg-primary-500/40 mt-1"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary w-full py-2 rounded-lg mt-5"
          >
            Sign Up
          </button>
          <p className="text-sm mt-2 text-zinc-500">
            Already have an account?{" "}
            <Link to={"/"} className="text-primary">
              Log in.
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}

export { Login, Signup };
