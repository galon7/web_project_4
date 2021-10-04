export class UserInfo {
  constructor(user) {
    this._name = user.name;
    this._job = user.job;
  }

  setUserInfo() {
    this._name.textContent = document.querySelector(
      ".modal__input_field_name"
    ).value;
    this._job.textContent = document.querySelector(
      ".modal__input_field_profession"
    ).value;
  }

  getUserInfo() {
    return { name: this._name.textContent, job: this._job.textContent };
  }
}
