import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

function Login() {
  return (
    <>
      <Header />
      <main className="h-screen w-full bg-primary-800 flex justify-center items-center font-manrope text-zinc-200">
        <form className="flex flex-col w-[300px] items-center">
          <h1 className="text-2xl font-semibold mb-5">
            Log in to your Account
          </h1>

          <div className="flex flex-col w-full">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="outline-0 border border-zinc-700 rounded-lg focus:border-primary transition-colors duration-150 ease-in-out px-2 py-0.5 bg-primary-700 focus:bg-primary-500/40 mt-1"
            />
          </div>

          <div className="flex flex-col w-full mt-3">
            <div className="w-full flex justify-between">
              <label htmlFor="username">Password</label>
              <Link to={"/"} className="text-primary">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="username"
              id="username"
              className="outline-0 border border-zinc-700 rounded-lg focus:border-primary transition-colors duration-150 ease-in-out px-2 py-0.5 bg-primary-700 focus:bg-primary-500/40 mt-1"
            />
          </div>

          <button className="bg-primary w-full py-1 rounded-lg mt-5">
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
  return (
    <>
      <Header />
      <main className="h-screen w-full bg-primary-800 flex justify-center items-center font-manrope text-zinc-200">
        <form className="flex flex-col w-[300px] items-center">
          <h1 className="text-2xl font-semibold mb-5">Create an Account</h1>

          <div className="flex flex-col w-full">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="outline-0 border border-zinc-700 rounded-lg focus:border-primary transition-colors duration-150 ease-in-out px-2 py-0.5 bg-primary-700 focus:bg-primary-500/40 mt-1"
            />
          </div>

          <div className="flex flex-col w-full mt-3">
            <label htmlFor="username">Password</label>

            <input
              type="password"
              name="username"
              id="username"
              className="outline-0 border border-zinc-700 rounded-lg focus:border-primary transition-colors duration-150 ease-in-out px-2 py-0.5 bg-primary-700 focus:bg-primary-500/40 mt-1"
            />
          </div>

          <button className="bg-primary w-full py-1 rounded-lg mt-5">
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
