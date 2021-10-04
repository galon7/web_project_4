import { Popup } from "./Popup.js";
import { userInfo } from "./index.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmission) {
    super(popupSelector);
    this._formSubmission = formSubmission;
  }

  _getInputValues() {
    if (this._popup.className === "modal modal_type_edit-profile") {
      const data = userInfo.getUserInfo();
      document.querySelector(".modal__input_field_name").value = data.name;
      document.querySelector(".modal__input_field_profession").value = data.job;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector(".modal__form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this._formSubmission();
      });
  }

  close = () => {
    this._popup.querySelector(".modal__form").reset();
    super.close();
  };

  open = () => {
    this._getInputValues();
    super.open();
  };
}
