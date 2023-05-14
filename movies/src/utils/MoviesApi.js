class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;

        this.__checkResponse = (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        };
    }

    getMovies() {
        return fetch(this._baseUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(this.__checkResponse);
    }
}

export const MoviesApi = new Api({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});