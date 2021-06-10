const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

// const popup = document.querySelector('.popup');
// const popupForm = popup.querySelector('.popup__container');
// const popupName = popup.querySelector('.popup__input_value_name');
// const popupStatus = popup.querySelector('.popup__input_value_status');
// const popupCloseButton = popup.querySelector('.popup__close-button');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const cardsList = document.querySelector('.cards__container');
const cardTemplate = document.querySelector('.card-template').content;


const closePopup = (evt, popup) => {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}

const renderCard = (name, link) => {
  if (!name || !link) {
    return;
  }
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardTitle.textContent = name;

  cardImage.addEventListener('click', () => {
    const popupPicture = popupTypeImage.querySelector('.popup__picture');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');

    popupPicture.setAttribute('src', link);
    popupPicture.setAttribute('alt', name);
    popupCaption.textContent = name;
    popupTypeImage.classList.add('popup_opened');

    popupTypeImage.querySelector('.popup__close-button').addEventListener('click', evt => {
      closePopup(evt, popupTypeImage);
    });
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
   const card = renderCard(item.name, item.link);
   cardsList.append(card);
  });
}





const handlePopup = (popup) => {
  const closeButton = popup.querySelector('.popup__close-button');
  const popupForm = popup.querySelector('.popup__form');

  if (popup === popupTypeEdit) {
    const popupName = popup.querySelector('.popup__input_value_name');
    const popupStatus = popup.querySelector('.popup__input_value_status');

    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
    popup.classList.add('popup_opened');

    closeButton.addEventListener('click', evt => {
      closePopup(evt, popup);
    });
    popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      profileName.textContent =  popupName.value;
      profileStatus.textContent = popupStatus.value;
      popup.classList.remove('popup_opened');
    });
    closeButton.focus(); // for enter-key close functionality

  } else if (popup === popupTypeAdd) {
    const popupPlace = popup.querySelector('.popup__input_value_place');
    const popupLink = popup.querySelector('.popup__input_value_link');

    popup.classList.add('popup_opened');

    popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      const card = renderCard(popupPlace.value, popupLink.value);
      if (!card) {
        popup.classList.remove('popup_opened');
      } else {
        cardsList.prepend(card);
        popup.classList.remove('popup_opened');
      }
      popupPlace.value = '';
      popupLink.value = '';
    });

    closeButton.addEventListener('click', evt => {
      closePopup(evt, popup);
    });
    closeButton.focus();
  }

}



//* Area of functions calls

renderCards();

//! refactor it
editButton.addEventListener('click', () => {
  handlePopup(popupTypeEdit);
});
addButton.addEventListener('click', () => {
  handlePopup(popupTypeAdd);
});

// popup.addEventListener('keypress', evt => {
//   if (evt.keyCode === 13) {
//     formSubmitHandler(evt);
//   }
// });

//! it may become useful later
/* popup.addEventListener('click', closePopup);
popupForm.addEventListener('click', function(event) {
  event.stopPropagation();
}) */

