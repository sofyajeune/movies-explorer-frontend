import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Burger from "../Burger/Burger";
import {MoviesApi} from '../../utils/MoviesApi';
import {register, login} from "../../utils/AuthApi";
import {api} from "../../utils/MainApi";
import {CurrentUserContext, defaultState} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MessagePopup from "../MessagePopup/MessagePopup";

// CurrentUserContext

function App() {
  const [isOpenBurger, setisOpenBurger] = useState(false);
  const navigate = useNavigate();

  const {state, setSavedMovies, updateState, removeCurrentUser} = useContext(CurrentUserContext);

  // Стейт для фильмов
  const [allMovies, setAllMovies] = useState([]);

  // cтейт для отслеживания загрузки страницы
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [resetCondition, setResetCondition] = useState(false);

  const handleReset = () => {
    setResetCondition(true);
  };

  const resetState = () => {
    setisOpenBurger(false);
    setAllMovies([]);
    setToken(null);
    setIsLoading(false);
    setIsPopupVisible(false);
    handleReset()
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); // Close the popup
  };

  //Авторизация
  function handleLogin(email, password) {
    login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate('/movies');
      });
  };

  //Регистрация нового пользователя
  function handleRegister(password, email, name) {
    register(password, email, name)
      .then(() => {
        handleLogin(password, email);
      }).catch((e) => {
      console.error(e);
      setIsPopupVisible(true);
    });
  };

  function handleLogout() {
    resetState();
    updateState(defaultState)
    removeCurrentUser()

    localStorage.removeItem("jwt");
    updateState({
      isAuthenticated: false,
    });
    setIsLoggedIn(false);
    navigate('/');
  }

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
    setisOpenBurger(true);
  }

  function closeBurger() {
    setisOpenBurger(false);
  }

  async function getSavedMovies() {
    return api.getSavedMovies().then((r) => {
      setSavedMovies(r.data);
    }).catch((e) => {
      console.error(e);
      setIsPopupVisible(true);
    });
  }

  // данные фильмов
  useEffect(() => {
    api.getUserInfo().then(d => {
      updateState({
        user: {
          name: d.data.name,
          email: d.data.email,
        },
        isAuthenticated: true,
      });
      setIsLoggedIn(true);
    }).catch((e) => {
      handleLogout();
      console.error("Ошибка авторизации!");
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (isLoggedIn) {
      Promise.all([
        MoviesApi.getMovies(),
        getSavedMovies(),
      ])
        .then(([movie]) => {
          setAllMovies(movie);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsPopupVisible(true);
          console.log(`Ошибка при получении данных: ${ err }`);
        });
    }
  }, [isLoggedIn]);


  return (
    <div className="app">
      { isPopupVisible && (<MessagePopup onClose={ handleClosePopup }
                                         title={ "Возникла ошибка" }
                                         description={ "Попробуйте повторить попытку позже" }
      />) }
      <Burger isOpen={ isOpenBurger } onClose={ closeBurger }/>
      <Routes>
        <Route path="/" element={ <Main isLoggedIn={ isLoggedIn } onOpenBurger={ handleOpenBurger }/> }/>
        <Route path="/signup" element={ <Register handleRegister={ handleRegister }/> }/>
        <Route path="/signin" element={ <Login handleLogin={ handleLogin }/> }/>
        <Route path="/movies" element={
          <ProtectedRoute isAuthenticated={ isLoggedIn }>
            <Movies onOpenBurger={ handleOpenBurger }
                    allMovies={ allMovies }
                    isLoading={ isLoading }
                    resetCondition={ resetCondition }
            />
          </ProtectedRoute>
        }/>
        <Route path="/saved-movies" element={
          <ProtectedRoute isAuthenticated={ isLoggedIn }>
            <SavedMovies onOpenBurger={ handleOpenBurger }
                         allMovies={ allMovies }
                         isLoading={ isLoading }
                         resetCondition={ resetCondition }
            />
          </ProtectedRoute>
        }/>
        <Route path="/profile" element={
          <ProtectedRoute isAuthenticated={ isLoggedIn }>
            <Profile onOpenBurger={ handleOpenBurger } handleLogout={ handleLogout }/>
          </ProtectedRoute>
        }/>
        <Route path="*" element={ <NotFound/> }/>
      </Routes>
    </div>
  );
}

export default App;
