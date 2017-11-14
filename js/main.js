var slider = (function () {
  var counter = 1,
    duration = 300,
    inProcess = false;

  var moveSlide = function (container, direction) {
    var items = $('.slider__item', container),
      activeItem = items.filter('.active'),
      direction = direction == 'down' ? 100 : -100;

    if (counter >= items.length) counter = 0;
    var reqItem = items.eq(counter);
    reqItem.css('z-index', '999');
    // var prevItem = items.eq(counter + 1);
    // // if (counter >= items.length){
    // //   prevItem = items.eq(0);
    // // }
    // console.log(items.eq());
    // prevItem.css('z-index', '999');
    activeItem.animate({
      'top': direction + '%'
    }, duration);

    reqItem.animate({
      'top': 0
    }, duration, function () {
      activeItem.removeClass('active')
        .css('top', '-' + direction + '%');
      activeItem.css('z-index', '-999');
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

          moveSlide($('.slider_first'), 'down');
          moveSlide($('.slider_opposite'), 'up');

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