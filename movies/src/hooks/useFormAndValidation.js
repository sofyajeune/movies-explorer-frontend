import { useState } from "react";

function useFormAndValidation() {
    const [errors, setErrors] = useState({});
    const [formValue, setFormValue] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

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

    return { handleChange, errors, formValue, setFormValue, setErrors, isValid, setIsValid }
}

export default useFormAndValidation; 

// // Создаем отдельный файл useFormAndValidation.jsx, помещаем в папку hooks, которая в корне src
// import {useState, useCallback} from 'react';
 
// export function useFormAndValidation() {
//   const [ values, setValues ] = useState({});
//   const [ errors, setErrors ] = useState({});
//   const [ isValid, setIsValid ] = useState(true);
 
//   const handleChange = (e) => {
//     const {name, value} = e.target
//     setValues({...values, [name]: value });
//     setErrors({...errors, [name]: e.target.validationMessage});
//     setIsValid(e.target.closest('form').checkValidity());
//   };
 
 
 
//   const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
//     setValues(newValues);
//     setErrors(newErrors);
//     setIsValid(newIsValid);
//   }, [setValues, setErrors, setIsValid]);
 
//   return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
// }
 
// // Далее импортируем этот хук, куда нужно и запускаем валидацию одной строчкой
// const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()