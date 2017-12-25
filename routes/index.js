const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res) {
  let obj = {
    title: 'Главная страница'
  };
  Object.assign(obj, req.app.locals.settings);
  const Model = mongoose.model('pic');
  Model
    .find()
    .then(items => {
      // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
      // записей в блоге
      Object.assign(obj, {items: items});
      res.render('pages/index', obj);
    });
});

router.get('/blog', function (req, res) {
  let obj = {
    title: 'Blog'
  };
  Object.assign(obj, req.app.locals.settings);
  const Model = mongoose.model('blog');
    //получаем список записей в блоге из базы
  Model
    .find()
    .then(items => {
      // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
      // записей в блоге
      Object.assign(obj, {items: items});
      res.render('pages/blog', obj);
    });
});

router.get('/portfolio', function (req, res) {
  let obj = {
    title: 'Blog'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/portfolio', obj);
});

router.get('/login', function (req, res) {
  let obj = {
    title: 'login'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/login', obj);
});

module.exports = router;