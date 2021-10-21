import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(data) {
    this._popup.querySelector(".modal__image").src = data.link;
    this._popup.querySelector(".modal__image").alt = data.name;
    this._popup.querySelector(".modal__caption").textContent = data.name;
    super.open();
  }
}
