const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  let obj = {
    title: 'Главная страница'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/index', obj);
});

router.get('/blog', function (req, res) {
  let obj = {
    title: 'Blog'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/blog', obj);
});

router.get('/portfolio', function (req, res) {
  let obj = {
    title: 'Blog'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/portfolio', obj);
});

router.get('/admin', function (req, res) {
  let obj = {
    title: 'Admin'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/admin', obj);
});

router.get('/login', function (req, res) {
  let obj = {
    title: 'login'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/Login', obj);
});

module.exports = router;