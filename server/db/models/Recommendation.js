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
    friendId: {
        type: Sequelize.INTEGER,
        unique: false
    },
    friendName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    like: {
        type: Sequelize.DataTypes.ENUM("THUMBS UP", "THUMBS DOWN", "NONE"),
        defaultValue: "NONE",
        allowNull: false,
      },
})


module.exports = Recommendation
