// express configuration
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

// database
const connection = require("./database/database")

// models
const Question = require('./database/model/Question')
const Answer = require('./database/model/Answer')

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

// get index
app.get('/', (req, res) => {
  res.render("index")
})

// get ask page
app.get('/ask', (req, res) => {
  res.render("pages/ask")
})

// get feed
app.get('/feed', (req, res) => {
  Question.findAll({ 
    row: true,
    order:[['id', 'DESC']]
  })

  .then((query) => {
    res.render("pages/feed", {
      questions: query
    })
  })
})

// create a new question
app.post('/create', (req, res) => {
  let title = req.body.title
  let description = req.body.description

  Question.create({
    title: title,
    description: description
  })

  .then(() => {
    res.redirect('/feed')
  })
})

// get question by ID
app.get('/question/:id', (req, res) => {
  let id = req.params.id

  Question.findOne({
    where: {id: id}
  })
  
  .then(question => {
    if (question != undefined) {

      // filter answer by question id
      Answer.findAll({
        where: { questionId: question.id },
        order: [['id', 'DESC']]
      })

      .then(answer => {
        res.render('pages/question', {
          question: question,
          answer: answer,
        })
      })

    } else {
      res.redirect('/')
    }
  })
})

// post answer by ID
app.post("/answer", (req, res) => {
  let body = req.body.body
  let questionId = req.body.question
  let username = req.body.username

  console.log(questionId)

  // create the answer
  Answer.create({
    body: body,
    questionId: questionId,
    username: username
  })

  .then(() => {
    res.redirect('/question/' + questionId)
  })
})

// listen server
app.listen("3000", () => {
  console.table(
    ['Listen on http://localhost:3000'])
})