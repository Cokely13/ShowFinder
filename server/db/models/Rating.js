const Sequelize = require('sequelize')
const db = require('../db')


const Rating = db.define('rating', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    rating: {
        type: Sequelize.FLOAT,
        defaultValue: 5,
    },
    userId: {
        type: Sequelize.FLOAT,
        unique: false
    },
    showId: {
        type: Sequelize.FLOAT,
        unique: false
    },
    showName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
      type: Sequelize.DataTypes.ENUM("WATCHED", "WATCHING", "WATCHLIST", "NONE"),
      defaultValue: "NONE",
      allowNull: false,
    },
})


module.exports = Rating
