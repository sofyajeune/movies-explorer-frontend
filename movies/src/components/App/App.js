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
import {
  ProtectedRoute,
  UnauthorizedOnlyRoute,
} from "../ProtectedRoute/ProtectedRoute";
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

  const errorMessage = "Возникла ошибка";
  const errorDescription = "Попробуйте повторить попытку позже";

  const successMessage = "Отлично!";
  const successDescription = "Ваши данные успешно обновлены";

  const loginFailureMessage = "Не удалось авторизоваться!";
  const loginFailureDescription = "Проверьте email и пароль";

  const [popUpTitle, setPopUpTitle] = useState(errorMessage);
  const [popUpDescription, setPopUpDescription] = useState(errorDescription);

  function setPopUpSuccess() {
    setPopUpTitle(successMessage);
    setPopUpDescription(successDescription);
  }

  function setPopUpLogin() {
    setPopUpTitle(loginFailureMessage);
    setPopUpDescription(loginFailureDescription);
  }

  function setPopUpFailure() {
    setPopUpTitle(errorMessage);
    setPopUpDescription(errorDescription);
  }

  const handleReset = () => {
    setResetCondition(true);
  };

  const resetState = () => {
    setisOpenBurger(false);
    setAllMovies([]);
    setToken(null);
    setPopUpFailure();
    setIsLoading(false);
    setIsPopupVisible(false);
    handleReset();
  };

  const handleClosePopup = () => {
    setPopUpFailure();
    setIsPopupVisible(false); // Close the popup
  };

  //Авторизация
  function handleLogin(email, password) {
    login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        updateUserInfo()
        setIsLoggedIn(true);
        navigate('/movies');
      }).catch((e) => {
      console.error(e);
      setPopUpLogin();
      setIsPopupVisible(true);
    });
  };

  //Регистрация нового пользователя
  function handleRegister(password, email, name) {
    register(password, email, name)
      .then(() => {
        handleLogin(password, email);
      }).catch((e) => {
      console.error(e);
      setPopUpFailure();
      setIsPopupVisible(true);
    });
  };

  function handleLogout() {
    resetState();
    updateState(defaultState);
    removeCurrentUser();

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
      setPopUpFailure();
      setIsPopupVisible(true);
    });
  }

  function updateUserInfo() {
    api.getUserInfo().then(d => {
      if (d.data) {
        if (d.data.name && d.data.email) {
          updateState({
            user: {
              name: d.data.name,
              email: d.data.email,
            },
            isAuthenticated: true,
          });
          setIsLoggedIn(true);
          return;
        }
      }
      setIsLoggedIn(false);
    }).catch((e) => {
      console.log(e);
      if (e === "Ошибка: 401") {
        handleLogout();
      }
      setPopUpFailure();
      setIsPopupVisible(true);
      setIsLoggedIn(false);
      console.error("Ошибка авторизации!");
    });
  }

  // данные пользователя
  useEffect(() => {
    updateUserInfo()
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
                                         title={ popUpTitle }
                                         description={ popUpDescription }
      />) }
      <Burger isOpen={ isOpenBurger } onClose={ closeBurger }/>
      <Routes>
        <Route path="/" element={ <Main isLoggedIn={ isLoggedIn } onOpenBurger={ handleOpenBurger }/> }/>
        <Route path="/signup" element={
          <ProtectedRoute isAuthenticated={ !isLoggedIn }>
            <Register handleRegister={ handleRegister }/>
          </ProtectedRoute>
        }/>
        <Route path="/signin" element={
          <ProtectedRoute isAuthenticated={ !isLoggedIn }>
            <Login handleLogin={ handleLogin }/>
          </ProtectedRoute>
        }/>
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
