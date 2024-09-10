const Sequeize = require('sequelize')
const connection = require('../database')

const Answer = connection.define("anwsers", {
  body: {
    type: Sequeize.TEXT,
    allowNull: false,
  },

  askId: {
    type: Sequeize.INTEGER,
    allowNull: false
  }
})

Answer.sync({ force: false })

module.exports = Answer