import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Layout from '../Layout/Layout';
import Preloader from "../Preloader/Preloader"


function SavedMovies(props) {

  const { onOpenBurger, isLoading } = props;

  return (
    <Layout className="header header_white" title="Main" isLoggedIn page onOpenBurger={onOpenBurger}>
      <section className='savedmovies'>
        <SearchForm props={props} pageSavedMovie={true} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList props={props} pageSavedMovie={true} />
        )}
      </section>
    </Layout>
  );
}

export default SavedMovies;