export default class UserInfo {
  constructor({userNameSelector, userDescrSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescr = document.querySelector(userDescrSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescr.textContent
    }
  }

  setUserInfo({name, description}) {
    this._userName.textContent = name;
    this._userDescr.textContent = description;
  }
}