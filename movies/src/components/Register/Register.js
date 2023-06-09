import './Register.css';
import FormInput from '../FormInput/FormInput';
import useFormAndValidation from '../../hooks/useFormAndValidation'

function Register({ handleRegister }) {
  const { handleChange, errors, formValue } = useFormAndValidation();

  function handleSubmit(event) {
    event.preventDefault();
    handleRegister(formValue.password, formValue.email, formValue.name);
    // formValue.password = "";
    // formValue.email = "";
    // formValue.name = "";
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
      errors={errors} />
  )
}

export default Register;
