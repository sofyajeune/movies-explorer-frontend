import './MoviesCard.css';
import filmImage from '../../images/filmImage.png'

function MoviesCard({ className, textButton }) {

  //card.nameRU
  //'movie__save-btn'
  const cardName = 'Киноальманах «100 лет дизайна»'

  return (
    <div className="moviescard__elements">
      <article className="moviescard__article">
        <a className="moviescard__trailer-link" href='https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D0%BE%D1%80%D0%B8%D1%8F_%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D0%B8%D0%BD%D0%BE' target="_blank" rel="noreferrer">
          <button className={className}></button>
          <img className="moviescard__photo" src={filmImage} alt='постер' />
        </a>
      </article>
      <div className="moviescard__flex">
        <h2 className="moviescard__text">{cardName}</h2>
        <p className="moviescard__time">15ч 32м</p>
      </div>
    </div>
  );
}

export default MoviesCard;