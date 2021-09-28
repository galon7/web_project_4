import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  config,
  imgModal,
  openModalWindow,
  closeModalWindow,
} from "./utils.js";

const editBtn = document.querySelector(".profile__info-edit");
const addBtn = document.querySelector(".profile__add-button");

const editProfileModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");

const addCardBtn = addCardModal.querySelector(".modal__submit-button");
const modalTitle = document.querySelector(".modal__title");

const editCloseBtn = editProfileModal.querySelector(".modal__close");
const addCloseBtn = addCardModal.querySelector(".modal__close");
const imageCloseBtn = imgModal.querySelector(".modal__close");

const addCardForm = addCardModal.querySelector(".modal__form");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const title = document.querySelector(".modal__input_field_name");
const subtitle = document.querySelector(".modal__input_field_profession");

const cardTitle = document.querySelector(".modal__input_field_title");
const cardLink = document.querySelector(".modal__input_field_image-link");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const elements = document.querySelector(".elements");
const elementsTemplate = document
  .querySelector("#elements-item")
  .content.querySelector(".elements__item");

const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(config, editProfileForm);
editFormValidator.enableValidation();

function openModalEdit() {
  openModalWindow(editProfileModal);
  title.value = profileTitle.textContent;
  subtitle.value = profileSubtitle.textContent;
}

function openModalAdd() {
  openModalWindow(addCardModal);
  title.value = profileTitle.textContent;
  subtitle.value = profileSubtitle.textContent;
}

editBtn.addEventListener("click", openModalEdit);

addBtn.addEventListener("click", openModalAdd);

editCloseBtn.addEventListener("click", function () {
  closeModalWindow(editProfileModal);
});

addCloseBtn.addEventListener("click", function () {
  closeModalWindow(addCardModal);
});

imageCloseBtn.addEventListener("click", function () {
  closeModalWindow(imgModal);
});

editProfileForm.addEventListener("submit", function (e) {
  e.preventDefault();
  profileTitle.textContent = title.value;
  profileSubtitle.textContent = subtitle.value;
  closeModalWindow(editProfileModal);
});

addCardForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const submitObj = { name: cardTitle.value, link: cardLink.value };
  addCard(submitObj);
  closeModalWindow(addCardModal);
  addCardForm.reset();
});

function createCard(item) {
  return new Card(item, elementsTemplate);
}

function addCard(item) {
  const cardElement = createCard(item);
  elements.prepend(cardElement.returnCard());
}

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

initialCards.forEach(addCard);
