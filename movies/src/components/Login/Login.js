import './Login.css';
import FormInput from "../FormInput/FormInput";
import useFormAndValidation from '../../hooks/useFormAndValidation'

function Login({ handleLogin }) {

  const { handleChange, errors, formValue } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(formValue.password, formValue.email);
    formValue.password = "";
    formValue.email = "";
  }

  return (
    <div className='login'>
      <FormInput
        link='/signup'
        greeting='Рады видеть!'
        buttonName='Войти'
        question='Ещё не зарегистрированы?'
        linkName='Регистрация'
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
      />
    </div>
  );
}

export default Login;