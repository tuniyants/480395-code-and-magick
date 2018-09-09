'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_HEIGHT = 16;
var BAR_WIDTH = 40;
/*
  Рассчитываем максимально возможную высоту прямоугольника внутри гистограммы.
  Это разность между:
    — высотой холта (270px),
    — двойного отступа сверху и одинарного отступа снизу (10x3),
    — высотой верхнего текста, очками и именами игроков (16x4),
    — отступом между количеством очков и прямоугольником и между именем игрокам и прямоугольником (10x2).
*/
var barHeight = CLOUD_HEIGHT - GAP * 5 - TEXT_HEIGHT * 4;
var BAR_GAP = 50;

var message = [
   'Ура вы победили!',
   'Список результатом:'
 ];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  for (var i = 0; i < message.length; i++) {
    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000000';
    ctx.fillText(message[i], CLOUD_X + GAP * 2, GAP * 2 + TEXT_HEIGHT * (i + 1));
  }

  var maxTime = getMaxElement(times);

  for (var j = 0; j < names.length; j++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(names[j], CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * j, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[j]), CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * j, CLOUD_Y + GAP * 2 + TEXT_HEIGHT * 3 + (barHeight - barHeight * times[j] / maxTime));

    if (names[j] == 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * j, (CLOUD_Y + GAP * 3 + TEXT_HEIGHT * 3) + (barHeight - barHeight * times[j] / maxTime), BAR_WIDTH, barHeight * times[j] / maxTime);
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
      ctx.fillRect(CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * j, (CLOUD_Y + GAP * 3 + TEXT_HEIGHT * 3) + (barHeight - barHeight * times[j] / maxTime), BAR_WIDTH, barHeight * times[j] / maxTime);
    }
  }
}
