const Sequelize = require('sequelize')
const db = require('../db')


const Recommendation = db.define('recommendation', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        unique: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    showId: {
        type: Sequelize.INTEGER,
        unique: false
    },
    showName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    showImage: {
        type: Sequelize.TEXT,
        defaultValue: 'https://img.freepik.com/premium-vector/tv-show-neon-sign_191108-157.jpg?w=2000',
      },
    friendId: {
        type: Sequelize.INTEGER,
        unique: false
    },
    friendName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    like: {
        type: Sequelize.DataTypes.ENUM("THUMBS UP", "THUMBS DOWN", "NOT GOING TO WATCH", "NONE"),
        defaultValue: "NONE",
        allowNull: false,
      },
     comments: {
        type: Sequelize.TEXT,
    },
})


module.exports = Recommendation
