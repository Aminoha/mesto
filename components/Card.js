class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = this._element.querySelector(".elements__img");
    this._likeButton = this._element.querySelector(".elements__icon");
    this._deleteButton = this._element.querySelector(".elements__delete");
    this._element.querySelector(".elements__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("elements__icon_active");
  }

  _handleCardRemove() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick());

    this._deleteButton.addEventListener("click", () => this._handleCardRemove());

    this._cardImage.addEventListener("click", () => this._handleCardClick(this._link, this._name));
  }
}

export default Card;
