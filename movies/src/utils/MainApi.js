class Api {
    constructor({ URL }) {
        this._URL = URL;

        this.__handleResponse = (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        };

        this.__checkResponse = (res) => {
            return res.json();
        }
    }

    async getUserInfo() {
        const token = localStorage.getItem('jwt');
        return fetch(this._URL + `/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(this.__handleResponse);
    }

    async setUserInfo(userInformaiton) {
        return fetch(this._URL + '/users/me', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInformaiton)
        })
            .then(this.__handleResponse);
    }

    async saveMovies(movie) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._URL}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                nameEN: movie.nameEN,
                nameRU: movie.nameRU,
            })
        }).then(this.__checkResponse);
    }

    async getSavedMovies() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._URL}/movies`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(this.__handleResponse);
    }

    async deleteMovies(movieId) {
        const token = localStorage.getItem('jwt');
        return fetch(this._URL + '/movies/' + movieId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(this.__handleResponse);
    }
}

export const api = new Api({
    URL: 'https://api.sofyajeune.films.nomoredomains.monster'
});
