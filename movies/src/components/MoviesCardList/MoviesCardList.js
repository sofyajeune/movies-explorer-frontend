import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ className }) {

  return (
    <section className='moviescardlist'>
      <>
        <div className='moviescardlist__container'>
          <MoviesCard className={className} />
          <MoviesCard className={className} />
          <MoviesCard className={className} />
          <MoviesCard className={className} />
          <MoviesCard className={className} />
          <MoviesCard className={className} />
        </div>
        <button
          className='moviescardlist__more' type='button' aria-label='Загрузиьть ещё фильмы'>Ещё</button>
      </>
    </section>
  );
}

export default MoviesCardList;