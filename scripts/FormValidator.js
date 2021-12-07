

export class FormValidator {
  constructor(formElement, validationConfig) {
    this._formElement = formElement;
    this._validationConfig = validationConfig;
  }

  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleSubmitBtnState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _isValid(formElement, inputElement, {inputErrorClass, errorClass}) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  }

  _setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    const buttonElement = formElement.querySelector(submitButtonSelector);

    this._toggleSubmitBtnState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement, rest);

        this._toggleSubmitBtnState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  }

  enableValidation() {

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._setEventListeners(this._formElement, this._validationConfig);

  }

}
