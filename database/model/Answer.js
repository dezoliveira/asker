const Sequeize = require('sequelize')
const connection = require('../database')

const Answer = connection.define("answers", {
  body: {
    type: Sequeize.TEXT,
    allowNull: false,
  },

  questionId: {
    type: Sequeize.INTEGER,
    allowNull: false
  },

  username: {
    type: Sequeize.STRING,
    allowNull: false
  }
})

Answer.sync({ force: false })

module.exports = Answer