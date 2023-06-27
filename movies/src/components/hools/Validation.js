import { useState } from "react";

function Validation() {
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

export default Validation;