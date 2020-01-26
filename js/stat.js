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

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderIntroText = function (ctx) {
  ctx.font = FONT_STYLE;
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + STATS_PADDING, CLOUD_Y + STATS_PADDING + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + STATS_PADDING, CLOUD_Y + 2 * STATS_PADDING + FONT_GAP);
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
  renderCloud(ctx, CLOUD_X + SHADOW_SHIFT, CLOUD_Y + SHADOW_SHIFT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderIntroText(ctx);

  var maxTime = Math.floor(getArrayMaxValue(times));

  // render stats
  for (var i = 0; i < players.length; i++) {
    var barHeight = Math.ceil((times[i] / maxTime) * BAR_MAX_HEIGHT);
    var randomBlue = 'hsl(240, ' + Math.ceil(Math.random() * 100) + '% , 50%)';

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + STATS_PADDING + i * (BAR_WIDTH + BAR_SPACE), CLOUD_Y + CLOUD_HEIGHT - STATS_PADDING);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + STATS_PADDING + i * (BAR_WIDTH + BAR_SPACE), CLOUD_Y + CLOUD_HEIGHT - 2 * STATS_PADDING - barHeight);

    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : randomBlue;
    ctx.fillRect(CLOUD_X + STATS_PADDING + i * (BAR_WIDTH + BAR_SPACE), CLOUD_Y + CLOUD_HEIGHT - STATS_PADDING - barHeight - FONT_GAP, BAR_WIDTH, barHeight);
  }
};
