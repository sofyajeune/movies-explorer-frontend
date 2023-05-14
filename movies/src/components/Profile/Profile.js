import './Profile.css';
import Layout from "../Layout/Layout";
import React from 'react';
import { useEffect, useState } from "react";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import { Link } from "react-router-dom";
import './Profile.css';

function Profile(props) {

    const { onOpenBurger, currentUser, onUpdateUser, Exit } = props;
    const { handleChange, errors, formValue, setFormValue } = useFormAndValidation();
    const [isInputEdit, setIsInputEdit] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: formValue.name,
            email: formValue.email,
        });
        setIsInputEdit(!isInputEdit);
    }
    //current
    useEffect(() => {
        setFormValue({
            ...formValue,
            name: currentUser.name,
            email: currentUser.email,
        });
    }, [currentUser]);

    const saveButton = isInputEdit
        ? "profile__save-buttons"
        : "profile__save-buttons_active";

    const changeButton = isInputEdit
        ? "profile__change_active profile__button"
        : "profile__change profile__button";

    const buttonDisables =
        errors.email || errors.name ||
        (currentUser.email === formValue.email && currentUser.name === formValue.name);

    const buttonClassName = `profile__save-button_form profile__save-button ${buttonDisables ? "profile__save-button_form_disabled" : "profile__button-hover"
        }`;

    return (
        <Layout className="header header_white" isLoggedIn page={false} onOpenBurger={onOpenBurger}>
            <section className='profile'>
                <div className='profile__section'>
                    <div className='profile__container'>
                        <h2 className='profile__greeting'>Привет, {currentUser.name}!</h2>
                        <form className='profile__form' onSubmit={handleSubmit} noValidate>
                            <label className='profile__label'>Имя
                                <input
                                    readOnly={isInputEdit}
                                    id="name"
                                    className="profile__input"
                                    name="name"
                                    type="text"
                                    value={formValue.name || ''}
                                    minLength="2"
                                    onChange={handleChange}
                                />
                                <span id="name-error" className='profile__error'>{errors.name}
                                </span>
                            </label>
                            <label className='profile__label'>Email
                                <input
                                    readOnly={isInputEdit}
                                    id="email"
                                    className="profile__input"
                                    name="email"
                                    type="email"
                                    value={formValue.email || ''}
                                    minLength="2"
                                    onChange={handleChange}
                                />
                                <span id='email-error' className='profile__error'>{errors.email}
                                </span>
                            </label>
                            <>
                                <button
                                    className={changeButton}
                                    type="submit"
                                    aria-label="Редактировать информацию о себе"
                                >
                                    Редактировать
                                </button>
                                <Link to="/"
                                    className='profile__button profile__exit app__link'
                                    type="button"
                                    aria-label=""
                                    onClick={Exit}
                                >
                                    Выйти из аккаунта
                                </Link>
                                <div className={saveButton}>
                                    <button className={buttonClassName} disabled={buttonDisables}>
                                        Сохранить
                                    </button>
                                </div>
                            </>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Profile;