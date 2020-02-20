'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardsAmount = 4;
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var defaultCoords;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var userDialogOpenElement = document.querySelector('.setup-open');
  var userDialogCloseElement = userDialog.querySelector('.setup-close');
  var userDialogNameInput = userDialog.querySelector('.setup-user-name');
  var userDialogWizardCoatImage = userDialog.querySelector('.setup-wizard .wizard-coat');
  var userDialogWizardEyesImage = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var userDialogWizardFireballElement = userDialog.querySelector('.setup-fireball-wrap');
  var userDialogCoatInput = userDialog.querySelector('input[name="coat-color"]');
  var userDialogEyesInput = userDialog.querySelector('input[name="eyes-color"]');
  var userDialogFireballInput = userDialog.querySelector('input[name="fireball-color"]');
  var userDialogHandleElement = userDialog.querySelector('.upload');

  var getNewWizard = function () {
    var wizardData = {
      name: WIZARD_NAMES[window.utils.getRandomArrayIndex(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[window.utils.getRandomArrayIndex(WIZARD_SURNAMES)],
      coatColor: COAT_COLORS[window.utils.getRandomArrayIndex(COAT_COLORS)],
      eyeColor: EYE_COLORS[window.utils.getRandomArrayIndex(EYE_COLORS)]
    };
    return wizardData;
  };

  var getWizards = function (num) {
    var wizards = [];
    for (var i = 0; i < num; i++) {
      wizards[i] = getNewWizard();
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    similarListElement.innerHTML = '';
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };

  var renderWizardsBlock = function () {

    var fragment = document.createDocumentFragment();
    var wizards = getWizards(wizardsAmount);
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onUserDialogEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeUserDialog();
    }
  };

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');
    if (!defaultCoords) {
      defaultCoords = {
        x: userDialog.style.left,
        y: userDialog.style.top
      };
    } else {
      userDialog.style.left = defaultCoords.x;
      userDialog.style.top = defaultCoords.y;
    }

    document.addEventListener('keydown', onUserDialogEscPress);
  };

  var closeUserDialog = function () {
    if (document.activeElement !== userDialogNameInput) {
      userDialog.classList.add('hidden');
      document.removeEventListener('keydown', onUserDialogEscPress);
    }
  };

  var onUserDialogHandleMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          userDialogHandleElement.removeEventListener('click', onClickPreventDefault);
        };
        userDialogHandleElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  userDialogOpenElement.addEventListener('click', function () {
    openUserDialog();
    renderWizardsBlock();
  });

  userDialogOpenElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openUserDialog();
      renderWizardsBlock();
    }
  });

  userDialogCloseElement.addEventListener('click', function () {
    closeUserDialog();
  });

  userDialogCloseElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closeUserDialog();
    }
  });

  userDialogWizardCoatImage.addEventListener('click', function () {
    var coatColor = COAT_COLORS[window.utils.getRandomArrayIndex(COAT_COLORS)];
    userDialogWizardCoatImage.style.fill = coatColor;
    userDialogCoatInput.value = coatColor;
  });

  userDialogWizardEyesImage.addEventListener('click', function () {
    var eyesColor = EYE_COLORS[window.utils.getRandomArrayIndex(EYE_COLORS)];
    userDialogWizardEyesImage.style.fill = eyesColor;
    userDialogEyesInput.value = eyesColor;
  });

  userDialogWizardFireballElement.addEventListener('click', function () {
    var fireballColor = FIREBALL_COLORS[window.utils.getRandomArrayIndex(FIREBALL_COLORS)];
    userDialogWizardFireballElement.style.backgroundColor = fireballColor;
    userDialogFireballInput.value = fireballColor;
  });

  userDialogHandleElement.addEventListener('mousedown', onUserDialogHandleMousedown);
})();
