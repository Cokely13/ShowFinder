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
    image: {
        type: Sequelize.TEXT,
        defaultValue: 'https://img.freepik.com/premium-vector/tv-show-neon-sign_191108-157.jpg?w=2000',
      },
    progress: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            max: 4,
            min: 0
          },
      },
})


module.exports = Rating
