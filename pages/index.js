const editBtn = document.querySelector(".profile__info-edit");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__close");
const form = document.querySelector(".model__form");


editBtn.addEventListener("click", function() {
  modal.classList.add("modal_open");
})

closeBtn.addEventListener("click", function() {
  modal.classList.remove("modal_open");
})

closeBtn.addEventListener("submit", function(e) {
  e.preventDefault();
})
