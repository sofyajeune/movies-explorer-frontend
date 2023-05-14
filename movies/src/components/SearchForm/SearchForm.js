import { useEffect } from "react";
import "./SearchForm.css";

function SearchForm({props, pageSavedMovie}) {
  const {
    setActiveShowAllMovies,
    errorSpan,
    setErrorSpan,
    checkbox, 
    setCheckbox,
    isFiltered,
    formValue, 
    setFormValue,
    handleFilteredMovies, 
    handleCheckboxFiltered,
  } = props;

  const switcherClassName = `searchform__checkbox-switcher ${
    checkbox && "searchform__checkbox-switcher_active"
  }`;
  const buttonCheckboxClassName = `searchform__checkbox-button ${
    checkbox && "searchform__checkbox-button_active"
  }`;


  useEffect(() => {
    if (localStorage.getItem("formValue") && !pageSavedMovie) {
      const value = JSON.parse(localStorage.getItem("formValue"))
      setFormValue(value);
    }
  }, []);

  useEffect(() => {
    if(localStorage.getItem("checkbox") &&! pageSavedMovie) {
      const checkbox = JSON.parse(localStorage.getItem("checkbox"));
      setCheckbox(checkbox)
    }
  }, []);

  function handleChange(e) {
    setFormValue(e.target.value);
    setErrorSpan("");
  }

  function handleCheckboxChange() {
    if(isFiltered && !pageSavedMovie) {
      setCheckbox(!checkbox);
      handleCheckboxFiltered(!checkbox)
      localStorage.setItem('checkbox', JSON.stringify(!checkbox));
      console.log("")
    } else {
      setCheckbox(!checkbox);
      handleCheckboxFiltered(!checkbox)
    }
  }

  function handelSortSubmit(e) {
    e.preventDefault();
    !pageSavedMovie && setActiveShowAllMovies(true);
    if (!e.target.closest("form").checkValidity()) {
      setErrorSpan("Поле не должно быть пустым");
      return;
    }
    handleFilteredMovies(formValue, checkbox)
  }

  return (
    <section className="searchform">
      <form onSubmit={handelSortSubmit} noValidate>
        <div className="searchform__input-container">
          <input
            className="searchform__input"
            placeholder="Найдите фильм"
            type="text"
            required
            name="movie"
            minLength="1"
            value={formValue || ""}
            onChange={handleChange}
          />
          <button
            className={"searchform__button button-hover"}
            type="submit"
            aria-label="Кнопка найти"
            disabled={errorSpan}
          >
            Найти
          </button>
        </div>
        <span className="form__text-error">{errorSpan}</span>
      </form>
      <label className="searchform__checkbox">
        <input
          className={switcherClassName}
          type="checkbox"
          checked={checkbox}
          onChange={handleCheckboxChange}
        />
        <button
          className={buttonCheckboxClassName}
          type="button"
          aria-label="поиск по короткометражкам"
        />
        <p className="searchform__checkbox-name">Короткометражки</p>
      </label>
    </section>
  );
}

export default SearchForm;