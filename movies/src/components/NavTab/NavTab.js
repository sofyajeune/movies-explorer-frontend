import { Link } from "react-router-dom";
import "./NavTab.css"

function NavTab() {
    return (
        <section className="navtab">
            <Link to='/signup' className='navtab__menulink'>Регистрация</Link>
            <Link to='/signin' className='navtab__menulink navtab__menulink_type_signin'>Войти</Link>
        </section>
    );
}

export default NavTab;