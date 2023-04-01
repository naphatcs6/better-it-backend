const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Intent = require('../models/Intent')

router.get('/', (req, res, next) => {
  Intent.find((err, intents) => {
    if (err) return next(err);
    res.json(intents);
  })
})

router.post('/', (req, res, next) => {
  Intent.create(req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
  })
})

module.exports = router