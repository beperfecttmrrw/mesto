import { popupTypeImage, openPopup } from "./index.js";


export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._cardObj = data;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _toggleCardLike = () => {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleCardDelete = () => {
    this._element.remove();
    this._element = null;
  }

  _handleCardImageClick = (cardObj) => {
    const popupPicture = popupTypeImage.querySelector('.popup__picture');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');

    popupPicture.src = cardObj.link;
    popupPicture.alt = cardObj.name;
    popupCaption.textContent = cardObj.name;
    openPopup(popupTypeImage);
  }

  _setEventListeners = () => {
    this._element.querySelector('.card__like').addEventListener('click', this._toggleCardLike);
    this._element.querySelector('.card__delete').addEventListener('click', this._handleCardDelete);
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardImageClick(this._cardObj);
    });
  }

  renderCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');

    cardImage.src = this._cardObj.link;
    cardImage.alt = this._cardObj.name;
    cardTitle.textContent = this._cardObj.name;

    return this._element;
  }

}



