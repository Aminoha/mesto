import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validationConfig, initialCards } from "../components/config.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEditProfile = document.querySelector(".popup_edit-profle");
const popupAddCard = document.querySelector(".popup_add-card");

const formProfile = popupEditProfile.querySelector(".popup__form");
const nameInput = formProfile.querySelector(".popup__input_el_name");
const jobInput = formProfile.querySelector(".popup__input_el_descr");

const formAddCard = popupAddCard.querySelector(".popup__form");

const formCardValidation = new FormValidator(validationConfig, formAddCard);
const formProfileValidation = new FormValidator(validationConfig, formProfile);
formCardValidation.enableValidation();
formProfileValidation.enableValidation();

const popupOpenImage = new PopupWithImage(".popup_open-pic")
popupOpenImage.setEventListeners()


const handleCardClick = (link, name) => {
  popupOpenImage.open(link, name)
}

function createCard(item) {
  const card = new Card(item, ".card-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

const cardSection = new Section({
  items: initialCards,
  renderer: (data) => {
    const cardElement = createCard(data)
    cardSection.addItem(cardElement)
  }, 
}, ".elements__items" )
cardSection.renderItems()

const callbackSubmitFormCard = (data) => {
  const newCard = createCard(data)
  cardSection.addItemPrep(newCard)
  popupCardAdd.close()
}

const popupCardAdd = new PopupWithForm(".popup_add-card", callbackSubmitFormCard)
popupCardAdd.setEventListeners()

const UserProfile = new UserInfo({
  userNameSelector: '.profile__name',
  userDescrSelector: '.profile__about'
})

const callbackSubmitFormProfile = (data) => {
  UserProfile.setUserInfo(data)
  popupProfileEdit.close()
}

const popupProfileEdit = new PopupWithForm(".popup_edit-profle", callbackSubmitFormProfile)
popupProfileEdit.setEventListeners()


editButton.addEventListener("click", () => {
  const dataProfile = UserProfile.getUserInfo()
  nameInput.value = dataProfile.name
  jobInput.value = dataProfile.description
  formProfileValidation.resetValidation();
  popupProfileEdit.open();
});

addButton.addEventListener("click",  () => {
  formAddCard.reset();
  formCardValidation.resetValidation();
  popupCardAdd.open();
});