'use strict';

(function () {
  var getRandomValue = function (max, min) {
    var minValue = min || 0;
    return minValue + Math.ceil(Math.random() * (max - minValue));
  };

  var getSomeArrayValues = function (array, arrayLength) {
    var arrayCopy = array.slice();
    var selection = [];
    for (var i = 0; i < arrayLength; i++) {
      var selectionElement = arrayCopy.splice(getRandomValue(arrayCopy.length - 1), 1)[0];
      selection.push(selectionElement);
    }
    return selection;
  };

  var getArrayMaxValue = function (array) {
    var maxValue = array[0];
    for (var i = 1; i < array.length; i++) {
      if (array[i] > maxValue) {
        maxValue = array[i];
      }
    }
    return maxValue;
  };

  var getRandomArrayIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  window.utils = {
    getSomeArrayValues: getSomeArrayValues,
    getArrayMaxValue: getArrayMaxValue,
    getRandomArrayIndex: getRandomArrayIndex
  };
})();
