'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var userDialogWizardCoatImage = userDialog.querySelector('.setup-wizard .wizard-coat');
  var userDialogWizardEyesImage = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var userDialogWizardFireballElement = userDialog.querySelector('.setup-fireball-wrap');
  var userDialogCoatInput = userDialog.querySelector('input[name="coat-color"]');
  var userDialogEyesInput = userDialog.querySelector('input[name="eyes-color"]');
  var userDialogFireballInput = userDialog.querySelector('input[name="fireball-color"]');

  var renderWizard = function (wizard) {
    similarListElement.innerHTML = '';
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizardsBlock = function (listOfWizards) {
    var fragment = document.createDocumentFragment();
    var wizardsSelection = window.utils.getSomeArrayValues(listOfWizards, MAX_SIMILAR_WIZARD_COUNT);
    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizardsSelection[i]));
    }
    window.wizard.similarListElement.appendChild(fragment);
    window.wizard.userDialog.querySelector('.setup-similar').classList.remove('hidden');
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

  window.wizard = {
    userDialog: userDialog,
    similarListElement: similarListElement,
    renderWizardsBlock: renderWizardsBlock
  };
})();
