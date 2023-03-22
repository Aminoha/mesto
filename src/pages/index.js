import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import validationConfig from "../utils/constants";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

//объявление переменных
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__pic-button");

const popupEditProfile = document.querySelector(".popup_edit-profle");
const formProfile = popupEditProfile.querySelector(".popup__form");

const popupAddCard = document.querySelector(".popup_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form");

const popupEditAvatar = document.querySelector(".popup_update-avatar");
const formEditAvatar = popupEditAvatar.querySelector(".popup__form");

let currentUserId;

//Объявление функций
const callbackSubmitFormCard = (data) => {
  return api
    .addCard(data)
    .then((items) => {
      const newCard = createCard(items);
      cardSection.addItemPrep(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleAvatarFormUpdate = (pic) => {
  return api
    .updateAvatar(pic)
    .then((items) => {
      userProfile.setUserAvatar(items);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleTrashClick = (deletingCard) => {
  popupDelete.open(deletingCard);
};

const createCard = (item) => {
  const card = new Card(
    item,
    ".card-template",
    currentUserId,
    handleCardClick,
    handleTrashClick,
    addCardLike,
    deleteCardLike
  );
  const cardElement = card.generateCard();

  return cardElement;
}

const addCardLike = (card) => {
  return api
    .putLike(card.getCardId())
    .then(({ likes }) => {
      card.updateLike(likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

const deleteCardLike = (card) => {
  return api
    .deleteLike(card.getCardId())
    .then(({ likes }) => {
      card.updateLike(likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

const handleCardFormDelete = (deletingCard) => {
  return api
    .deleteCard(deletingCard.getCardId())
    .then(() => {
      deletingCard.deleteCard();
      popupDelete.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleCardClick = (link, name) => {
  popupOpenImage.open(link, name);
};

const callbackSubmitFormProfile = (data) => {
  const dataProfile = userProfile.getUserInfo();
  popupProfileEdit.setInputValues(dataProfile)

  return api
    .updateUser(data)
    .then((items) => {
      userProfile.setUserInfo(items);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Создание экземпляра классов
const formCardValidation = new FormValidator(validationConfig, formAddCard);
const formProfileValidation = new FormValidator(validationConfig, formProfile);
const formAvatarValidation = new FormValidator(
  validationConfig,
  formEditAvatar
);
const popupOpenImage = new PopupWithImage(".popup_open-pic");
const popupDelete = new PopupWithConfirmation(
  ".popup_delete",
  handleCardFormDelete
);

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-61",
  "10e895f5-9c21-4560-ae6a-6a7ed41c5744"
);

const cardSection = new Section(
  {
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  ".elements__items"
);
const popupCardAdd = new PopupWithForm(
  ".popup_add-card",
  callbackSubmitFormCard
);

const popupUpdateAvatar = new PopupWithForm(
  ".popup_update-avatar",
  handleAvatarFormUpdate
);

const userProfile = new UserInfo({
  userNameSelector: ".profile__name",
  userDescrSelector: ".profile__about",
  userPicSelector: ".profile__pic",
});
const popupProfileEdit = new PopupWithForm(
  ".popup_edit-profle",
  callbackSubmitFormProfile
);

Promise.all([api.getCards(), api.getUsers()])
  .then(([items, user]) => {
    currentUserId = user._id;
    cardSection.renderItems(items);
    userProfile.setUserAvatar(user);
    userProfile.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  });

//Слушатели
editButton.addEventListener("click", () => {
  const dataProfile = userProfile.getUserInfo();
  popupProfileEdit.setInputValues(dataProfile)
  formProfileValidation.resetValidation();
  popupProfileEdit.open();
});

addButton.addEventListener("click", () => {
  formAddCard.reset();
  formCardValidation.resetValidation();
  popupCardAdd.open();
});

avatarButton.addEventListener("click", () => {
  formEditAvatar.reset();
  formAvatarValidation.resetValidation();
  popupUpdateAvatar.open();
});

//Обращения к методам экземляра классов
formCardValidation.enableValidation();
formProfileValidation.enableValidation();
formAvatarValidation.enableValidation();
popupOpenImage.setEventListeners();
popupDelete.setEventListeners();
popupCardAdd.setEventListeners();
popupProfileEdit.setEventListeners();
popupUpdateAvatar.setEventListeners();
