import './MoviesCard.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import React, {useEffect} from "react";
import {useState, useContext} from "react";
import {MoviesApi} from "../../utils/MoviesApi";
import {api} from "../../utils/MainApi";

function MoviesCard({movie, tb_delete=false}) {

  // currentUser

  const [isLiked, setIsLiked] = useState(false);

  function convertTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${ hours }ч ${ minutes }м`;
  }


  // console.log(currentUser)

  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = movie.owner._id === currentUser._id;

  // Определяем, есть ли у карточки поставленный нами лайк
  // const isLiked = movie.likes.some(i => i._id === currentUser._id);

  //Переменная для класса кнопки лайка
  const cardLikeButtonClassName =
    `moviescard__save ${ isLiked && 'moviescard__save_active' }`;

  const {state, setSavedMovies} = useContext(CurrentUserContext);

  useEffect(() => {
    setIsLiked(state.savedMovies.some(obj => obj.movieId === movie.id));
  }, [state.savedMovies]);

  let preventDoubleClick = false

  //Обработчик клика по лайку
  async function onCardLike(movie) {
    if (!preventDoubleClick) {
      preventDoubleClick = true
      if (state.savedMovies.some(obj => obj.movieId === movie.id) || tb_delete) {
        const movieId = movie._id || state.savedMovies.find(obj => obj.movieId === movie.id)._id;
        // Удаляем фильм из контекста и делаем запрос
        await api.deleteMovies(movieId);
        setSavedMovies(state.savedMovies.filter(obj => obj.movieId !== movie.movieId && obj.movieId !== movie.id ));
      } else {
        // Добавляем фильм в контекст и делаем запрос
        // const updatedFilms = [...state.savedMovies, movie];
        const resp = await api.saveMovies(movie);

        setSavedMovies([...state.savedMovies, resp.data]);
        // console.log(resp)
      }
      // api.getSavedMovies().then((r) => {
      //   setSavedMovies(r.body);
      // });
      preventDoubleClick = false
    }
  }

  async function handleCardLike() {
    await onCardLike(movie);
  }

  return (
    <div className="moviescard">
      <article className="moviescard__article">
        <a className="moviescard__trailer-link" href={ movie.trailerLink } target="_blank" rel="noreferrer">
          <img className="moviescard__photo" src={ typeof movie.image == 'string' ? movie.image : `https://api.nomoreparties.co${ movie.image.url }` } alt="постер"/>
        </a>
      </article>
      <div className="moviescard__flex">
        <h2 className="moviescard__text">{ movie.nameRU }</h2>
        <button className={ tb_delete ? 'moviescard__delete' : cardLikeButtonClassName } onClick={ handleCardLike }/>
      </div>
      <p className="moviescard__time">{ convertTime(movie.duration) }</p>
    </div>
  );
}

export default MoviesCard;
