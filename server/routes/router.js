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
  res.send('Hola mundo')
})

// Questions
router.get(`/api/${vars.questions}`, (req, res) => {
  db.ref(vars.questions).once('value', snapshot => {
    let data = snapshot.val()
    res.send(data)
  })
})

// Answers
router.get(`/api/${vars.answers}`, (req, res) => {
  db.ref(vars.answers).once('value', snapshot => {
    let data = snapshot.val()
    res.send(data)
  })
})

// Post para subir preguntas
router.post('/upload-question', (req, res) => {

})

// Post para subir respuestas
router.post('/upload-answers', (req, res) => {
  
})

module.exports = router