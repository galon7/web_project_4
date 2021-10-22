import { deleteCardModal } from "../pages/index.js";

export class Card {
  constructor(item, cardSelector, handleCardClick, handleLike) {
    this._text = item.name;
    this._link = item.link;
    this._alt = item.name;
    this._likes = item.likes;
    this._likesNum = item.likes.length;
    this._userId = item.userID;
    this._ownerId = item.owner._id;
    this._photoId = item._id;
    this._cardTemplate = document
      .querySelector("#elements-item")
      .content.querySelector(cardSelector);
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
  }

  _checkIfLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _renderLikes() {
    this._likeDgt = this._element.querySelector(".elements__like-number");
    this._likeDgt.textContent = this._likesNum;
    const checkLike = this._checkIfLiked();
    if (checkLike) {
      this._likeBtn.classList.add("elements__like-button_pressed");
    } else {
      this._likeBtn.classList.remove("elements__like-button_pressed");
    }
  }

  _toggleLikeBtn() {
    this._likeBtn.classList.toggle("elements__like-button_pressed");
  }

  _addEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._toggleLikeBtn();
      this._handleLike();
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

  updateLikes(data) {
    this._likes = data;
    this._likesNum = data.length;
    this._renderLikes();
  }

  createCard() {
    this._element = this._cardTemplate.cloneNode(true);
    this._likeBtn = this._element.querySelector(".elements__like-button");
    this._deleteBtn = this._element.querySelector(".elements__delete-button");
    if (this._ownerId !== this._userId) {
      this._deleteBtn.remove();
    }

    this._renderLikes();

    this._image = this._element.querySelector(".elements__img");
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._element.querySelector(".elements__title").textContent = this._text;

    this._addEventListeners();

    return this._element;
  }
}
