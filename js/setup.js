'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizardsAmount = 4;

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomArrayIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getNewWizard = function () {
  var wizardData = {
    name: WIZARD_NAMES[getRandomArrayIndex(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomArrayIndex(WIZARD_SURNAMES)],
    coatColor: COAT_COLORS[getRandomArrayIndex(COAT_COLORS)],
    eyeColor: EYE_COLORS[getRandomArrayIndex(EYE_COLORS)]
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
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

var renderWizardsBlock = function () {
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var fragment = document.createDocumentFragment();
  var wizards = getWizards(wizardsAmount);
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

renderWizardsBlock();
