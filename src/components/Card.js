class Card {
  constructor(
    data,
    templateSelector,
    currentUserId,
    handleCardClick,
    handleTrashClick,
    addCardLike,
    deleteCardLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._likes = data.likes;
    this._id = data._id;
    this._isOwner = data.owner._id === currentUserId;
    this._currentUserId = currentUserId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._addCardLike = addCardLike;
    this._deleteCardLike = deleteCardLike;
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
    this._like = this._element.querySelector(".elements__count");
    this._deleteButton = this._element.querySelector(".elements__delete");
    this._element.querySelector(".elements__name").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setLikeState();
    this._setEventListeners();
    if (!this._isOwner) {
      this._deleteButton.setAttribute("hidden", true);
    }
    return this._element;
  }

  getCardId() {
    return this._id;
  }

  _handleLikeClick() {
    if (this._isLiked()) {
      this._deleteCardLike(this);
    } else {
      this._addCardLike(this);
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _isLiked() {
    return this._likes.some((like) => {
      return like._id === this._currentUserId;
    });
  }

  _setLikeState() {
    if (this._isLiked()) {
      this._likeButton.classList.add("elements__icon_active");
    } else {
      this._likeButton.classList.remove("elements__icon_active");
    }
    this._like.textContent = this._likeCount;
  }

  updateLike(likes) {
    this._likeCount = likes.length;
    this._likes = likes;
    this._setLikeState();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    this._deleteButton.addEventListener("click", () =>
      this._handleTrashClick(this)
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._link, this._name)
    );
  }
}

export default Card;
