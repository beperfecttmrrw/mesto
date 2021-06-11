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


const openPopup = popup => {
  popup.classList.add('popup_opened');
}

const closePopup = popup => {
  popup.classList.remove('popup_opened');
}

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
}

const renderCards = () => {
  initialCards.forEach(item => {
   const card = renderCard(item);
   cardsList.append(card);
  });
}

const handlePopupTypeEdit = () => {
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
  openPopup(popupTypeEdit);

  popupTypeEditCloseBtn.focus();
}

const handlePopupTypeAdd = () => {
  openPopup(popupTypeAdd);
  popupTypeAddCloseBtn.focus();
}


//* Area of functions calls

renderCards();

buttonEdit.addEventListener('click', handlePopupTypeEdit);

formEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent =  popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup(popupTypeEdit);
});

buttonAdd.addEventListener('click', handlePopupTypeAdd);

formAddCard.addEventListener('submit', evt => {
  evt.preventDefault();
  const card = renderCard({name: popupPlace.value, link: popupLink.value});
  if (!card) {
    closePopup(popupTypeAdd);
  } else {
    cardsList.prepend(card);
    closePopup(popupTypeAdd);
  }
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


