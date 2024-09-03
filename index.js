// express configuration
const express = require("express")
const app = express()

// ejs configuration
app.set('view engine', 'ejs')
app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
  res.render('index')
})

// listen
app.listen("3000", () => {
  console.log('liten on 3000')
})