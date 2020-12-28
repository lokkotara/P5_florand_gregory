"use strict";
const ejs = require("gulp-ejs");
const gulp = require("gulp");
 
/**
 * insert les partials dans les pages
 *
 * @return  {void} 
 */
function makeTemplate(){
  return gulp.src("./src/templates/pages/*.html")
    .pipe(ejs())
    .pipe(gulp.dest("./www"));
}


module.exports.makeTemplate = makeTemplate;