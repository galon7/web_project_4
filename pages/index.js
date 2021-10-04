import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { config, initialCards } from "./utils.js";

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
const elementsTemplate = document
  .querySelector("#elements-item")
  .content.querySelector(".elements__item");

//--------------------------------------------------------------------------

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
imageModal.setEventListeners();

const newAddCardModal = new PopupWithForm(".modal_type_add-card", (data) => {
  const submitObj = { name: cardTitle.value, link: cardLink.value };
  const newCard = new Card(submitObj, elementsTemplate, () => {
    imageModal.open(submitObj);
  });
  const cardElement = newCard.returnCard();
  cardList.addItem(cardElement);
  newAddCardModal.close();
});
newAddCardModal.setEventListeners();

const newEditProfileModal = new PopupWithForm(
  ".modal_type_edit-profile",
  () => {
    userInfo.setUserInfo();
    newEditProfileModal.close();
  }
);
newEditProfileModal.setEventListeners();

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
    renderer: (item) => {
      const card = new Card(item, elementsTemplate, () => {
        imageModal.open(item);
      });
      const cardElement = card.returnCard();
      cardList.addItem(cardElement);
    },
  },
  elements
);
cardList.renderer();
