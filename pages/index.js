const editBtn = document.querySelector(".profile__info-edit");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__close");
const form = document.querySelector(".modal__form");
const title = document.querySelector(".modal__input_field_name");
const subtitle = document.querySelector(".modal__input_field_profession");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const elementsTemplate = document.querySelector("#elements__item").content;
const elements = document.querySelector(".elements");

function resetForm() {
  title.value="";
  subtitle.value="";
}

function openModal() {
  modal.classList.add("modal_open");
  title.value = profileTitle.textContent;
  subtitle.value = profileSubtitle.textContent;
}

editBtn.addEventListener("click", openModal);

closeBtn.addEventListener("click", function() {
  modal.classList.remove("modal_open");
  resetForm();
})

form.addEventListener("submit", function(e) {
  e.preventDefault();
  profileTitle.textContent = title.value;
  profileSubtitle.textContent = subtitle.value;
  modal.classList.remove("modal_open");
  resetForm();
})



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

initialCards.forEach(function (item) {
  const element = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  element.querySelector(".elements__img").src = item.link;
  element.querySelector(".elements__title").textContent = item.name;
  elements.append(element);
})
