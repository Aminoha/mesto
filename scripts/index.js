const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_el_name');
const jobInput = formElement.querySelector('.popup__input_el_descr');
const profile = document.querySelector('.profile');
const nameInfo = profile.querySelector('.profile__name');
const jobInfo = profile.querySelector('.profile__about');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup()
}

editButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
formElement.addEventListener('submit', handleFormSubmit); 
