import {
  useNavigate,
  Routes,
  Route
} from "react-router-dom";
import { useEffect, useState } from "react";

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Burger from "../Burger/Burger";

function App() {
  const [isOpenBurger, setisOpenBurger] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    function handelEscape(evt) {
      if (evt.key === "Escape") {
        closeBurger();
      }
    }

    function handleClosePopups(evt) {
      if (
        evt.target.classList.contains("burger-popup_active")
      ) {
        closeBurger();
      }
    }

    document.addEventListener("mousedown", handleClosePopups);
    document.addEventListener("keydown", handelEscape);

    return () => {
      document.removeEventListener("keydown", handelEscape);
      document.removeEventListener("mousedown", handleClosePopups);
    };
  }, []);

  function handleOpenBurger() {
    setisOpenBurger(true)
  }

  function closeBurger() {
    setisOpenBurger(false)
  }

  function handleLoginClick() {
    navigate("/movies", { replace: true })
  }


  return (

    <div className="app">
      <Burger isOpen={isOpenBurger} onClose={closeBurger} />
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
        <Route path="/movies" element={<Movies onOpenBurger={handleOpenBurger} />} />
        <Route path="/saved-movies" element={<SavedMovies onOpenBurger={handleOpenBurger} />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login login={handleLoginClick} />} />
        <Route path="/profile" element={<Profile onOpenBurger={handleOpenBurger} />} />
      </Routes>
    </div>
  )
}

export default App;