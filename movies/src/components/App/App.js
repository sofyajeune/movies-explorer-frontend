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
import InfoToolTip from "../InfoToolTip/InfoToolTip";

import ProtectedRoute from "../../utils/ProtectedRoute";
import { register, login } from "../../utils/Auth";
import { api } from "../../utils/MainApi";
import { MoviesApi } from "../../utils/MoviesApi";

import { CurrentUserContext } from "../../utils/CurrentUserContext";

function App() {
  const [isOpenBurger, setisOpenBurger] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, isLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateUserError, setUpdateUserError] = useState("");
  const [errorMovies, setErrorMovies] = useState("");
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);

  //регистрация стейт
  const [registerResponse, isregisterResponse] = useState({ status: false, text: "", });

  // фильмы стейт
  const [movies, setMovies] = useState([]);
  const [errorSearchFormSpan, setErrorSearchFormSpan] = useState(""); //ошибка при поиске фильмов
  const [checkbox, setCheckbox] = useState(false);
  const [activeShowAllMovies, setActiveShowAllMovies] = useState(false); //когда видна кнопка все фильмы
  const [isFiltered, setIsFiltered] = useState(false); //происходила ли фильтрация исходного массива
  const [filteredAllMovies, setFilteredAllMovies] = useState([]); //отфильтрованный массив
  const [formValue, setFormValue] = useState("")

  //сохраненные стейт
  const [checkboxSave, setCheckboxSave] = useState(false)
  const [savedMovies, setSavedMovies] = useState([]);
  const [formValueSave, setFormValueSave] = useState("");
  const [errorSearchSavedMoviesPage, setErrorSearchSavedMoviesPage] = useState("") //ошибка при поиске фильмов
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [value, setValue] = useState("")
  const [checkboxSavePage, setCheckboxSavePage] = useState(false)

  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  // достаём инфу пользователя
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user.data); //data
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  // сохранение токена при перезагрузке
  useEffect(() => {
    if (token) {
      api
        .getUserInfo()
        .then((res) => {
          if (res) {
            isLoggedIn(true);
            navigate({ replace: false });
          }
        })
        .catch(() => {
          isLoggedIn(false);
        })
    }
  }, [token]);

  // загружаем базу фильмов
  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      MoviesApi
        .getMovies()
        .then((movies) => {
          setMovies(movies);//data
          navigate({ replace: false });
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(setTimeout(() => setIsLoading(false), 1000));
    }
  }, [loggedIn]);

  // сохранённые фильмы
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      api
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res.data);//data
        })
        .catch((err) => {
          console.log(err);
          setErrorMovies()
        })
        .finally(setTimeout(() => setIsLoading(false), 1000));
    }
  }, [loggedIn]);

  useEffect(() => {
    function handleEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    function handleClosePopups(evt) {
      if (evt.target.classList.contains("burger_active")) {
        closeAllPopups();
      }
    }
    document.addEventListener("mousedown", handleClosePopups);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClosePopups);
    };
  }, []);


  // регистрация 
  function handleRegister(password, email, name) {
    register(password, email, name)
      .then((res) => {
        if (res) {
          isregisterResponse({
            status: true,
            text: "Вы успешно зарегистрировались!",
          });
          handleLogin(password, email);
        }
      })
      .catch((res) => {
        if (res === "Ошибка 409") {
          setOpenInfoTooltip(true);
          isregisterResponse({
            status: false,
            text: "Пользователь с такой почтой уже зарегистрирован",
          });
        } else if (!res) {
          isregisterResponse({
            status: false,
            text: "Что-то пошло не так! Попробуйте ещё раз.",
          });
        }
      })
      .finally(() => {
        setOpenInfoTooltip(true);
      });
  }

  // вход
  function handleLogin(password, email) {
    login(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        navigate("/movies");
      })
      .catch((res) => {
        if (res === "Ошибка 401") {
          setOpenInfoTooltip(true);
          isregisterResponse({
            status: false,
            text: "Неверная почта или пароль",
          });
        } else if (!res) {
          isregisterResponse({
            status: false,
            text: res,
          });
        }
      });
  }

  //cnраница профиля
  function handleUpdateUserClick(value) {
    setIsLoading(true);
    api
      .saveNewUserInfo(value)
      .then((user) => {
        setCurrentUser(user.data);
        setUpdateUserError("Данные изменены");
      })
      .then(closeAllPopups)
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setUpdateUserError("Пользователь с такой почтой уже зарегистрирован");
        } else {
          setUpdateUserError(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // бургер
  function handleOpenBurger() {
    setisOpenBurger(true);
  }


  function closeAllPopups() {
    setOpenInfoTooltip(false);
    setisOpenBurger(false);
  }

  function Exit() {
    navigate("/signin");
    isLoggedIn(false);
    setCurrentUser("");
    setCheckbox(false);
    localStorage.clear();
    setFilteredAllMovies({});
    setIsFiltered(false);
    setFormValue("")
    setValue("")
    setFormValueSave("")
    setCheckboxSavePage(false)
    setCheckboxSave(false)
  }

  //сохранить фильм
  function handleSaveMovie(movie) {
    api
      .saveMovies(movie)
      .then((movie) => {
        setSavedMovies((state) => [movie.data, ...state]); //data
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //удаление
  function handleDeleteMovies(movie) {
    api
      .deleteMovies(movie._id)
      .then(() => {
        setSavedMovies((i) => i.filter((m) => m._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function filterMovies(formValue, checkbox) {
    setActiveShowAllMovies(true)
    setIsFiltered(true);
    let filteredMovies = movies.filter((item) =>
      item.nameRU.toLowerCase().includes(formValue.toLowerCase()));
    let sortFilteredMovies = filteredMovies.filter(
      (movie) => movie.duration <= 40);
    localStorage.setItem('formValue', JSON.stringify(formValue));
    if (checkbox) {
      filteredMovies = sortFilteredMovies;
    }
    setFilteredAllMovies(filteredMovies);
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
  }

  //показать фильмы
  function handleShowAllMovies() {
    setFilteredAllMovies(movies)
    localStorage.removeItem("filteredMovies")
    localStorage.removeItem("formValue")
    localStorage.removeItem("chechbox")
    localStorage.setItem('allMovies', JSON.stringify(movies));
    window.scrollTo(0, 0);
    setIsFiltered(true);
    setFormValue("")
    setErrorSearchFormSpan("")
    setActiveShowAllMovies(false);
    setCheckbox(false);
  }

  //чекбокс
  function handleCheckboxFiltered(checkbox) {
    setIsFiltered(true);
    let filterMovies
    if (localStorage.getItem('filteredMovies')) {
      const films = JSON.parse(localStorage.getItem('filteredMovies'));
      let sortFilteredMovies = films.filter((movie) => movie.duration <= 40);
      if (checkbox) {
        filterMovies = sortFilteredMovies;
      } else if (localStorage.getItem('formValue')) {
        setActiveShowAllMovies(true)
        const formValue = JSON.parse(localStorage.getItem('formValue'))
        filterMovies = movies.filter((item) =>
          item.nameRU.toLowerCase().includes(formValue.toLowerCase()));
      } else if (!checkbox && !localStorage.getItem('allMovies')) {
        setActiveShowAllMovies(true)
        filterMovies = films
      } else if (!checkbox && localStorage.getItem('allMovies')) {
        filterMovies = movies
      }
    } else if (localStorage.getItem('allMovies')) {
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      let sortFilteredMovies = allMovies.filter((movie) => movie.duration <= 40);
      if (checkbox) {
        filterMovies = sortFilteredMovies;
      } else if (!checkbox) {
        filterMovies = allMovies;
      }
    } else if (!localStorage.getItem('filteredMovies') && !localStorage.getItem('allMovies')) {
      setErrorMovies("Начните поиск")
    }
    setFilteredAllMovies(filterMovies);
    localStorage.setItem('filteredMovies', JSON.stringify(filterMovies));
  }

  useEffect(() => {
    if (localStorage.getItem('filteredMovies')) {
      try {
        setIsFiltered(true);
        const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
        setFilteredAllMovies(filteredMovies);
      } catch (e) {
        console.error('Error parsing filteredMovies as JSON', e);
      }
    } else if (localStorage.getItem('allMovies')) {
      try {
        setIsFiltered(true);
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        setFilteredAllMovies(allMovies);
      } catch (e) {
        console.error('Error parsing allMovies as JSON', e);
      }
    } else {
      setFilteredAllMovies({});
    }
  }, [])


  //сохраненные фильмы
  function handleFilterSaveMovies(inputSearch) {
    setValue(inputSearch);
  }

  function handleCheckboxFilteredSaveMovies(checkbox) {
    setCheckboxSavePage(checkbox)
  }

  //рендеринг отфильтрованных фильмов
  useEffect(() => {
    let filteredMovies = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(value.toLowerCase()));
    if (checkboxSavePage) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.duration <= 40);
    }
    setFilteredMovies(filteredMovies)
  }, [savedMovies, value, checkboxSavePage]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Burger isOpen={isOpenBurger} />
        <Routes>
          <Route path="/signup" element={<Register register={handleRegister} />} />
          <Route path="/signin" element={<Login login={handleLogin} />} />
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          <Route path="/movies" element={
            <ProtectedRoute component={Movies}
              errorMovies={errorMovies}
              onOpenBurger={handleOpenBurger}
              isLoggedIn={loggedIn}
              handleSaveMovie={handleSaveMovie}
              handleFilteredMovies={filterMovies}
              isFiltered={isFiltered}
              activeShowAllMovies={activeShowAllMovies}
              setActiveShowAllMovies={setActiveShowAllMovies}
              handleShowAllMovies={handleShowAllMovies}
              handleDeleteMovies={handleDeleteMovies}
              movies={filteredAllMovies}
              savedMovies={savedMovies}
              errorSpan={errorSearchFormSpan}
              setErrorSpan={setErrorSearchFormSpan}
              handleCheckboxFiltered={handleCheckboxFiltered}
              checkbox={checkbox}
              setCheckbox={setCheckbox}
              formValue={formValue}
              setFormValue={setFormValue}
              isLoading={isLoading} />} />
          <Route path="/saved-movies" element={
            <ProtectedRoute component={SavedMovies}
              onOpenBurger={handleOpenBurger}
              handleDeleteMovies={handleDeleteMovies}
              isLoggedIn={loggedIn}
              isLoading={isLoading}
              errorSpan={errorSearchSavedMoviesPage}
              setErrorSpan={setErrorSearchSavedMoviesPage}
              handleSaveMovie={handleSaveMovie}
              formValue={formValueSave}
              setFormValue={setFormValueSave}
              checkbox={checkboxSave}
              setCheckbox={setCheckboxSave}
              movies={filteredMovies}
              handleFilteredMovies={handleFilterSaveMovies}
              handleCheckboxFiltered={handleCheckboxFilteredSaveMovies} />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/profile" element={
            <ProtectedRoute component={Profile}
              onOpenBurger={handleOpenBurger}
              isLoggedIn={loggedIn}
              currentUser={currentUser}
              onUpdateUser={handleUpdateUserClick}
              updateUserError={updateUserError}
              Exit={Exit} />} />
        </Routes>
        <InfoToolTip
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          registerResponse={registerResponse}
        />
        <Burger isOpen={isOpenBurger} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;