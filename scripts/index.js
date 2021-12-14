import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { validationConfig } from "./constants.js";



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


const createCard = (cardData, cardTemplateSelector, cardImageClickHandler) => {
  const card = new Card(cardData, cardTemplateSelector, cardImageClickHandler);
  return card.renderCard();
};

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
   cardsList.append(createCard(item, cardTemplateSelector, handleCardImageClick));
  });
};

const handleCardImageClick = (cardObj) => {
  popupPicture.src = cardObj.link;
  popupPicture.alt = cardObj.name;
  popupCaption.textContent = cardObj.name;
  openPopup(popupTypeImage);
};

//Popup open buttons click handlers | Обработчики кликов по кнопкам открытия попапов
const handlePopupTypeEdit = () => {
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
  formEditProfileValidator.resetValidation();
  openPopup(popupTypeEdit);
};

const handlePopupTypeAdd = () => {
  formAddCardValidator.resetValidation();
  openPopup(popupTypeAdd);
};

//Popups submit handlers | Обработчики сабмита попапов
const handlePopupTypeEditSubmit = () => {
  profileName.textContent =  popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup(popupTypeEdit);
};

const handlePopupTypeAddSubmit = () => {
  cardsList.prepend(createCard({name: popupPlace.value, link: popupLink.value}, cardTemplateSelector, handleCardImageClick));
  closePopup(popupTypeAdd);
  formAddCard.reset();
}

//Functions call and event listeners adding area | Зона вызова функций и добавления слушателей событий

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




