import './Register.css';
import FormInput from '../FormInput/FormInput';
import useFormAndValidation from '../../hooks/useFormAndValidation'

function Register({ register }) {


  const { handleChange, errors, formValue } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    register(formValue.password, formValue.email, formValue.name);
    formValue.password = "";
    formValue.email = "";
    formValue.name = "";
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