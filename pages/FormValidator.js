export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _checkValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _toggleButtonState(inputs, button) {
    const isValid = inputs.every((input) => input.validity.valid);

    if (isValid) {
      button.disabled = false;
      button.classList.remove(this._settings.inactiveButtonClass);
    } else {
      button.disabled = "disabled";
      button.classList.add(this._settings.inactiveButtonClass);
    }
  }

  _showError(input) {
    const error = input.validationMessage;
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = error;

    input.classList.add(this._settings.inputErrorClass);
  }

  _hideError(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";

    input.classList.remove(this._settings.inputErrorClass);
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputs = [
      ...this._form.querySelectorAll(this._settings.inputSelector),
    ];
    const button = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    inputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkValidity(input);
        this._toggleButtonState(inputs, button);
      });
    });
  }
}
