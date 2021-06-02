let editButton = document.querySelector('.profile__button_type_edit');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__container');
let popupName = popup.querySelector('.popup__name');
let popupStatus = popup.querySelector('.popup__status');
let closePopupButton = popup.querySelector('.popup__close-button');


function openPopup() {
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
  popup.classList.add('popup_opened');
  closePopupButton.focus();
}

function closePopup(event) {
  event.preventDefault();
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent =  popupName.value;
  profileStatus.textContent = popupStatus.value;
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
popup.addEventListener('keypress', function (event) {
  if (event.keyCode === 13) {
    formSubmitHandler(event);
  }
});


//! it may become useful later
/* popup.addEventListener('click', closePopup);
popupForm.addEventListener('click', function(event) {
  event.stopPropagation();
}) */

