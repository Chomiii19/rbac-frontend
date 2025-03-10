import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages/loginSignup";
import HomePage from "./pages/homePage";
import ViewManga from "./pages/viewManga";
import ViewChapter from "./pages/viewChapter";
import { UserProvider } from "./hooks/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/manga/:id" element={<ViewManga />} />
          <Route path="/manga/:id/:chapter" element={<ViewChapter />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
