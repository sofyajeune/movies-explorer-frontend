import { Link } from 'react-router-dom';
import './Logo.css';
import logomovies from '../../images/logomovies.svg';


function Logo() {

  return (
    <Link to='/' className='logo'>
      <img className='logo__picture' src={logomovies} alt='Логотип приложения' />
    </Link>
  );
}

export default Logo;