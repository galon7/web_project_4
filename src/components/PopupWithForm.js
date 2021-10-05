import { Popup } from "./Popup.js";
import { userInfo } from "../pages/index.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._popup.querySelector(".modal__form");
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
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }

  close = () => {
    this._formElement.reset();
    super.close();
  };

  open = () => {
    this._getInputValues();
    super.open();
  };
}
