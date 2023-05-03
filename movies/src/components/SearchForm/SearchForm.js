import './SearchForm.css';

function SearchForm() {

    return (
        <div className='searchform'>
            <form className='searchform__form'>
                <input className='searchform__input' type='text' placeholder='Фильм' required />
                <span className='searchform__error'></span>
                <button className='searchform__search' type='submit'>Найти</button>
            </form>
            <div className='searchform__filter-box'>
                <label className="searchform__filter searchform__filter_active">
                    <input className='searchform__radio' type='radio' />
                    <input className='searchform__radio' type='radio' />
                    <span className='searchform__switch'></span>
                </label>
                <p className='searchform__filter-name'>Короткометражки</p>
            </div>
        </div>
    );
}

export default SearchForm;