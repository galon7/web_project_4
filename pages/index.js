const editBtn = document.querySelector(".profile__info-edit");
const addBtn = document.querySelector(".profile__add-button");

const editProfileModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");
const imageModal = document.querySelector(".modal_image")

const modalTitle = document.querySelector(".modal__title")

const editCloseBtn = editProfileModal.querySelector(".modal__close");
const addCloseBtn = addCardModal.querySelector(".modal__close");
const imageCloseBtn = imageModal.querySelector(".modal__close")

const addCardForm = addCardModal.querySelector(".modal__form");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const title = document.querySelector(".modal__input_field_name");
const subtitle = document.querySelector(".modal__input_field_profession");

const cardTitle = document.querySelector(".modal__input_field_title");
const cardLink = document.querySelector(".modal__input_field_image-link");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const elementsTemplate = document.querySelector("#elements-item").content.querySelector(".elements__item");
const elements = document.querySelector(".elements");


function resetEditForm() {
  title.value = "";
  subtitle.value = "";
}

function resetAddForm() {
  cardTitle.value = "";
  cardLink.value = "";
}

function openModalEdit(e) {
  editProfileModal.classList.add("modal_open");
  title.value = profileTitle.textContent;
  subtitle.value = profileSubtitle.textContent;
}

function openModalAdd(e) {
  addCardModal.classList.add("modal_open");
  title.value = profileTitle.textContent;
  subtitle.value = profileSubtitle.textContent;
}

editBtn.addEventListener("click", openModalEdit);

addBtn.addEventListener("click", openModalAdd);

editCloseBtn.addEventListener("click", function() {
  editProfileModal.classList.remove("modal_open");
  resetEditForm();
})

addCloseBtn.addEventListener("click", function() {
  addCardModal.classList.remove("modal_open");
  resetAddForm();
})

imageCloseBtn.addEventListener("click", function() {
  imageModal.classList.remove("modal_open");
})

editProfileForm.addEventListener("submit", function(e) {
  e.preventDefault();
  profileTitle.textContent = title.value;
  profileSubtitle.textContent = subtitle.value;
  editProfileModal.classList.remove("modal_open");
  resetEditForm();
})

addCardForm.addEventListener("submit", function(e) {
  e.preventDefault();
  let submitObj = { name: cardTitle.value, link: cardLink.value}
  addCard(submitObj);
  addCardModal.classList.remove("modal_open");
  resetAddForm();
})

function addCard(item) {
  const element = elementsTemplate.cloneNode(true);
  const likeBtn = element.querySelector(".elements__like-button");
  const deleteBtn = element.querySelector(".elements__delete-button");
  const image = element.querySelector(".elements__img");
  element.querySelector(".elements__img").src = item.link;
  element.querySelector(".elements__title").textContent = item.name;

  likeBtn.addEventListener("click", function() {
    likeBtn.classList.toggle("elements__like-button_pressed");
  })

  deleteBtn.addEventListener("click", function() {
    element.remove();
  })

  image.addEventListener("click", function() {
    imageModal.classList.add("modal_open");
    imageModal.querySelector(".modal__image").src = item.link;
    imageModal.querySelector(".modal__caption").textContent = item.name;
  })

  elements.append(element);
}

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

initialCards.forEach(addCard);
