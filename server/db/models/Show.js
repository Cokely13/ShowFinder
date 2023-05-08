const Sequelize = require('sequelize')
const db = require('../db')

const Show = db.define('show', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    // unique: true,
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
  },
  premiered: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.STRING,
  }

})

module.exports = Show
