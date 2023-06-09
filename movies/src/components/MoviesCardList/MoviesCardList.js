import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({tbDelete, movies, isLoading, displayMoreButton, addStep, resetFilters, previewEnabled}) {
  return (
    <section className="moviescardlist">

      {
        !isLoading ?
        previewEnabled ? (
          movies && movies.length > 0 ? (
            <>
              <div className="moviescardlist__container">
                { movies.map((movie) => (
                  <MoviesCard
                    tb_delete={ tbDelete }
                    movie={ movie }
                    key={ movie.id || movie.movieId }/>
                )) }
              </div>
              { displayMoreButton ?
                <button onClick={ addStep }
                        className="moviescardlist__more" type="button" aria-label="Загрузить ещё фильмы">Ещё
                </button> : null
              }
            </>
          ) : (isLoading ? null : (
              <>
                <h1 className="nothing_found">Ничего не найдено!</h1>
                <button className="moviescardlist__more" type="button" aria-label="Все фильмы" onClick={ resetFilters }>Все фильмы</button>
              </>)
          )
        ) : (
              <>
          <h1>Начните поиск</h1>
          <button className="moviescardlist__more" type="button" aria-label="Все фильмы" onClick={ resetFilters }>Все фильмы</button>
        </>)
          : null
      }
    </section>
  );
}

export default MoviesCardList;
