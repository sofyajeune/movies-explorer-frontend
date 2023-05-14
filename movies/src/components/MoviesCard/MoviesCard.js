import './MoviesCard.css';

function MoviesCard({ film, props, isSaved, savedMovies, pageSavedMovie }) {

  //card.nameRU
  const { nameRU, trailerLink, duration, image } = film;
  const { handleSaveMovie, handleDeleteMovies } = props;

  const imageUrl = pageSavedMovie ? image : `https://api.nomoreparties.co${image.url}`;

  const className = pageSavedMovie ? "moviescard__delete" : `moviescard__save ${isSaved && 'moviescard__save_active'}`;

  const hours = Math.trunc(duration / 60);
  const minutes = Math.trunc(duration - hours * 60);

  function onButtonClick() {
    if (pageSavedMovie) {
      handleDeleteMovies(film);
    } else {
      if (isSaved) {
        const filterSavedMovies = savedMovies.filter(m => m.movieId === film.id);
        handleDeleteMovies(filterSavedMovies.shift());
      } else {
        handleSaveMovie(film);
      }
    }
  }

  return (
    <div className="moviescard">
      <article className="moviescard__article">
        <a className="moviescard__trailer-link" href={trailerLink} target="_blank" rel="noreferrer">
          <img className="moviescard__photo" src={imageUrl} alt='постер' />
        </a>
        <button className={className} alt="Добавить в избранное или удалить" onClick={onButtonClick}></button>
      </article>
      <div className="moviescard__flex">
        <h2 className="moviescard__text">{nameRU}</h2>
        <p className="moviescard__time">{hours}ч {minutes}м</p>
      </div>
    </div>
  );
}

export default MoviesCard;