import './Footer.css';

function Footer({page}) {

    return (
        page &&
        <footer className="footer">
            <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className="footer__container">
                <p className="footer__copyright">© {new Date().getFullYear()}</p>
                <ul className="footer__signature">
                    <li className="footer__links">
                        <a className="footer__link" href='https://praktikum.yandex.ru' target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</a>
                    </li>
                    <li className="footer__links">
                        <a className="footer__link" href='https://github.com/yandex-praktikum' target='_blank' rel='noopener noreferrer'>Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;