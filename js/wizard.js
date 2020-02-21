'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardsAmount = 4;

  window.wizard = {
    userDialog: document.querySelector('.setup'),
    renderWizardsBlock: function () {
      var fragment = document.createDocumentFragment();
      var wizards = getWizards(wizardsAmount);
      for (var i = 0; i < wizards.length; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarListElement.appendChild(fragment);
      this.userDialog.querySelector('.setup-similar').classList.remove('hidden');
    }
  };

  var similarListElement = window.wizard.userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var userDialogWizardCoatImage = window.wizard.userDialog.querySelector('.setup-wizard .wizard-coat');
  var userDialogWizardEyesImage = window.wizard.userDialog.querySelector('.setup-wizard .wizard-eyes');
  var userDialogWizardFireballElement = window.wizard.userDialog.querySelector('.setup-fireball-wrap');
  var userDialogCoatInput = window.wizard.userDialog.querySelector('input[name="coat-color"]');
  var userDialogEyesInput = window.wizard.userDialog.querySelector('input[name="eyes-color"]');
  var userDialogFireballInput = window.wizard.userDialog.querySelector('input[name="fireball-color"]');

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
})();
