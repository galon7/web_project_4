export class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
  // if the server returns an error, reject the promise
  //return Promise.reject(`Error: ${res.status}`);

  //     .then((data) => {
  //       console.log(data);
  //     });
  // }

  // other methods for working with the API
}
