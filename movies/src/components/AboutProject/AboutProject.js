import './AboutProject.css';


function AboutProject() {

  return (
    <section className='project'>
      <h2 className='project__title'>О проекте</h2>
      <div className='project__about'>
        <div className='project__description'>
          <h3 className='project__description-title'>Дипломный проект включал 5 этапов</h3>
          <p className='project__description-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='project__description'>
          <h3 className='project__description-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='project__description-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='project__time'>
        <p className='project__timeline project__timeline_one'>1 неделя</p>
        <p className='project__timeline project__timeline_four'>4 недели</p>
        <p className='project__timeline project__type'>Back-end</p>
        <p className='project__timeline project__type'>Front-end</p>
      </div>
  </section>
  );
}

export default AboutProject;