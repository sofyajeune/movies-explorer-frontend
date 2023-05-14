import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useEffect, useState } from "react";
import EmptyPage from "../EmptyPage/EmptyPage";

function MoviesCardList({ props, pageSavedMovie }) {
  const {
    activeShowAllMovies,
    errorMovies,
    errorSaveMovies,
    savedMovies,
    isFiltered,
    handleShowAllMovies,
    handleSaveMovie,
    movies
  } = props;

  const [amountCard, setAmountCard] = useState(12);

  const buttonAll = pageSavedMovie ? "moviescardlist__button-all_disabled" : `moviescardlist__button moviescardlist__button-all ${!activeShowAllMovies && "moviescardlist__button-all_disabled"
    }`;

  const buttonMore = `moviescardlist__button ${!pageSavedMovie && "moviescardlist__button_active button-hover"}`;

  useEffect(() => {
    let timer;
    const handleChangeTimer = () => {
      timer = setTimeout(handleChangeWidth, 300);
    };
    window.addEventListener("resize", handleChangeTimer);
    return () => {
      window.removeEventListener("resize", handleChangeTimer);
      clearTimeout(timer);
    };
  });

  const handleChangeWidth = () => {
    if (window.innerWidth < 377) {
      setAmountCard(5);
    } else if (window.innerWidth < 898) {
      setAmountCard(8);
    } else {
      setAmountCard(12);
    }
  };

  const handleMoreFilmsShow = () => {
    if (movies.length !== 0) {
      if (window.innerWidth > 897) setAmountCard(amountCard + 3);
      else {
        setAmountCard(amountCard + 2);
      }
    }
  };

  return (
    <section className="moviescardlist">
      {!pageSavedMovie ?
        <>
          {!errorMovies ?
            <>
              {!movies.length && !isFiltered ?
                <EmptyPage
                  text={"Начните поиск"}
                  className={!pageSavedMovie && "moviescardlist__button moviescardlist__button-all"}
                  onClick={handleShowAllMovies}
                />
                : <>
                  {movies.length !== 0 && isFiltered ? (
                    <>
                      <ul className="moviescardlist__container">
                        {movies.slice(0, amountCard).map((film, index) => {
                          return index < amountCard &&
                            <MoviesCard
                              isSaved={savedMovies.find((savedMovie) => savedMovie.movieId === film.id)}
                              handleSaveMovie={handleSaveMovie}
                              savedMovies={savedMovies}
                              key={film.id}
                              film={film}
                              props={props}
                              pageSavedMovie={pageSavedMovie}
                            />
                        })}
                      </ul>
                      {movies.length > amountCard && (
                        <button className={buttonMore} type="button"  aria-label="Кнопка ещё" onClick={handleMoreFilmsShow}>
                          Ещё
                        </button>
                      )}
                      <button className={buttonAll}  type="button"  aria-label="Кнопка все фильмы" onClick={handleShowAllMovies}>
                        Все фильмы
                      </button>
                    </>
                  ) : (
                    <EmptyPage text={"К сожалению, таких фильмов пока нет :("} className={buttonAll} onClick={handleShowAllMovies} />
                  )}
                </>
              }
            </>
            : <EmptyPage text={errorMovies} className={buttonAll} onClick={handleShowAllMovies} />}
        </>
        : <>
          {!errorSaveMovies ?
            <>
              {movies.length !== 0 ?
                <ul className="moviescardlist__container">
                  {movies.map((film) => {
                    return (<MoviesCard key={film.movieId} film={film} props={props} pageSavedMovie={pageSavedMovie} />)
                  })}
                </ul>
                :
                <EmptyPage className={buttonAll} text={"К сожалению, таких фильмов пока нет :("}/>
              }
            </>
            : <EmptyPage text={errorSaveMovies} className={buttonAll} />}
        </>
      }
    </section>
  );
}

export default MoviesCardList;