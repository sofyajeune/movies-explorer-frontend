import './Techs.css';

function Techs() {

  return (
    <section className='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__info'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs__list'>
        <li className='techs__step'>HTML</li>
        <li className='techs__step'>CSS</li>
        <li className='techs__step'>JS</li>
        <li className='techs__step'>React</li>
        <li className='techs__step'>Git</li>
        <li className='techs__step'>Express.js</li>
        <li className='techs__step'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;