export class UserInfo {
  constructor(user) {
    this._name = user.nameSelector;
    this._job = user.jobSelector;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }

  getUserInfo() {
    return { name: this._name.textContent, job: this._job.textContent };
  }
}
