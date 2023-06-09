import './SearchForm.css';
import {useEffect, useState} from 'react';

function SearchForm({filterDuration, filterEnabled, searchFilter, applySearchFilter}) {
  const [inputValue, setInputValue] = useState(searchFilter);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    applySearchFilter(event);
  };

  useEffect(() => {
    setInputValue(searchFilter);
  }, [searchFilter]);

  return (
    <div className="searchform">
      <form className="searchform__form" onSubmit={ handleSubmit }>
        <input className="searchform__input" type="text" value={ inputValue || "" }
          // onChange={(e) => {applySearchFilter(e.target.value)}}
               onChange={ (e) => {
                 return handleInputChange(e);
               } }
               placeholder="Фильм" required/>
        <span className="searchform__error"></span>
        <button className="searchform__search" type="submit">Найти</button>
      </form>
      <div className="searchform__filter-box">
        <label className={ "searchform__filter" + (filterEnabled ? ' searchform__filter_active ' : ' ') }>
          <input className="searchform__radio" type="radio" onClick={ filterDuration }/>
          <span className="searchform__switch"></span>
        </label>
        <p className="searchform__filter-name">Короткометражки</p>
      </div>
    </div>
  );
}

export default SearchForm;
