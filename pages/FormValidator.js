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

  _toggleButtonState() {
    const isValid = this._inputs.every((input) => input.validity.valid);

    if (isValid) {
      this._button.disabled = false;
      this._button.classList.remove(this._settings.inactiveButtonClass);
    } else {
      this._button.disabled = "disabled";
      this._button.classList.add(this._settings.inactiveButtonClass);
    }
  }

  _showError(input) {
    const error = input.validationMessage;
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = error;

    input.classList.add(this._settings.inputErrorClass);
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";

    input.classList.remove(this._settings.inputErrorClass);
  }

  _resetValidation() {
    this._toggleButtonState();

    this._inputs.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputs = [
      ...this._form.querySelectorAll(this._settings.inputSelector),
    ];
    this._button = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    this._inputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkValidity(input);
        this._toggleButtonState();
      });
    });

    this._resetValidation();
  }
}
