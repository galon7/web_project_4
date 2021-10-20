import { cardList } from "../pages/index.js";

export class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editProfile(user) {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(user),
    }).catch((err) => {
      console.log(err);
    });
  }

  addCardApi(card, modal) {
    fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        modal.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(photoId) {
    fetch(`${this._baseUrl}/cards/${photoId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  like(photoId) {
    fetch(`${this._baseUrl}/cards/likes/${photoId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  unlike(photoId) {
    fetch(`${this._baseUrl}/cards/likes/${photoId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  updateAvatar(avatar, modal) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        modal.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
