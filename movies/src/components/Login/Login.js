import './Login.css';
import FormInput from "../FormInput/FormInput";

function Login() {

  return (
    <div className='login'>
      <FormInput
        link='/signup'
        greeting='Рады видеть!'
        buttonName='Войти'
        question='Ещё не зарегистрированы?'
        linkName='Регистрация'
      />
    </div>
  );
}

export default Login;