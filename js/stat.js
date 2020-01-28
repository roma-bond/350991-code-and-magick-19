'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_SHIFT = 10;
var STATS_PADDING = 20;

var FONT_STYLE = '16px PT Mono';
var FONT_GAP = 15;

var BAR_WIDTH = 40;
var BAR_SPACE = 50;
var BAR_MAX_HEIGHT = 150;

var renderRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color || '#000';
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, text, x, y, color, font) {
  ctx.font = font || FONT_STYLE;
  ctx.fillStyle = color || '#000';
  ctx.fillText(text, x, y);
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

window.renderStatistics = function (ctx, players, times) {
  // render cloud and intro text
  renderRect(ctx, CLOUD_X + SHADOW_SHIFT, CLOUD_Y + SHADOW_SHIFT, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');
  renderText(ctx, 'Ура вы победили!', CLOUD_X + STATS_PADDING, CLOUD_Y + STATS_PADDING + FONT_GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + STATS_PADDING, CLOUD_Y + 2 * STATS_PADDING + FONT_GAP);

  // render stats
  var maxTime = Math.floor(getArrayMaxValue(times));

  for (var i = 0; i < players.length; i++) {
    var barHeight = Math.ceil((times[i] / maxTime) * BAR_MAX_HEIGHT);
    var randomBlue = 'hsl(240, ' + Math.ceil(Math.random() * 100) + '% , 50%)';
    var x = CLOUD_X + STATS_PADDING + i * (BAR_WIDTH + BAR_SPACE);
    var y = CLOUD_Y + CLOUD_HEIGHT - STATS_PADDING;

    renderText(ctx, Math.floor(times[i]), x, y - STATS_PADDING - barHeight);
    renderRect(ctx, x, y - barHeight - FONT_GAP, BAR_WIDTH, barHeight, (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : randomBlue);
    renderText(ctx, players[i], x, y);
  }
};
