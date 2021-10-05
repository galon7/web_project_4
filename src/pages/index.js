import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { config, initialCards } from "../components/utils.js";
import "./index.css";

const editBtn = document.querySelector(".profile__info-edit");
const addBtn = document.querySelector(".profile__add-button");

const editProfileModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");

const addCardForm = addCardModal.querySelector(".modal__form");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const cardTitle = document.querySelector(".modal__input_field_title");
const cardLink = document.querySelector(".modal__input_field_image-link");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const elements = document.querySelector(".elements");

//--------------------------------------------------------------------------
function addCard(item) {
  const newCard = new Card(item, ".elements__item", () => {
    imageModal.open(item);
  });
  const cardElement = newCard.createCard();
  cardList.addItem(cardElement);
}

const user = {
  name: profileTitle,
  job: profileSubtitle,
};
export const userInfo = new UserInfo(user);

const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(config, editProfileForm);
editFormValidator.enableValidation();

const imageModal = new PopupWithImage(".modal_img");

const newAddCardModal = new PopupWithForm(".modal_type_add-card", () => {
  const submitObj = { name: cardTitle.value, link: cardLink.value };
  addCard(submitObj);
  newAddCardModal.close();
});

const newEditProfileModal = new PopupWithForm(
  ".modal_type_edit-profile",
  () => {
    userInfo.setUserInfo();
    newEditProfileModal.close();
  }
);

editBtn.addEventListener("click", () => {
  newEditProfileModal.open();
  editFormValidator.resetValidation();
});

addBtn.addEventListener("click", () => {
  newAddCardModal.open();
  addFormValidator.resetValidation();
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => addCard(item),
  },
  elements
);
cardList.render();
