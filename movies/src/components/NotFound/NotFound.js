import { Link } from "react-router-dom";
import './NotFound.css';

function PageNotFound() {


    return (
        <section className='notfound'>
            <div className='notfound__info'>
                <h2 className='notfound__title'>404</h2>
                <p className='notfound__subtitle'>Страница не найдена</p>
            </div>
            <Link to="/" className='notfound__link app__link'>Назад</Link>
        </section>
    );
}

export default PageNotFound;