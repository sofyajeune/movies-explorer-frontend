import './Profile.css';
import Layout from "../Layout/Layout";
import React, {useEffect} from 'react';
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {api} from "../../utils/MainApi";
import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import MessagePopup from "../MessagePopup/MessagePopup";
import {checkEmail} from "../../hooks/useFormAndValidation";


function Profile({isLoggedIn, onOpenBurger, handleLogout}) {
  const {state, updateState} = useContext(CurrentUserContext);

  const defaultUserName = 'User'; //currentUserName
  const defaultEmail = 'example@mail.ru'; //currentUserMail

  const [userName, setUserName] = useState(defaultUserName);
  const [email, setEmail] = useState(defaultEmail);

  const [initialState, setInitialState] = useState({
    name: state.user.name,
    email: state.user.email,
  });

  const [isLoading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const [modifyEnabled, setModify] = useState(false);
  const [saveEnabled, setSave] = useState(false);

  const errorMessage = "Возникла ошибка";
  const errorDescription = "Попробуйте повторить попытку позже";

  const successMessage = "Отлично!";
  const successDescription = "Ваши данные успешно обновлены";

  const [popUpTitle, setPopUpTitle] = useState(errorMessage);
  const [popUpDescription, setPopUpDescription] = useState(errorDescription);

  function setPopUpSuccess() {
    setPopUpTitle(successMessage);
    setPopUpDescription(successDescription);
  }


  function setPopUpFailure() {
    setPopUpTitle(errorMessage);
    setPopUpDescription(errorDescription);
  }

  const [isPopupVisible, setIsPopupVisible] = useState(false);


  function successPopUp() {
    setPopUpSuccess();
    setIsPopupVisible(true);
  }

  function failurePopUp() {
    setPopUpFailure();
    setIsPopupVisible(true);
  }

  const handleClosePopup = () => {
    setIsPopupVisible(false); // Close the popup
  };

  const [formValue, setFormValue] = useState({
    name: state.user.name,
    email: state.user.email,
  });

  const toggleEnableModify = () => {
    setModify(!modifyEnabled);
  };


  function testEmail(email) {
    if (!checkEmail(email)) {
      setErrors({
        ...errors,
        email: "Неправильная почта!",
      });
      return false;
    } else {
      setErrors({
        ...errors,
        email: null,
      });
      return true;
    }
  }

  function testChange(username, email) {
    console.log(username, initialState['name']);
    return !(initialState['name'] === username &&
      initialState['email'] === email);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: e.target.validationMessage,
    });

    setIsValid(e.target.closest('form').checkValidity());
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSave(false);
    setModify(false);//block
    api.setUserInfo(formValue).then((r) => {
      setModify(false);
      setInitialState({
        name: formValue.name,
        email: formValue.email,
      });
      updateState({
        user: {
          name: formValue.name,
          email: formValue.email,
        },
      });
      successPopUp();
    }).catch((e) => {
      console.error(e);
      failurePopUp();
    });
  };

  async function getUserProfile() {
    return api.getUserInfo().then(d => {
      updateState({
        user: {
          name: d.data.name,
          email: d.data.email,
        },
      });
      setUserName(d.data.name);
      setEmail(d.data.email);
      setFormValue({
        name: d.data.name,
        email: d.data.email,
      });
    }).catch((e) => {
      console.error(e);
      failurePopUp();
    });
  }

  // getUserProfile()
  useEffect(() => {
    getUserProfile().then(() => {
      setLoading(false);
    }).catch((e) => {
      console.error(e);
      failurePopUp();
    });
  }, []);

  useEffect(() => {
    if (testEmail(formValue.email) && testChange(formValue.name, formValue.email)) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [formValue]);

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="header header_white" isLoggedIn page={ false } onOpenBurger={ onOpenBurger }>
      { isPopupVisible && (<MessagePopup onClose={ handleClosePopup }
                                         title={ popUpTitle }
                                         description={ popUpDescription }
      />) }
      <section className="profile">
        <div className="profile__section">
          <div className="profile__container">
            <h2 className="profile__greeting">{ `Привет, ${ initialState.name }!` }</h2>
            <form className="profile__form" onSubmit={ handleSubmit }>
              <label className="profile__label">Имя
                <input
                  // value={formValue.name}
                  value={ formValue.name }
                  // defaultValue={ userName }
                  disabled={ !modifyEnabled }
                  type="text"
                  placeholder="name"
                  className="profile__input"
                  name="name"
                  required
                  id="name"
                  onChange={ handleChange }
                />
                <span id="name-error" className="profile__error">{ errors.name }
                </span>
              </label>
              <label className="profile__label">Email
                <input
                  // value={formValue.email || 'example@mail.ru'}
                  value={ formValue.email }
                  // defaultValue={ email }
                  type="email"
                  disabled={ !modifyEnabled }
                  className="profile__input"
                  name="email"
                  required
                  id="email"
                  onChange={ handleChange }
                />
                <span id="email-error" className="profile__error">{ errors.email }
                </span>
              </label>
              <>
                <button
                  className={ `profile__button profile__change app__link ${ modifyEnabled ? 'enabled' : null }` }
                  type="button"
                  onClick={ toggleEnableModify }
                >
                  Редактировать
                </button>
                <Link
                  className="profile__button profile__exit app__link"
                  type="button" onClick={ () => {
                  handleLogout();
                  return navigate('/');
                } }
                >
                  Выйти из аккаунта
                </Link>
                <button
                  className={ `profile__save-button_form ${ saveEnabled ? "" : "profile__save-button_form_disabled" }` } //здесь надо менять класс в зависимости от того, нажата ли кнопка редактировать или нет, активное состояние - класс profile__save-button
                  disabled={ !saveEnabled }
                  type="submit"
                >
                  Сохранить
                </button>
              </>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
