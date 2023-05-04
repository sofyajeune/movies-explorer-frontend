import './AboutMe.css';
import avatar from '../../images/avatar.jpg';


function AboutMe() {

  return (
    <section className='aboutme'>
      <h2 className='aboutme__title'>Студент</h2>
      <article className='aboutme__info-container'>
        <div className='aboutme__text-container'>
          <h3 className='aboutme__name'>Софья</h3>
          <p className='aboutme__subtitle'>Фронтенд-разработчик, 27 лет</p>
          <p className='aboutme__text'>Я родилась и живу в Москве. Закончила философский факультет РГГУ с восточным профилем. Практиковалась в Китае. Увлекаюсь праворукими машинами, фотографией и музыкой. Также я делаю свечи из растительного воска и люблю книги Макса Фрая. После окончания курса в Я.Практикуме планирую найти работу в IT сфере и продолжать кодить в своё удовольствие.
          </p>
          <ul className='aboutme__contacts'>
            <li className='aboutme__contact'>
              <a className='aboutme__link' href='https://github.com/sofyajeune' target='_blank' rel='noopener noreferrer'>Github</a>
            </li>
          </ul>
        </div>
        <div className='aboutme__photo-container'>
          <img className='aboutme__photo' src={avatar} alt='Фото студента' />
        </div>
      </article>
    </section>
  );
}

export default AboutMe;
