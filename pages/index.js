const editBtn = document.querySelector(".profile__info-edit");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__close");
const form = document.querySelector(".modal__form");
const title = document.querySelector(".form__input_field_name");
const subtitle = document.querySelector(".form__input_field_profession");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

function resetForm() {
  title.value="";
  subtitle.value="";
}

editBtn.addEventListener("click", function() {
  modal.classList.add("modal_open");
  title.value = profileTitle.textContent;
  subtitle.value = profileSubtitle.textContent;
})

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

