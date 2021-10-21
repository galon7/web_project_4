import { deleteCardModal, api } from "../pages/index.js";

export class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._text = item.name;
    this._link = item.link;
    this._alt = item.name;
    this._likeState = false;
    this._likes = item.likes.length;
    this._userId = item.userID;
    this._ownerId = item.owner._id;
    this._photoId = item._id;
    this._cardTemplate = document
      .querySelector("#elements-item")
      .content.querySelector(cardSelector);
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _toggleLikeBtn() {
    if (!this._likeState) {
      this._likeBtn.classList.add("elements__like-button_pressed");
      this._likeState = true;
      api.like(this._photoId);
      this._likes++;
    } else {
      this._likeBtn.classList.remove("elements__like-button_pressed");
      this._likeState = false;
      api.unlike(this._photoId);
      this._likes--;
    }
    this._likeNum.textContent = this._likes;
  }

  _addEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._toggleLikeBtn(this._likeBtn);
    });

    this._deleteBtn.addEventListener("click", (e) => {
      deleteCardModal.id = this._photoId;
      deleteCardModal.open();
      const _removeElement = () => {
        this._element.remove();
        this._element = null;
      };
      deleteCardModal.removeElement = _removeElement;
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  createCard() {
    this._element = this._cardTemplate.cloneNode(true);
    this._likeBtn = this._element.querySelector(".elements__like-button");
    this._deleteBtn = this._element.querySelector(".elements__delete-button");
    if (this._ownerId !== this._userId) {
      this._deleteBtn.remove();
    }
    this._image = this._element.querySelector(".elements__img");
    this._likeNum = this._element.querySelector(".elements__like-number");

    this._likeNum.textContent = this._likes;
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._element.querySelector(".elements__title").textContent = this._text;

    this._addEventListeners();

    return this._element;
  }
}
