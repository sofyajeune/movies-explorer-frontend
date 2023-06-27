export const BASE_URL = 'https://api.sofyajeune.films.nomoredomains.monster';

function handleResponse(res) {
    if (res.ok) {
        return res.json();

    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const register = async (password, email, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email, name })
    })
        .then((res) => {
            return handleResponse(res)
        })
};

export const login = async (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((res) => {
            return handleResponse(res)
        })
};
