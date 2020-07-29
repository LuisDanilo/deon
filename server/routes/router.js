const {Router} = require('express')
const firebaseAdmin = require('firebase-admin')
const vars = require('../assets/js/vars')

let serviceAccount = require("../deon-9db24-firebase-adminsdk-f40h7-dd6ec5c39f.json");
const { answers } = require('../assets/js/vars');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://deon-9db24.firebaseio.com"
});

const db = firebaseAdmin.database()

const router = Router()

router.get('/', (req, res) => {
  res.send('Aqui no hay nada que ver señores, esto es el backend >:c')
})

router.get(`/${vars.register}`, (req, res) => {
  res.render('index', {postAnswers: vars.postAnswers, postQuestions: vars.postQuestions})
})

router.get('/api/questions', (req, res) => {
  res.redirect(`/api/${vars.getQuestions}`)
})

// Questions
router.get(`/api/${vars.getQuestions}`, (req, res) => {
  // Hacer referencia a la colección de preguntas, y tomar un snapshot
  db.ref(vars.getQuestions).once('value', snapshot => {
    // Obtener toda la data del snapshot
    let data = snapshot.exportVal()
    // Obtener arreglo de keys (ids de las preguntas)
    let keys = Object.keys(data)
    // Obtener id de pregunta de forma aleatoria
    let randomQuestionId = keys[keys.length * Math.random() << 0]
    // Generar objeto con la pregunta y sus opciones
    let response = {
      questionId: randomQuestionId,
      question: data[randomQuestionId]['question'],
      options: data[randomQuestionId]['options'],
      joke: data[randomQuestionId]['joke']
    }
    res.send(response)
  })
})

router.get('/api/answers/:id', (req, res) => {
  res.redirect(`/api/${vars.getAnswers}/${req.params.id}`)
})

// Answers
router.get(`/api/${vars.getAnswers}/:id`, (req, res) => {
  // Hacer referencia a la colección de respuestas, y tomar un snapshot
  db.ref(vars.getAnswers).once('value', snapshot => {
    // Obtener toda la data del snapshot
    let data = snapshot.exportVal()
    // Obtener arreglo de keys (ids de las preguntas)
    let keys = Object.keys(data)
    // Obtener id de la respuesta requerida (que es el mismo id de la pregunta a responder)
    let answerRequired = req.params.id
    // Generar objeto con la respuesta (id de la respuesta, respuesta en si si es una broma)
    let response = {
      answerId: answerRequired,
      answer: data[answerRequired]
    }
    res.send(response)
  })
})

// Post para subir preguntas
router.post(`/${vars.postAnswers}`, (req, res) => {
  res.send('Subir respuesta')
})

// Post para subir respuestas
router.post(`/${vars.postQuestions}`, (req, res) => {
  res.send('Subir pregunta')
})

module.exports = router