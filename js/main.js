var slider = (function () {
  var counter = 1,
    duration = 300,
    currentDirection = 'up',
    // oppositeItems = $('.slider_opposite li'),
    // firstItems = $('.slider_first li'),
    inProcess = false;

  var moveSlide = function (container, direction) {
    var items = $('.slider__item', container),
      activeItem = items.filter('.active'),
      direction = direction == 'down' ? -100 : 100;

    if (counter >= items.length) counter = 0;
    var reqItem = items.eq(counter);
    reqItem.css('z-index', '1');

    activeItem.animate({
      'top': direction + '%'
    }, duration);

    reqItem.animate({
      'top': 0
    }, duration, function () {
      activeItem.removeClass('active')
        .css('top', -direction + '%');
      activeItem.css('z-index', '-1');
      $(this).addClass('active');
      inProcess = false;
    });
  }

  return {
    init: function () {
      $('.slider__controls-top').on('click', function (e) {
        e.preventDefault();

        if (!inProcess) {
          inProcess = true;
           if (currentDirection == 'down') {
             $('.slider_opposite .slider__item').not(".active").css('top', -100 + '%');
             $('.slider_first .slider__item').not(".active").css('top', 100 + '%');
             currentDirection = 'up';
          };
          moveSlide($('.slider_first'), 'down');
          moveSlide($('.slider_opposite'), 'up');

          counter++;
        }
      });
      $('.slider__controls-bottom').on('click', function (e) {
        e.preventDefault();

        if (!inProcess) {
          inProcess = true;
          if (currentDirection == 'up') {
             $('.slider_opposite .slider__item').not(".active").css('top', 100 + '%');
             $('.slider_first .slider__item').not(".active").css('top', -100 + '%');
             currentDirection = 'down';
          };
          moveSlide($('.slider_first'), 'up');
          moveSlide($('.slider_opposite'), 'down');

          counter++;
        }
      });
    }
  }
}());

$(function () {
  slider.init();

  var deferred = $.Deferred();
  var deferred2 = $.Deferred();

  $('.res').on('click', function (e) {
    e.preventDefault();

    setTimeout(function(){
      deferred.resolve();
    }, 2000);

  });

  $('.rej').on('click', function (e) {
    e.preventDefault();

    setTimeout(function(){
      deferred2.resolve();
    }, 3000);

  });

  deferred.done(function() {
    console.log('deferref is done!!');
  });

  deferred2.fail(function() {
    console.log('deferred is failed!!');
  });

  $.when(deferred, deferred2).done(function(){
    console.log('Оба объекта в состоянии resolve');
  });

});