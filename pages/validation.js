function showError(input, settings) {
  const error = input.validationMessage;
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = error;

  input.classList.add(settings.inputErrorClass);
}

function hideError(input, settings) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = "";

  input.classList.remove(settings.inputErrorClass);
}

function checkValidity(input, settings) {
  if (input.validity.valid) {
    hideError(input, settings);
  } else {
    showError(input, settings);
  }
}

function toggleButtonState(inputs, button, settings) {
  const isValid = inputs.every(function (input) {
    return input.validity.valid;
  });

  if (isValid) {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  } else {
    button.disabled = "disabled";
    button.classList.add(settings.inactiveButtonClass);
  }
}

function enableValidation(settings) {
  const forms = [...document.querySelectorAll(settings.formSelector)];

  forms.forEach(function (form) {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputs = [...form.querySelectorAll(settings.inputSelector)];
    const button = form.querySelector(settings.submitButtonSelector);

    inputs.forEach(function (input) {
      input.addEventListener("input", function (evt) {
        checkValidity(input, settings);
        toggleButtonState(inputs, button, settings);
      });
    });
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
