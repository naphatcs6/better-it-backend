const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Word = require('../models/Word')

router.get('/', (req, res, next) => {
  Word.find((err, words) => {
    if (err) return next(err);
    res.json(words);
  })
})

router.post('/', (req, res, next) => {
  Word.create(req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
  })
})

router.delete('/:id', (req, res, next) => {
  Word.findByIdAndDelete(req.params.id, (err, post) => {
      if (err) return next(err);
      res.json(post);
  })
})

module.exports = router