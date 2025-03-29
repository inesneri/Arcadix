import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Markup from "./layout/index";
import Home from "./pages/Home/index";
import Genre from "./pages/Genre/index";
import Platform from "./pages/Platform";
import Game from "./pages/Game/index";
import SignUp from "./pages/SignUp/index";
import LogIn from "./pages/LogIn/index";
import Account from "./pages/Account/index";
import Search from "./pages/Search/index";
import Review from "./pages/Game/components/GameReviews";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import SessionProvider from "./context/SessionProvider";
import SessionContext from "./context/SessionContext";

// ProtectedRoute component to restrict access to certain routes
export function ProtectedRoute() {
  const { session } = useContext(SessionContext);
  if (!session) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Markup />}>
          <Route index element={<Home />} />
          <Route path="games/:genre" element={<Genre />} />
          <Route path="/platforms/:platform" element={<Platform />} />
          <Route path="games/:id/:game" element={<Game />} />
          <Route path="games/review/:id" element={<Review />} />
          <Route path="/search" element={<Search />} />
          <Route element={<ProtectedRoute />}>
            <Route path="account" element={<Account />} />
          </Route>
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

function Root() {
  return (
    <SessionProvider>
      <App />
    </SessionProvider>
  );
}

export default Root;
