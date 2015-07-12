var express = require('express');
var router = express.Router();

// IMPORTAR EL ENRUTADOR

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz MOOC' });
});

// RUTAS PARA LAS ACCIONES PARA QUESTION Y ANSWER

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
