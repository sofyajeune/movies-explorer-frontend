import { Link } from "react-router-dom";
import "./NavTab.css"

function NavTab() {
    return (
        <section className="navtab">
            <Link to='/signup' className='menu__link'>Регистрация</Link>
            <Link to='/signin' className='menu__link menu__link_type_signin'>Войти</Link>
        </section>
    );
}

export default NavTab;