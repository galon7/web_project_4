export const imgModal = document.querySelector(".modal_img");
export const imageModal = imgModal.querySelector(".modal__image");

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export function openModalWindow(modalWindow) {
  modalWindow.classList.add("modal_open");
  document.addEventListener("keydown", closeOnEsc);
  modalWindow.addEventListener("mousedown", closeOnClickOutside);
}

export function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_open");
    closeModalWindow(openModal);
  }
}

export function closeOnClickOutside(evt) {
  if (evt.target === evt.currentTarget) {
    closeModalWindow(evt.currentTarget);
  }
}

export function closeModalWindow(modalWindow) {
  modalWindow.classList.remove("modal_open");
  document.removeEventListener("keydown", closeOnEsc);
  modalWindow.removeEventListener("mousedown", closeOnClickOutside);
}
