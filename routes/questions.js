const express = require('express')
const router = express.Router()
const Question = require('../models/questions')


/* GET Random Question */
router.get('/', function(req, res, next) {
  Question.find()
    .then(question => {
      let item = question[Math.floor(Math.random() * question.length)];
      res.json(item);
    })
    .catch(err => {
      res.json(err);
    })
})

/* POST Question */
router.post('/', (req, res, next) => {
  const question = req.body.question;

  const questionObject = {
    question: question

  }
  Question.create(questionObject)
    .then(success => res.json(success))
    .catch(failure => res.json(failure))
});


/* Post vote true */
router.post('/vote-true/:id', (req, res, next) => {
  const questionId = req.params.id;
  const update = { $inc: { answerTrue: 1}};
  Question.update({_id: questionId}, update)
    .then(success => res.json(success))
    .catch(err => res.json(err))
})

/* Post vote false */
router.post('/vote-false/:id', (req, res, next) => {
  const questionId = req.params.id;
  const update = { $inc: { answerFalse: 1}};
  Question.update({_id: req.params.id}, update)
    .then(success => res.json(success))
    .catch(err => res.json(err))
})

router.get('/:id', (req, res, next) => {
  Question.findById(req.params.id)
    .then(question => res.json(question));
})



module.exports = router
