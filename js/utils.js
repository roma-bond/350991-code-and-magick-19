'use strict';

(function () {
  window.utils = {
    getArrayMaxValue: function (array) {
      var maxValue = array[0];
      for (var i = 1; i < array.length; i++) {
        if (array[i] > maxValue) {
          maxValue = array[i];
        }
      }
      return maxValue;
    },

    getRandomArrayIndex: function (arr) {
      return Math.floor(Math.random() * arr.length);
    }
  };
})();
