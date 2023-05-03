import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Layout from '../Layout/Layout';


function SavedMovies({ onOpenBurger }) {

  return (
    <Layout className="header__white" title="Main" isLoggedIn page onOpenBurger={onOpenBurger}>
      <section className='savedmovies'>
        <SearchForm />
        <MoviesCardList className={'moviescard__delete'} />
      </section>
    </Layout>
  );
}

export default SavedMovies;