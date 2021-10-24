import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { config } from "../utils/constants.js";
import { Api } from "../components/Api.js";
import { renderLoading } from "../utils/utils.js";
import "./index.css";

const editBtn = document.querySelector(".profile__info-edit");
const addBtn = document.querySelector(".profile__add-button");
const avatarBtn = document.querySelector(".profile__avatar");

const editProfileModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");
const editAvatarModal = document.querySelector(".modal_type_change-avatar");

const addCardForm = addCardModal.querySelector(".modal__form");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");

const cardTitle = document.querySelector(".modal__input_field_title");
const cardLink = document.querySelector(".modal__input_field_image-link");

const inputName = document.querySelector(".modal__input_field_name");
const inputJob = document.querySelector(".modal__input_field_profession");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");

const elements = document.querySelector(".elements");

let userID;

//--------------------------------------------------------------------------

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "e0cd9749-f008-4064-bc64-61e9ac8b0f57",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((data) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    profileAvatar.src = data.avatar;
    userID = data._id;
  })
  .catch((err) => console.log(`Error.....: ${err}`));

const user = {
  nameSelector: profileTitle,
  jobSelector: profileSubtitle,
};

const userInfo = new UserInfo(user);

const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(config, editProfileForm);
editFormValidator.enableValidation();
const editAvatarValidator = new FormValidator(config, editAvatarForm);
editAvatarValidator.enableValidation();

//----------------------------Modals-----------------------------------------

const imageModal = new PopupWithImage(".modal_img");

const newAddCardModal = new PopupWithForm(".modal_type_add-card", (data) => {
  const addSubmitBtn = newAddCardModal._formElement.lastElementChild;
  renderLoading(true, addSubmitBtn);

  const submitObject = { name: cardTitle.value, link: cardLink.value };
  api
    .addCardApi(submitObject)
    .then((data) => {
      newAddCardModal.close();
      cardList.addItemStart(generateCard(data));
    })
    .catch((err) => console.log(`Error.....: ${err}`))
    .finally(() => renderLoading(false, addSubmitBtn));
});

const newEditProfileModal = new PopupWithForm(
  ".modal_type_edit-profile",
  (data) => {
    const editSubmitBtn = newEditProfileModal._formElement.lastElementChild;
    renderLoading(true, editSubmitBtn);
    const user = { name: data.name, about: data.profession };
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    userInfo.setUserInfo(user);
    api
      .editProfile(user)
      .then(() => newEditProfileModal.close())
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(() => renderLoading(false, editSubmitBtn));
  }
);

const newEditAvatarModal = new PopupWithForm(
  ".modal_type_change-avatar",
  (data) => {
    const avatarSubmitBtn = newEditAvatarModal._formElement.lastElementChild;
    renderLoading(true, avatarSubmitBtn);
    api
      .updateAvatar(data)
      .then(() => newEditAvatarModal.close())
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(() => renderLoading(false, avatarSubmitBtn));
  }
);

export const deleteCardModal = new PopupWithForm(
  ".modal_type_delete-card",
  (data) => {
    api
      .deleteCard(deleteCardModal.id)
      .then(() => {
        deleteCardModal.close();
        deleteCardModal.removeElement();
      })
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(deleteCardModal.close());
  }
);

//---------------------------Event listeners---------------------------------

avatarBtn.addEventListener("click", () => {
  newEditAvatarModal.open();
});

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

//----------------------------Initial-----------------------------------------

function generateCard(item) {
  item.userID = userID;
  const newCard = new Card(
    item,
    ".elements__item",
    () => {
      imageModal.open(item);
    },
    () => {
      const check = newCard._checkIfLiked();
      if (!check) {
        api
          .like(item._id)
          .then((data) => {
            newCard.updateLikes(data.likes);
          })
          .catch((err) => console.log(`Error.....: ${err}`));
      } else {
        api
          .unlike(item._id)
          .then((data) => {
            newCard.updateLikes(data.likes);
          })
          .catch((err) => console.log(`Error.....: ${err}`));
      }
    }
  );
  return newCard.createCard();
}

api
  .getInitialCards()
  .then((data) => {
    cardList.render(data);
  })
  .catch((err) => console.log(`Error.....: ${err}`));

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(generateCard(item));
    },
  },
  elements
);
