import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validationConfig, initialCards } from "../components/config.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEditProfile = document.querySelector(".popup_edit-profle");
const popupAddCard = document.querySelector(".popup_add-card");

const popupOpenPic = document.querySelector(".popup_open-pic");
const popupImage = popupOpenPic.querySelector(".popup__image");
const popupImageDescr = popupOpenPic.querySelector(".popup__image-descr");

const formProfile = popupEditProfile.querySelector(".popup__form");
const nameInput = formProfile.querySelector(".popup__input_el_name");
const jobInput = formProfile.querySelector(".popup__input_el_descr");
const profile = document.querySelector(".profile");
const nameInfo = profile.querySelector(".profile__name");
const jobInfo = profile.querySelector(".profile__about");

const formAddCard = popupAddCard.querySelector(".popup__form");
const cardNameInput = formAddCard.querySelector(".popup__input_el_name");
const linkInput = formAddCard.querySelector(".popup__input_el_descr");

const cardsElement = document.querySelector(".elements__items");

const popups = document.querySelectorAll(".popup");

const formCardValidation = new FormValidator(validationConfig, formAddCard);
const formProfileValidation = new FormValidator(validationConfig, formProfile);
formCardValidation.enableValidation();
formProfileValidation.enableValidation();

function openPopup(popups) {
  popups.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function openNewPopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageDescr.textContent = name;
  openPopup(popupOpenPic);
}

function closePopup(popups) {
  popups.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function editProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function addNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    {
      name: cardNameInput.value,
      link: linkInput.value,
    }
  );
  cardsElement.prepend(newCard);
  closePopup(popupAddCard);
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});

editButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  formProfileValidation.resetValidation();
});

addButton.addEventListener("click", function () {
  openPopup(popupAddCard);
  formAddCard.reset();
  formCardValidation.resetValidation();
});

formProfile.addEventListener("submit", editProfileFormSubmit);

formAddCard.addEventListener("submit", addNewCardFormSubmit);

initialCards.forEach((item) => {
  const card = createCard(item)
  cardsElement.append(card);
});

function createCard(item) {
  const card = new Card(item, ".card-template", openNewPopup);
  const cardElement = card.generateCard();
  return cardElement
}
