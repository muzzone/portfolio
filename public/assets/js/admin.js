(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

var _prepareSend = require('./prepareSend');

var _prepareSend2 = _interopRequireDefault(_prepareSend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formUpload = document.querySelector('#upload');
var formBlog = document.querySelector('#blog');

// formUpload.addEventListener('submit', prepareSendFile);
formBlog.addEventListener('submit', prepareSendPost);

// function prepareSendFile(e) {
//   e.preventDefault();
//   let resultContainer = formUpload.querySelector('.status');
//   let formData = new FormData();
//   let file = document
//     .querySelector('#file-select')
//     .files[0];
//   let name = document
//     .querySelector('#file-desc')
//     .value;

//   formData.append('photo', file, file.name);
//   formData.append('name', name);

//   resultContainer.innerHTML = 'Uploading...';
//   fileUpload('/admin/upload', formData, function (data) {
//     resultContainer.innerHTML = data;
//     formUpload.reset();
//   });
// }

function prepareSendPost(e) {
  e.preventDefault();
  var data = {
    title: formBlog.title.value,
    date: formBlog.date.value,
    text: formBlog.text.value
  };
  (0, _prepareSend2.default)('/admin/addpost', formBlog, data);
};

//////////////////NAV/////////////////////

var selected_A = $('#adminNav a');
var tab;
var href;
selected_A = selected_A[0];

var nav = document.getElementById('adminNav');
nav.onclick = function (event) {
  event.preventDefault();
  var target = event.target; // где был клик?
  if (target.tagName != 'A') return;

  changeTab(target);
};

function changeTab(node) {
  if (selected_A) {
    href = selected_A.getAttribute('href');
    tab = document.getElementsByClassName(href);
    tab[0].classList.remove('activeTab');
    selected_A.classList.remove('active');
  }
  selected_A = node;
  href = selected_A.getAttribute('href');
  tab = document.getElementsByClassName(href);
  tab[0].classList.add('activeTab');
  selected_A.classList.add('active');
}

////////////////////////////////////////////
// var windowHeight = window.innerHeight;
// windowHeight = windowHeight - 140;
// $('.tab').css('min-height', windowHeight);
// $('.tabs').css('height', $('.tab').css('min-height'));

},{"./prepareSend":2,"./upload":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareSend;

var _sendAjax = require('./sendAjax');

var _sendAjax2 = _interopRequireDefault(_sendAjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareSend(url, form, data, cb) {
  var resultContainer = form.querySelector('.status');
  resultContainer.innerHTML = 'Sending...';
  (0, _sendAjax2.default)(url, data, function (data) {
    form.reset();
    resultContainer.innerHTML = data;
    if (cb) {
      cb(data);
    }
  });
}

},{"./sendAjax":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    var result = void 0;
    try {
      result = JSON.parse(xhr.responseText);
    } catch (e) {
      cb('Извините в данных ошибка');
    }
    cb(result.status);
  };
  xhr.send(JSON.stringify(data));
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);

  xhr.onload = function (e) {
    var result = JSON.parse(xhr.responseText);
    cb(result.status);
  };

  xhr.send(data);
};

},{}]},{},[1])


//# sourceMappingURL=maps/admin.js.map
