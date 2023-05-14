import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader"
import Layout from "../Layout/Layout"

function Movies(props) {
    const { onOpenBurger, isLoading } = props;

    return (
        <Layout className="header header_white" isLoggedIn page onOpenBurger={onOpenBurger}>
            <main className="movies">
                <SearchForm props={props} pageSavedMovie={false} />
                {isLoading ? (
                    <Preloader />
                ) : (
                    <MoviesCardList props={props} pageSavedMovie={false} />
                )}
            </main>
        </Layout>
    );
}

export default Movies;

// // SearchForm — форма поиска, куда пользователь будет вводить запрос. 
// Обратите внимание на фильтр с чекбоксом «Только короткометражки». 
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
// // Preloader — отвечает за работу прелоадера.
// // MoviesCardList — компонент, который управляет 
// отрисовкой карточек фильмов на страницу и их количеством.
// // MoviesCard — компонент одной карточки фильма.