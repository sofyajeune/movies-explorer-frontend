import './Register.css';
import FormInput from '../FormInput/FormInput';
import useFormAndValidation from '../../hooks/useFormAndValidation'

function Register({ handleRegister }) {
  const { handleChange, errors, formValue, isValid } = useFormAndValidation();
  function handleSubmit(event) {
    console.log("SUBMIT")
    event.preventDefault();
    handleRegister(formValue.password, formValue.email, formValue.name);
  }

  return (
    <FormInput
      type='signup'
      link='/signin'
      greeting='Добро пожаловать!'
      buttonName='Зарегистрироваться'
      question='Уже зарегистрированы?'
      linkName='Войти'
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={errors}
      isValid={isValid}/>
  )
}

export default Register;
