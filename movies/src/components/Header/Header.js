import './Header.css';
import Logo from '../Logo/Logo';
import NavTab from '../NavTab/NavTab';
import Navigation from '../Navigation/Navigation';


function Header({ onOpenBurger, isLoggedIn, className }) {

  return (
    <header className={className}>
      <Logo />
      {isLoggedIn ? <Navigation onOpenBurger={onOpenBurger} /> : <NavTab />}
    </header>
  );
}

export default Header;
