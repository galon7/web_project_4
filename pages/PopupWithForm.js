import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmission) {
    super(popupSelector);
    this._formSubmission = formSubmission;
  }

  _getInputValues() {}

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector(".modal__form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this._formSubmission();
      });
  }

  close() {
    super.close();
  }

  open() {
    super.open();
    this._popup.querySelector(".modal__form").reset();
  }
}
