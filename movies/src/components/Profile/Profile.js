import './Profile.css';
import Layout from "../Layout/Layout";
import React from 'react';
import { useState } from "react";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import { Link } from "react-router-dom";


function Profile({ isLoggedIn, onOpenBurger }) {

    const userName = 'Софья' //currentUserName
    // const email = 'example@mail.ru' //currentUserMail

    const { handleChange, errors, formValue } = useFormAndValidation();
    const [isInputEdit, setIsInputEdit] = useState(true);

    function handleEditClick(evt) {
        evt.preventDefault();
        setIsInputEdit(!isInputEdit);
    }

    return (
        <Layout className="header__white" isLoggedIn page={false} onOpenBurger={onOpenBurger}>
            <section className='profile'>
                <div className='profile__section'>
                    <div className='profile__container'>
                        <h2 className='profile__greeting'>{`Привет, ${userName}!`}</h2>
                        <form className='profile__form'>
                            <label className='profile__label'>Имя
                                <input
                                    value={formValue.name || 'Name'}
                                    type='text'
                                    className='profile__input'
                                    name='name'
                                    required
                                    id='name'
                                    onChange={handleChange}
                                />
                                <span id="name-error" className='profile__error'>{errors.name}
                                </span>
                            </label>
                            <label className='profile__label'>Email
                                <input
                                    value={formValue.email || 'example@mail.ru'}
                                    type='email'
                                    className='profile__input'
                                    name='email'
                                    required
                                    id='email'
                                    onChange={handleChange}
                                />
                                <span id='email-error' className='profile__error'>{errors.email}
                                </span>
                            </label>
                            <>
                                <button
                                    className={`profile__button profile__change app__link`}
                                    type='button' onClick={handleEditClick}
                                >
                                    Редактировать
                                </button>
                                <Link
                                    className='profile__button profile__exit app__link'
                                    type='button' to='/'
                                >
                                    Выйти из аккаунта
                                </Link>
                            </>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Profile;

//сделать валид