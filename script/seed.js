'use strict'

const {db, models: {User, Show, Rating} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'Ryan', password: '123' }),
    User.create({ username: 'Scott', password: '123' }),
  ])

  const shows = await Promise.all([
    Show.create({ name: 'The Wire', image: 'https://m.media-amazon.com/images/I/511fyhhxpWL._AC_SY580_.jpg', channel: "HBO" }),
    Show.create({ name: 'Sopranos', image: 'https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', channel: "HBO" }),
    Show.create({ name: 'Breaking Bad', image: 'https://ntvb.tmsimg.com/assets/p8696131_b_h10_aa.jpg?w=1280&h=720', channel: "NETFLIX" }),
    Show.create({ name: 'Game of Thrones', image: 'https://flxt.tmsimg.com/assets/p8553063_b_v13_ax.jpg', channel: "HBO" }),
    Show.create({ name: 'Leftovers', image: 'https://yt3.googleusercontent.com/nWj9b_0cSPQCWznelxGwjM4xR2DNYHrowBZJX9Xp7FUd06bPPYAYTwcAJ_mqOK-SBXY8EdQUj68', channel: "HBO" })

  ])

  const Ratings = await Promise.all([
    Rating.create({ rating: 10, userId: 1, showId: 1, showName:"The Wire", status: "WATCHED"}),
    Rating.create({ rating: 5, userId: 2, showId: 1, showName:"The Wire", status: "WATCHED"}),
    Rating.create({ rating: 8, userId: 1, showId: 2, showName:"Sopranos", status: "WATCHING"}),
    Rating.create({ userId: 2, showId: 2, showName:"Sopranos",status: "WATCHLIST"}),
    Rating.create({ rating: 2, userId: 1, showId: 3,showName:"Breaking Bad", status: "WATCHING"}),
    Rating.create({ rating: 5, userId: 1, showId: 4,showName:"Game of Thrones", status: "WATCHLIST"}),
    Rating.create({ rating: 5, userId: 1, showId: 5,showName:"Leftovers", status: "WATCHLIST"}),

  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
