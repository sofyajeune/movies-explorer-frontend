import './Register.css';
import FormInput from '../FormInput/FormInput';


function Register() {

  return (
    <FormInput
      type='signup'
      link='/signin'
      greeting='Добро пожаловать!'
      buttonName='Зарегистрироваться'
      question='Уже зарегестрированы?'
      linkName='Войти' />
  )
}

export default Register;