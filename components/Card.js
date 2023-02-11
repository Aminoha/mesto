class Card {
  constructor(data, templateSelector, openNewPopup) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._openNewPopup = openNewPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__name").textContent = this._name;
    this._element.querySelector(".elements__img").src = this._image;
    this._element.querySelector(".elements__img").alt = this._name;
    return this._element;
  }

  _handleLikeClick() {
    this._element
      .querySelector(".elements__icon")
      .classList.toggle("elements__icon_active");
  }

  _handleCardRemove() {
    this._element
      .querySelector(".elements__img")
      .closest(".elements__item")
      .remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__icon")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });
    this._element
      .querySelector(".elements__delete")
      .addEventListener("click", () => {
        this._handleCardRemove();
      });
    this._element
      .querySelector(".elements__img")
      .addEventListener("click", () => {
        this._openNewPopup(this._image, this._name);
      });
  }
}

export default Card;
