'use strict';

module.exports = function(){
	$.gulp.task('sprite:png', function () {
	  $.spriteData = $.gulp.src('./source/images/*.png').pipe($.gp.spritesmith({
	    imgName: 'sprite.png',
	    cssName: 'sprite.scss'
	  }));
	  return $.spriteData.pipe($.gulp.dest($.config.root + '/assets/img'));
	});
};