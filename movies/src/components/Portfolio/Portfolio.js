import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {

    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <li className="portfolio__links-item">
                    <a className="portfolio__link" href='https://github.com/sofyajeune/how-to-learn' target='_blank' rel='noopener noreferrer' >Статичный сайт</a>
                    <a className="portfolio__link" href='https://github.com/sofyajeune/how-to-learn' target='_blank' rel='noopener noreferrer' ><img className='portfolio__arrow' src={arrow} alt='Стрелочка' /></a>
                </li>
                <li className="portfolio__links-item">         <a className="portfolio__link" href='https://sofyajeune.github.io/yet-another-project-sofya/' target='_blank' rel='noopener noreferrer' >Адаптивный сайт</a>
                    <a className="portfolio__link" href='https://sofyajeune.github.io/yet-another-project-sofya/' target='_blank' rel='noopener noreferrer' ><img className='portfolio__arrow' src={arrow} alt='Стрелочка' /></a></li>
                <li className="portfolio__links-item">
                    <a className="portfolio__link" href='https://sofyajeune.github.io/mesto/' target='_blank' rel='noopener noreferrer' >Одностраничное приложение</a>
                    <a className="portfolio__link" href='https://sofyajeune.github.io/mesto/' target='_blank' rel='noopener noreferrer' ><img className='portfolio__arrow' src={arrow} alt='Стрелочка' /></a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;