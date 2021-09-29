import { imgModal, imageModal, openModalWindow } from "./utils.js";

export class Card {
  constructor(item, cardSelector) {
    this._text = item.name;
    this._link = item.link;
    this._cardTemplate = cardSelector;
  }

  _toggleLikeBtn() {
    this._likeBtn.classList.toggle("elements__like-button_pressed");
  }

  _addEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._toggleLikeBtn(this._likeBtn);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });

    this._image.addEventListener("click", () => {
      openModalWindow(imgModal);
      imageModal.src = this._link;
      imgModal.querySelector(".modal__caption").textContent = this._text;
    });
  }

  returnCard() {
    this._element = this._cardTemplate.cloneNode(true);

    this._likeBtn = this._element.querySelector(".elements__like-button");
    this._deleteBtn = this._element.querySelector(".elements__delete-button");
    this._image = this._element.querySelector(".elements__img");

    this._image.src = this._link;
    this._image.alt = this._text;
    this._element.querySelector(".elements__title").textContent = this._text;

    this._addEventListeners();

    return this._element;
  }
}
