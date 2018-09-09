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
    — отступом между количеством очков и прямоугольником и между именами игроков и прямоугольником (10x2).
*/
var barHeight = CLOUD_HEIGHT - GAP * 5 - TEXT_HEIGHT * 4;
var BAR_GAP = 50;

/* Храним в массиве многострочный текст приветствия */
var message = [
  'Ура вы победили!',
  'Список результатов:'
];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/* Рассчитывает лучшее время игрока */
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/* Возвращает случайный оттенок синего */
var getRandomColor = function () {
  return 'rgba(0, 0, 255, ' + Math.random() + ')';
};

window.renderStatistics = function (ctx, names, times) {
  /* Отрисовка холста и его тени */
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  /* Отрисовка приветствия */
  for (var i = 0; i < message.length; i++) {
    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000000';
    ctx.fillText(message[i], CLOUD_X + GAP * 2, GAP * 2 + TEXT_HEIGHT * (i + 1));
  }

  /* Храним лучшее время игрока в отдельную переменную для расчёта пропорций */
  var maxTime = getMaxElement(times);

  for (var j = 0; j < names.length; j++) {
    ctx.fillStyle = '#000000';

    /* Отрисовка имён игроков */
    var textX = CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * j;
    var textY = CLOUD_HEIGHT - GAP;
    ctx.fillText(names[j], textX, textY);

    /* Отрисовка кол-ва очков */
    textY = CLOUD_Y + GAP * 2 + TEXT_HEIGHT * 3 + (barHeight - barHeight * times[j] / maxTime);
    ctx.fillText(Math.round(times[j]), textX, textY);

    /* Отрисовка прямоугольников с показателями для наглядности */
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(textX, textY + GAP, BAR_WIDTH, barHeight * times[j] / maxTime);
    } else {
      ctx.fillStyle = getRandomColor();
      ctx.fillRect(textX, textY + GAP, BAR_WIDTH, barHeight * times[j] / maxTime);
    }
  }
};
