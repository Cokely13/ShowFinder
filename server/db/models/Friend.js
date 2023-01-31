const Sequelize = require('sequelize')
const db = require('../db')


const Friend = db.define('friend', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     unique: true,
    // },
    userId: {
        type: Sequelize.INTEGER,
        unique: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
})


module.exports = Friend
