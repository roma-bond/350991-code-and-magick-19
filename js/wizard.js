'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_SIMILAR_WIZARD_NUM = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var userDialogWizardCoatImage = userDialog.querySelector('.setup-wizard .wizard-coat');
  var userDialogWizardEyesImage = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var userDialogWizardFireballElement = userDialog.querySelector('.setup-fireball-wrap');
  var userDialogCoatInput = userDialog.querySelector('input[name="coat-color"]');
  var userDialogEyesInput = userDialog.querySelector('input[name="eyes-color"]');
  var userDialogFireballInput = userDialog.querySelector('input[name="fireball-color"]');

  var coatColor = userDialogCoatInput.value;
  var eyesColor = userDialogEyesInput.value;
  var fireballColor;

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var getSimilarWizards = function (wizards) {
    wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });
    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizardsBlock = function (listOfWizards) {
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    var wizardsSelection = getSimilarWizards(listOfWizards);
    for (var i = 0; i < MAX_SIMILAR_WIZARD_NUM; i++) {
      fragment.appendChild(renderWizard(wizardsSelection[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onColorChange = window.backend.debounce(function () {
    renderWizardsBlock(window.backend.wizardsList);
  });

  userDialogWizardCoatImage.addEventListener('click', function () {
    coatColor = COAT_COLORS[window.utils.getRandomArrayIndex(COAT_COLORS)];
    userDialogWizardCoatImage.style.fill = coatColor;
    userDialogCoatInput.value = coatColor;
    onColorChange();
  });

  userDialogWizardEyesImage.addEventListener('click', function () {
    eyesColor = EYE_COLORS[window.utils.getRandomArrayIndex(EYE_COLORS)];
    userDialogWizardEyesImage.style.fill = eyesColor;
    userDialogEyesInput.value = eyesColor;
    onColorChange();
  });

  userDialogWizardFireballElement.addEventListener('click', function () {
    fireballColor = FIREBALL_COLORS[window.utils.getRandomArrayIndex(FIREBALL_COLORS)];
    userDialogWizardFireballElement.style.backgroundColor = fireballColor;
    userDialogFireballInput.value = fireballColor;
  });

  window.wizard = {
    userDialog: userDialog,
    similarListElement: similarListElement,

    renderWizardsBlock: renderWizardsBlock
  };
})();
