class Api {
  constructor(options) {
    this.link = options.link;
    this.headers = options.headers;
  };

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${ res.status }`);
  };

  async getMovies() {
    console.log('Getting movies');
    return await fetch(`${ this.link }`, {
      method: "GET",
      headers: this.headers,
    })
      .then(this._handleResponse);
  }
}


const options = {
  link: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    Origin: {
      'Content-Type': 'application/json',
    },
  },
};

export const MoviesApi = new Api(options);
