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
  db.ref(vars.getQuestions).once('value', snapshot => {
    let data = snapshot.val()
    res.send(data)
  })
})

router.get('/api/answers', (req, res) => {
  res.redirect(`/api/${vars.getAnswers}`)
})

// Answers
router.get(`/api/${vars.getAnswers}`, (req, res) => {
  db.ref(vars.getAnswers).once('value', snapshot => {
    let data = snapshot.val()
    res.send(data)
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