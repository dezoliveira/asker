// express configuration
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

// database
const connection = require("./database/database")

// model
const Question = require('./database/model/Question')

connection
  .authenticate()
  .then(() => {
    console.log('connection ok')
  })
  .catch((err) => {
    console.log(err)
  })

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ejs configuration
app.set('view engine', 'ejs')
app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
  res.render("index")
})

app.get('/ask', (req, res) => {
  res.render("pages/ask")
})

app.get('/feed', (req, res) => {
  Question.findAll({ row: true, order:[
    ['id', 'DESC']
  ] })
    .then((query) => {
      res.render("pages/feed", {
        questions: query
      })
    })
})

app.post('/create', (req, res) => {
  let title = req.body.title
  let description = req.body.description

  Question.create({
    title: title,
    description: description
  }).then(() => {
    res.redirect('/feed')
  })
})

app.get('/question/:id', (req, res) => {
  let id = req.params.id

  Question.findOne({
    where: {id: id}
  }).then(question => {
    if (question != undefined) {
      res.render('pages/question')
    } else {
      res.redirect('/')
    }
  })
})

// listen
app.listen("3000", () => {
  console.log('liten on 3000')
})