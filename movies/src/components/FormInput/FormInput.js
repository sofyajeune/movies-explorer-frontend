import './FormInput.css';
import { Link } from 'react-router-dom';
import Logo from "../Logo/Logo";

function FormInput({
  type,
  link,
  greeting,
  buttonName,
  question,
  linkName,
  handleSubmit,
  handleChange,
  errors,
  isValid
}) {
  return (
    <section className='forminput'>
      <div className='forminput__zone'>
        <Logo />
        <h2 className='forminput__title'>{greeting}</h2>
        <form className='forminput__form' onSubmit={handleSubmit}>
          {type === 'signup' && (
            <label className='forminput__label'>Имя
              <input
                id='name'
                type='text'
                className='forminput__input'
                name='name'
                minLength='2'
                maxLength='30'
                required
                onChange={handleChange}
              />
              <span className='forminput__total-error'>{errors.name}
              </span>
            </label>
          )}
          <label className='forminput__label'>E-mail
            <input
              id='email'
              type='email'
              className='forminput__input'
              name='email'
              minLength='2'
              maxLength='30'
              required
              onChange={handleChange}
            />
            <span className='forminput__total-error'>{errors.email}
            </span>
          </label>
          <label className='forminput__label'>Пароль
            <input
              id='password'
              type='password'
              className='forminput__input'
              name='password'
              minLength='4'
              maxLength='20'
              required
              onChange={handleChange}
            />
            <span className='forminput__total-error'>{errors.password}
            </span>
          </label>

          <button
            className='forminput__submit-button app__link'
            type='submit'
            disabled={!isValid}
          >{buttonName}
          </button>
          <p className='forminput__subtitle'>{question}
            <Link to={link} className='forminput__link app__link'>{linkName}</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default FormInput;
