import './Promo.css';
import logoCircles from '../../images/logo-circles.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__logo" src= {logoCircles} alt="логотип с рисованными кругами" />
    </section>
  );
}

export default Promo;