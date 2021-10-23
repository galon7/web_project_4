export class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  editProfile(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(user),
    }).then(this._getResponseData);
  }

  addCardApi(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then(this._getResponseData);
  }

  deleteCard(photoId) {
    return fetch(`${this._baseUrl}/cards/${photoId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  like(photoId) {
    return fetch(`${this._baseUrl}/cards/likes/${photoId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  unlike(photoId) {
    return fetch(`${this._baseUrl}/cards/likes/${photoId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._getResponseData);
  }
}
