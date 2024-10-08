require('dotenv').config()
const Sequelize = require('sequelize')

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql'
    }
)

module.exports = connection