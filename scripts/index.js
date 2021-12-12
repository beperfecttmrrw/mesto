import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";



const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const popupElements = Array.from(document.querySelectorAll('.popup'));

const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const popupTypeEditCloseBtn = popupTypeEdit.querySelector('.popup__close-button');
const popupTypeAddCloseBtn = popupTypeAdd.querySelector('.popup__close-button');
const popupTypeImageCloseBtn = popupTypeImage.querySelector('.popup__close-button');

const formEditProfile = popupTypeEdit.querySelector('.popup__form');
const formAddCard = popupTypeAdd.querySelector('.popup__form');

const formEditProfileValidator = new FormValidator(formEditProfile, validationConfig);
const formAddCardValidator = new FormValidator(formAddCard, validationConfig);

const popupName = popupTypeEdit.querySelector('.popup__input_value_name');
const popupStatus = popupTypeEdit.querySelector('.popup__input_value_status');
const popupPlace = popupTypeAdd.querySelector('.popup__input_value_place');
const popupLink = popupTypeAdd.querySelector('.popup__input_value_link');

const popupPicture = popupTypeImage.querySelector('.popup__picture');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const cardsList = document.querySelector('.cards__container');
const cardTemplateSelector = '.card-template';

const submitEditFormButton = formEditProfile.querySelector('.popup__save-button');


const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscPress);
};

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscPress);
};

const handleEscPress = evt => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

const renderCards = () => {
  initialCards.forEach(item => {
   const card = new Card(item, cardTemplateSelector, handleCardImageClick);
   const cardElement = card.renderCard();
   cardsList.append(cardElement);
  });
};

const handleCardImageClick = (cardObj) => {
  popupPicture.src = cardObj.link;
  popupPicture.alt = cardObj.name;
  popupCaption.textContent = cardObj.name;
  openPopup(popupTypeImage);
}

const handlePopupTypeEdit = () => {
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
  submitEditFormButton.classList.remove('popup__save-button_disabled');
  submitEditFormButton.disabled = false;
  openPopup(popupTypeEdit);
};

const handlePopupTypeAdd = () => {
  openPopup(popupTypeAdd);
};

const handlePopupTypeEditSubmit = () => {
  profileName.textContent =  popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup(popupTypeEdit);
};

const handlePopupTypeAddSubmit = () => {
  const card = new Card({name: popupPlace.value, link: popupLink.value}, cardTemplateSelector, handleCardImageClick);
  const cardElement = card.renderCard();
  cardsList.prepend(cardElement);

  closePopup(popupTypeAdd);
  formAddCard.reset();
}

//Functions calls

renderCards();

buttonEdit.addEventListener('click', handlePopupTypeEdit);

formEditProfile.addEventListener('submit', handlePopupTypeEditSubmit);

buttonAdd.addEventListener('click', handlePopupTypeAdd);

formAddCard.addEventListener('submit', handlePopupTypeAddSubmit);

popupTypeEditCloseBtn.addEventListener('click', () => {
  closePopup(popupTypeEdit);
});

popupTypeAddCloseBtn.addEventListener('click', () => {
  closePopup(popupTypeAdd);
});

popupTypeImageCloseBtn.addEventListener('click', () => {
  closePopup(popupTypeImage);
});

popupElements.forEach(popupEl => {
  popupEl.firstElementChild.addEventListener('click', (evt)=> {
    evt.stopPropagation();
  });
  popupEl.addEventListener('click', () => {
    closePopup(popupEl);
  });
});

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();




//* EXPORT AREA

export { validationConfig };
