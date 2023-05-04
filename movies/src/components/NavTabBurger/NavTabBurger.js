import { NavLink } from "react-router-dom";
import "./NavTabBurger.css"

function NavTabBurger({ isOpen, onClose }) {

  const className = isOpen ? 'navtabburger navtabburger_active' : 'navtabburger';

  const classNameLink = ({ isActive }) => isActive ? "navtabburger__item-link navtabburger__item-link_active" : "navtabburger__item-link";

  return (
    <div className={className}>
      <ul className="navtabburger__list">
        <li className="navtabburger__item" onClick={onClose}>
          <NavLink className={classNameLink} to="/">Главная</NavLink>
        </li>
        <li className="navtabburger__item" onClick={onClose}>
          <NavLink className={classNameLink} to="/movies">Фильмы</NavLink>
        </li>
        <li className="navtabburger__item" onClick={onClose}>
          <NavLink to="/saved-movies" className={classNameLink}>Сохраненные фильмы</NavLink>
        </li>
      </ul>
      <NavLink to="/profile" className="navtabburger__profile-link">
        <p className="navtabburger__account">Аккаунт</p>
      </NavLink>
    </div>
  );
}

export default NavTabBurger;