(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _prepareSend = require('./prepareSend');

var _prepareSend2 = _interopRequireDefault(_prepareSend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formMail = document.querySelector('#mailForm');
var formLogin = document.querySelector('#loginForm');

if (formMail) {
  formMail.addEventListener('submit', prepareSendMail);
}
if (formLogin) {
  formLogin.addEventListener('submit', prepareSendLogin);
}

function prepareSendMail(e) {
  e.preventDefault();
  var data = {
    name: formMail.name.value,
    email: formMail.email.value,
    text: formMail.text.value
  };
  (0, _prepareSend2.default)('/contact', formMail, data);
}

function prepareSendLogin(e) {
  e.preventDefault();
  var data = {
    login: formLogin.login.value,
    password: formLogin.password.value
  };

  (0, _prepareSend2.default)('/login', formLogin, data, function (data) {
    if (data === 'Авторизация успешна!') {
      location.href = '/admin';
    }
  });
}

},{"./prepareSend":2}],2:[function(require,module,exports){
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

},{}]},{},[1])


//# sourceMappingURL=maps/app.js.map
