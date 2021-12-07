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
      .cloneNode(true);

    return cardElement;
  }

  _toggleCardLike = (evt) => {
    evt.target.classList.toggle('card__like_active');
  }

  _handleCardDeleteBtn = (evt) => {
    evt.target.closest('.card').remove();
  }

  _hanleCardImageClick = (cardObj) => {
    const popupPicture = popupTypeImage.querySelector('.popup__picture');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');

    popupPicture.src = cardObj.link;
    popupPicture.alt = cardObj.name;
    popupCaption.textContent = cardObj.name;
    openPopup(popupTypeImage);
  }

  _setEventListeners = () => {
    this._element.querySelector('.card__like').addEventListener('click', this._toggleCardLike);
    this._element.querySelector('.card__delete').addEventListener('click', this._handleCardDeleteBtn);
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._hanleCardImageClick(this._cardObj);
    });
  }

  renderCard = () => {
    if (!this._cardObj.name || !this._cardObj.link) {
      return;
    }

    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');

    this._setEventListeners();

    cardImage.src = this._cardObj.link;
    cardImage.alt = this._cardObj.name;
    cardTitle.textContent = this._cardObj.name;

    return this._element;
  }

}



