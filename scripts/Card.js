

export class Card {
  constructor(data, templateSelector, cardImageClickHandler) {
    this._templateSelector = templateSelector;
    this._cardObj = data;

    //functions
    this._cardImageClickHandler = cardImageClickHandler;
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
    this._cardLikeButton.classList.toggle('card__like_active');
  }

  _handleCardDelete = () => {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners = () => {
    this._cardLikeButton.addEventListener('click', this._toggleCardLike);
    this._cardDeleteButton.addEventListener('click', this._handleCardDelete);
    this._cardImageElement.addEventListener('click', () => {
      this._cardImageClickHandler(this._cardObj);
    });
  }

  renderCard = () => {
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector('.card__image');
    this._cardTitleElement = this._element.querySelector('.card__title');
    this._cardLikeButton = this._element.querySelector('.card__like');
    this._cardDeleteButton = this._element.querySelector('.card__delete');

    this._setEventListeners();

    this._cardImageElement.src = this._cardObj.link;
    this._cardImageElement.alt = this._cardObj.name;
    this._cardTitleElement.textContent = this._cardObj.name;

    return this._element;
  }

}



