$( document ).ready(function() {
var slider = (function () {
  var counter = 1,
    duration = 300,
    currentDirection = 'up',
    imgList = $('.slider_first .slider__item img'),
    srcList = [],
    srcListLength = 0,
    inProcess = false;

     for (var i = 0; i < imgList.length; i++) {
       srcList[i] = imgList[i].getAttribute('src');
       srcListLength ++ ;
     };

    $('.slider__controls-top').css('background-image', 'url(\"./' + srcList[1] + '\")');
    $('.slider__controls-bottom').css('background-image', 'url(\"./' + srcList[srcListLength - 1] + '\"');
 
  var moveSlide = function (container, direction, button) {
    var items = $('.slider__item', container),
      activeItem = items.filter('.active'),
      direction = direction == 'down' ? -100 : 100;

    if (button == 'top') {
      if (counter >= items.length) counter = 0;
      var reqItem = items.eq(counter);
      reqItem.css('z-index', '1');
    };

    if (button == 'bottom') {
      if (counter == 0) counter = items.length;
      var reqItem = items.eq(counter - 2);
      reqItem.css('z-index', '1');
    };


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
      $(this).css('top', 0 +'%');
      inProcess = false;
    });
  };

  var changeBackground = function(direction){
    if (direction == 'up') {
       var topBtnCounter = counter;
       var bottomBtnCounter = counter;

       if (topBtnCounter == srcListLength - 1) {
        topBtnCounter = -1;
       }

       if (bottomBtnCounter <= 0) {
        bottomBtnCounter = srcListLength;
       }

       $('.slider__controls-top').css('background-image', 'url(\"./' + srcList[topBtnCounter + 1] + '\")');
       $('.slider__controls-bottom').css('background-image', 'url(\"./' + srcList[bottomBtnCounter - 1] + '\")');
    }
    if (direction == 'bottom') {
       var topBtnCounter = counter;
       var bottomBtnCounter = counter;

       if (bottomBtnCounter == 2) {
        bottomBtnCounter = srcListLength +2 ;
       }
       if (bottomBtnCounter == 1) {
        bottomBtnCounter = srcListLength +1;
       }

       $('.slider__controls-top').css('background-image', 'url(\"./' + srcList[topBtnCounter -1] + '\")');
       $('.slider__controls-bottom').css('background-image', 'url(\"./' + srcList[bottomBtnCounter - 3] + '\")');
    }
  };
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
          moveSlide($('.slider_first'), 'down', 'top');
          moveSlide($('.slider_opposite'), 'up', 'top');
          changeBackground('up');
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
          moveSlide($('.slider_first'), 'up', 'bottom');
          moveSlide($('.slider_opposite'), 'down', 'bottom');
          changeBackground('bottom');
          counter--;
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
});

});


