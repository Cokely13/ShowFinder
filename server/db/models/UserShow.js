const Sequelize = require('sequelize')
const db = require('../db')


const UserShow = db.define('usershow', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    rating: {
        type: Sequelize.FLOAT,
        // defaultValue: -1,
    },
    userId: {
        type: Sequelize.FLOAT,
        unique: false
    },
    showId: {
        type: Sequelize.FLOAT,
        unique: false
    },
    status: {
      type: Sequelize.DataTypes.ENUM("WATCHED", "WATCHING", "WATCHLIST", "NONE"),
      defaultValue: "NONE",
      allowNull: false,
    },
})


module.exports = UserShow
