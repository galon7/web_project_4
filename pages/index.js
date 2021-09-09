const editBtn = document.querySelector(".profile__info-edit");
const addBtn = document.querySelector(".profile__add-button");

const editProfileModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");
const imgModal = document.querySelector(".modal_img");

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
const elementsTemplate = document
  .querySelector("#elements-item")
  .content.querySelector(".elements__item");
const elements = document.querySelector(".elements");

function openModalWindow(modalWindow) {
  modalWindow.classList.add("modal_open");
}

function closeModalWindow(modalWindow) {
  modalWindow.classList.remove("modal_open");
}

function toggleLikeBtn(element) {
  element.classList.toggle("elements__like-button_pressed");
}

function closeEscOrClickOutside(window) {
  let currentForm = window.querySelector(".modal__form");

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closeModalWindow(window);
      if (currentForm) {
        currentForm.reset();
      }
    }
  });

  var ignoreClickElement = window.firstElementChild;
  window.addEventListener("mousedown", function (evt) {
    var isClickInside = ignoreClickElement.contains(evt.target);
    if (!isClickInside) {
      closeModalWindow(window);
      if (currentForm) {
        currentForm.reset();
      }
    }
  });
}

function openModalEdit() {
  openModalWindow(editProfileModal);
  title.value = profileTitle.textContent;
  subtitle.value = profileSubtitle.textContent;
  closeEscOrClickOutside(editProfileModal);
}

function openModalAdd() {
  addCardModal
    .querySelector(".modal__submit-button")
    .classList.add("modal__submit-button_disabled");
  openModalWindow(addCardModal);
  title.value = profileTitle.textContent;
  subtitle.value = profileSubtitle.textContent;
  closeEscOrClickOutside(addCardModal);
}

editBtn.addEventListener("click", openModalEdit);

addBtn.addEventListener("click", openModalAdd);

editCloseBtn.addEventListener("click", function () {
  closeModalWindow(editProfileModal);
  editProfileForm.reset();
});

addCloseBtn.addEventListener("click", function () {
  closeModalWindow(addCardModal);
  addCardForm.reset();
});

imageCloseBtn.addEventListener("click", function () {
  closeModalWindow(imgModal);
});

function addCard(item) {
  const element = elementsTemplate.cloneNode(true);
  const likeBtn = element.querySelector(".elements__like-button");
  const deleteBtn = element.querySelector(".elements__delete-button");
  const image = element.querySelector(".elements__img");
  const imageModal = imgModal.querySelector(".modal__image");

  image.src = item.link;
  image.alt = item.alt;
  element.querySelector(".elements__title").textContent = item.name;

  likeBtn.addEventListener("click", function () {
    toggleLikeBtn(likeBtn);
  });

  deleteBtn.addEventListener("click", function () {
    element.remove();
    element = null;
  });

  image.addEventListener("click", function () {
    openModalWindow(imgModal);
    imageModal.src = item.link;
    imageModal.alt = item.alt;
    imgModal.querySelector(".modal__caption").textContent = item.name;
    closeEscOrClickOutside(imgModal);
  });

  elements.prepend(element);
}

editProfileForm.addEventListener("submit", function (e) {
  e.preventDefault();
  profileTitle.textContent = title.value;
  profileSubtitle.textContent = subtitle.value;
  closeModalWindow(editProfileModal);
  editProfileForm.reset();
});

addCardForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const submitObj = { name: cardTitle.value, link: cardLink.value };
  addCard(submitObj);
  closeModalWindow(addCardModal);
  addCardForm.reset();
});

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
