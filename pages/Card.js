import { imgModal, imageModal, openModalWindow } from "./utils.js";

export class Card {
  constructor(item) {
    this._text = item.name;
    this._link = item.link;
    this._cardTemplate = document
      .querySelector("#elements-item")
      .content.querySelector(".elements__item");
  }

  _toggleLikeBtn(element) {
    element.classList.toggle("elements__like-button_pressed");
  }

  _addEventListeners(likeBtn, deleteBtn, image) {
    likeBtn.addEventListener("click", () => {
      this._toggleLikeBtn(likeBtn);
    });

    deleteBtn.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });

    image.addEventListener("click", () => {
      openModalWindow(imgModal);
      imageModal.src = this._link;
      imgModal.querySelector(".modal__caption").textContent = this._text;
    });
  }

  returnCard() {
    this._element = this._cardTemplate.cloneNode(true);

    const likeBtn = this._element.querySelector(".elements__like-button");
    const deleteBtn = this._element.querySelector(".elements__delete-button");
    const image = this._element.querySelector(".elements__img");

    image.src = this._link;
    this._element.querySelector(".elements__title").textContent = this._text;

    this._addEventListeners(likeBtn, deleteBtn, image);

    return this._element;
  }
}
