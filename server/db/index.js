//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Friend = require('./models/Friend')
const Show = require('./models/Show')
const Rating = require('./models/Rating')
const Recommendation = require('./models/Recommendation')
// const UserShow = require('./models/Usershow')

//associations could go here!

User.belongsToMany(User, { as: 'friends', through: {model:Friend, foreignKey: "friendId", otherKey: "userId", unique: false}})
// Rating.belongsTo(User)
Rating.belongsTo(Show)
Show.hasMany(Rating)
// User.hasMany(Rating)
Rating.belongsTo(User)
User.hasMany(Rating)
User.hasMany(Recommendation)
Recommendation.belongsTo(User)

User.belongsToMany(Show, {through: {model: Rating, foreignKey: "userId", otherKey: "showId", unique: false}})
Show.belongsToMany(User, {through: {model: Rating, foreignKey: "showId", otherKey: "userId", unique: false}})


module.exports = {
  db,
  models: {
    User,
    Show,
    Friend,
    Rating,
    Recommendation
  },
}
