'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var defaultCoords;

  var userDialogOpenElement = document.querySelector('.setup-open');
  var userDialogCloseElement = window.wizard.userDialog.querySelector('.setup-close');
  var userDialogNameInput = window.wizard.userDialog.querySelector('.setup-user-name');
  var userDialogHandleElement = window.wizard.userDialog.querySelector('.upload');

  var onUserDialogEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeUserDialog();
    }
  };

  var openUserDialog = function () {
    window.wizard.userDialog.classList.remove('hidden');
    if (!defaultCoords) {
      defaultCoords = {
        x: window.wizard.userDialog.style.left,
        y: window.wizard.userDialog.style.top
      };
    } else {
      window.wizard.userDialog.style.left = defaultCoords.x;
      window.wizard.userDialog.style.top = defaultCoords.y;
    }

    document.addEventListener('keydown', onUserDialogEscPress);
  };

  var closeUserDialog = function () {
    if (document.activeElement !== userDialogNameInput) {
      window.wizard.userDialog.classList.add('hidden');
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

      window.wizard.userDialog.style.left = (window.wizard.userDialog.offsetLeft - shift.x) + 'px';
      window.wizard.userDialog.style.top = (window.wizard.userDialog.offsetTop - shift.y) + 'px';
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
    window.wizard.renderWizardsBlock();
  });

  userDialogOpenElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openUserDialog();
      window.wizard.renderWizardsBlock();
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

  userDialogHandleElement.addEventListener('mousedown', onUserDialogHandleMousedown);
})();
