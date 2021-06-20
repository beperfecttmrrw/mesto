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

const popupName = popupTypeEdit.querySelector('.popup__input_value_name');
const popupStatus = popupTypeEdit.querySelector('.popup__input_value_status');
const popupPlace = popupTypeAdd.querySelector('.popup__input_value_place');
const popupLink = popupTypeAdd.querySelector('.popup__input_value_link');

const cardsList = document.querySelector('.cards__container');
const cardTemplate = document.querySelector('.card-template').content;

const submitEditFormButton = formEditProfile.querySelector('.popup__save-button');

const handleEscPress = (evt, popup) => {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', evt => {
    handleEscPress(evt, popup);
  });
};

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscPress);
};

const renderCard = (cardObj) => {
  if (!cardObj.name || !cardObj.link) {
    return;
  }
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  cardImage.src = cardObj.link;
  cardImage.alt = cardObj.name;
  cardTitle.textContent = cardObj.name;

  cardImage.addEventListener('click', () => {
    const popupPicture = popupTypeImage.querySelector('.popup__picture');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');

    popupPicture.src = cardObj.link;
    popupPicture.alt = cardObj.name;
    popupCaption.textContent = cardObj.name;
    openPopup(popupTypeImage);
  });

  card.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });

  card.querySelector('.card__delete').addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  return card;
};

const renderCards = () => {
  initialCards.forEach(item => {
   const card = renderCard(item);
   cardsList.append(card);
  });
};

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


//* Area of functions calls

renderCards();

buttonEdit.addEventListener('click', handlePopupTypeEdit);

formEditProfile.addEventListener('submit', evt => {
  profileName.textContent =  popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup(popupTypeEdit);
});

buttonAdd.addEventListener('click', handlePopupTypeAdd);

formAddCard.addEventListener('submit', evt => {
  const card = renderCard({name: popupPlace.value, link: popupLink.value});
  if (card) {
    cardsList.prepend(card);
  }
  closePopup(popupTypeAdd);
  formAddCard.reset();
});

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
