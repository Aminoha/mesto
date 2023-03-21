export default class UserInfo {
  constructor({ userNameSelector, userDescrSelector, userPicSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescr = document.querySelector(userDescrSelector);
    this._userPic = document.querySelector(userPicSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userDescr.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userDescr.textContent = about;
  }

  setUserAvatar(result) {
    this._userPic.src = result.avatar;
  }
}
