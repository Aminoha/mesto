const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_edit-profle');
const popupAddCard = document.querySelector('.popup_add-card');
const popupCloseButtonEditPorfile = popupEditProfile.querySelector('.popup__button-close');
const popupCloseButtonAddCard = popupAddCard.querySelector('.popup__button-close');

const popupOpenPic = document.querySelector('.popup_open-pic')
const popupCloseButtonPic = popupOpenPic.querySelector('.popup__button-close');
const popupImage = popupOpenPic.querySelector('.popup__image')
const popupImageDescr = popupOpenPic.querySelector('.popup__image-descr')

const formProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_el_name');
const jobInput = formProfile.querySelector('.popup__input_el_descr');
const profile = document.querySelector('.profile');
const nameInfo = profile.querySelector('.profile__name');
const jobInfo = profile.querySelector('.profile__about');

const formAddCard = popupAddCard.querySelector('.popup__form');
const cardNameInput = formAddCard.querySelector('.popup__input_el_name');
const linkInput = formAddCard.querySelector('.popup__input_el_descr');

const cardsElement = document.querySelector('.elements__items');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__item');


function createCard(initialCards) {
  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector('.elements__name');
  const cardImage = card.querySelector('.elements__img');
  const deleteButton = card.querySelector('.elements__delete')
  const likeButton = card.querySelector('.elements__icon')

  cardName.textContent = initialCards.name;
  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name

  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('elements__icon_active')
  })

  deleteButton.addEventListener('click', function() {
    const listItem = deleteButton.closest('.elements__item')
    listItem.remove()
  })

  cardImage.addEventListener('click', function() {
    popupImage.src = initialCards.link
    popupImage.alt = initialCards.name
    popupImageDescr.textContent = initialCards.name
    openPopup(popupOpenPic);
  })

  return card
};

function renderCards() {
  initialCards.forEach(item => {
    const cardHTML = createCard(item);
    cardsElement.append(cardHTML)
  })
};
renderCards()

function openPopup(popups) {
  popups.classList.add('popup_opened');
}

function closePopup(popups) {
  popups.classList.remove('popup_opened');
}

function editProfileFormSubmit (evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(popupEditProfile)
}

function addNewCardFormSubmit (evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: cardNameInput.value,
    link: linkInput.value
  })
  cardsElement.prepend(newCard)
  closePopup(popupAddCard)
  cardNameInput.value =''
  linkInput.value = ''
}

editButton.addEventListener('click', function() {
  openPopup(popupEditProfile)
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
})

addButton.addEventListener('click', function() {
  openPopup(popupAddCard)
})

popupCloseButtonEditPorfile.addEventListener('click', function() {
  closePopup(popupEditProfile)
})

popupCloseButtonAddCard.addEventListener('click', function() {
  closePopup(popupAddCard)
})

popupCloseButtonPic.addEventListener('click', function() {
  closePopup(popupOpenPic)
})

formProfile.addEventListener('submit', editProfileFormSubmit); 

formAddCard.addEventListener('submit', addNewCardFormSubmit); 

















