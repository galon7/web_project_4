import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { config, initialCards } from "../utils/constants.js";
import { Api } from "../components/Api.js";
import "./index.css";

const editBtn = document.querySelector(".profile__info-edit");
const addBtn = document.querySelector(".profile__add-button");

const editProfileModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");

const addCardForm = addCardModal.querySelector(".modal__form");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const cardTitle = document.querySelector(".modal__input_field_title");
const cardLink = document.querySelector(".modal__input_field_image-link");

export const inputName = document.querySelector(".modal__input_field_name");
export const inputJob = document.querySelector(
  ".modal__input_field_profession"
);

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");

const elements = document.querySelector(".elements");

let cardList;

//--------------------------------------------------------------------------

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "e0cd9749-f008-4064-bc64-61e9ac8b0f57",
    "Content-Type": "application/json",
  },
});

function addCard(item) {
  const newCard = new Card(item, ".elements__item", () => {
    imageModal.open(item);
  });
  const cardElement = newCard.createCard();
  cardList.addItem(cardElement);
}

const userInformation = api.getUserInfo();

console.log(userInformation);
userInformation.then((data) => {
  console.log(data);
  profileTitle.textContent = data.name;
  profileSubtitle.textContent = data.about;
  profileAvatar.src = data.avatar;
});

const user = {
  nameSelector: profileTitle,
  jobSelector: profileSubtitle,
};

const userInfo = new UserInfo(user);

const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(config, editProfileForm);
editFormValidator.enableValidation();

const imageModal = new PopupWithImage(".modal_img");

const newAddCardModal = new PopupWithForm(".modal_type_add-card", (data) => {
  const submitObject = { name: cardTitle.value, link: cardLink.value };
  addCard(submitObject);
  newAddCardModal.close();
});

const newEditProfileModal = new PopupWithForm(
  ".modal_type_edit-profile",
  (data) => {
    const user = { name: data.name, about: data.profession };
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    userInfo.setUserInfo(user);
    api.editProfile(user);
    newEditProfileModal.close();
  }
);

editBtn.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputJob.value = data.job;
  newEditProfileModal.open();
  editFormValidator.resetValidation();
});

addBtn.addEventListener("click", () => {
  newAddCardModal.open();
  addFormValidator.resetValidation();
});

const cards = api.getInitialCards();

cards.then((data) => {
  cardList = new Section(
    {
      items: data,
      renderer: addCard,
    },
    elements
  );
  cardList.render();
});
