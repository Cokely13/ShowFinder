const Sequelize = require('sequelize')
const db = require('../db')

const Show = db.define('show', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     unique: true,
// },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  channel: {
    type: Sequelize.STRING,
    defaultValue: "Other"
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'https://img.freepik.com/premium-vector/tv-show-neon-sign_191108-157.jpg?w=2000',
  },
  createdBy: {
    type:Sequelize.INTEGER,
    defaultValue: "0"
  }

})

module.exports = Show
