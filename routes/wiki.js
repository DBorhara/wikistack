const router = require('express').Router();
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res) => {
  res.send('WIKI');
});

router.post('/', (req, res) => {
  res.json(req.body);
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

module.exports = router;
