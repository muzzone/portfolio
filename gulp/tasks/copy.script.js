'use strict';

module.exports = function() {
  $.gulp.task('copy:script', function() {
    return $.gulp.src('./source/script/**/*.*', { since: $.gulp.lastRun('copy:script') })
      .pipe($.gulp.dest($.config.root + '/assets/js'));
  });
};
