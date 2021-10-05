export class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._text = item.name;
    this._link = item.link;
    this._alt = item.name;
    this._cardTemplate = document
      .querySelector("#elements-item")
      .content.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick();
    });
  }

  createCard() {
    this._element = this._cardTemplate.cloneNode(true);

    this._likeBtn = this._element.querySelector(".elements__like-button");
    this._deleteBtn = this._element.querySelector(".elements__delete-button");
    this._image = this._element.querySelector(".elements__img");

    this._image.src = this._link;
    this._image.alt = this._alt;
    this._element.querySelector(".elements__title").textContent = this._text;

    this._addEventListeners();

    return this._element;
  }
}
