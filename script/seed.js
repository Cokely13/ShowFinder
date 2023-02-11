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
    User.create({ username: 'Ryan', password: '123', admin: true }),
    User.create({ username: 'Scott', password: '123' }),
    User.create({ username: 'Jamal', password: '123' }),
    User.create({ username: 'Matt', password: '123' }),
    User.create({ username: 'Zarmon', password: '123' }),
    User.create({ username: 'Tebo', password: '123' })
  ])

  const shows = await Promise.all([
    Show.create({ name: 'The Wire', image: 'https://m.media-amazon.com/images/I/511fyhhxpWL._AC_SY580_.jpg', channel: "HBO" }),
    Show.create({ name: 'Sopranos', image: 'https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', channel: "HBO" }),
    Show.create({ name: 'Breaking Bad', image: 'https://ntvb.tmsimg.com/assets/p8696131_b_h10_aa.jpg?w=1280&h=720', channel: "NETFLIX" }),
    Show.create({ name: 'Game of Thrones', image: 'https://flxt.tmsimg.com/assets/p8553063_b_v13_ax.jpg', channel: "HBO" }),
    Show.create({ name: 'Leftovers', image: 'https://m.media-amazon.com/images/M/MV5BNTE3MDc1MjY4NV5BMl5BanBnXkFtZTgwMDg4MjQ4MTE@._V1_.jpg', channel: "HBO" }),
    Show.create({ name: 'Seinfeld', image: 'https://m.media-amazon.com/images/M/MV5BZjZjMzQ2ZmUtZWEyZC00NWJiLWFjM2UtMzhmYzZmZDcxMzllXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg', channel: "NETFLIX" }),
    Show.create({ name: 'Stranger Things', image: 'https://occ-0-58-444.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABV5lteI3eHet1nPBQKC_uEChESjqQfYpRwMWLR0wULt52odnxQtG69JNFDj9N4maZWJWDFZyi2sc1YzZ8mKE4Ajmt7Btva1CnWagGbYXVMp3t4OETM4LwiD70dHu-qWUbBAesQ.jpg?r=c68', channel: "NETFLIX" }),
    Show.create({ name: 'Black Mirror', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/black-mirror-font-1513096756.jpg?crop=1xw:1xh;center,top&resize=480:*', channel: "NETFLIX" }),
    Show.create({ name: 'Simpsons', image: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/70D3467689219126A2A5F78B340D2F168D975A15DEE2BDDF159B8EB2D3B24C0E/scale?width=1200&aspectRatio=1.78&format=jpeg', channel: "DISNEY" }),
    Show.create({ name: 'Narcos', image: 'https://i.ytimg.com/vi/iiuW754iw7o/maxresdefault.jpg', channel: "NETFLIX" }),
    Show.create({ name: 'Curb Your Enthusiasm', image: 'https://static.cdn.turner.com/styles/thumbnail_image_cropped_564x318/s3/2021-09/1643975_Curb%20Your%20Enthusiasm%20-%20S11_HO_KA_27x40_DOM_RGB.jpg?h=9296f9fb&itok=K-Gh_R89', channel: "HBO" }),
    Show.create({ name: 'Friends', image: 'https://i.shgcdn.com/3cfb514f-e69c-4450-8bcc-86f8474e5fb6/-/format/auto/-/preview/3000x3000/-/quality/lighter/', channel: "AMAZON" }),
    Show.create({ name: 'Mr. Robot', image: 'https://m.media-amazon.com/images/M/MV5BM2QyNDIzOGMtNThhNS00NmUwLWI0ZjUtZjdkN2I1OTRjZWQ3XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg', channel: "AMAZON" }),
    Show.create({ name: 'Westworld', image: 'https://m.media-amazon.com/images/M/MV5BZDg1OWRiMTktZDdiNy00NTZlLTg2Y2EtNWRiMTcxMGE5YTUxXkEyXkFqcGdeQXVyMTM2MDY0OTYx._V1_.jpg', channel: "HBO" }),
    Show.create({ name: 'Modern Family', image: 'https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/modern-family/modern-family-description-image.jpg/_jcr_content/renditions/original.JPEG', channel: "AMAZON" }),
    Show.create({ name: 'True Detective', image: 'https://m.media-amazon.com/images/M/MV5BMmRlYmE0Y2UtNDk2Yi00NzczLWEwZTEtZmE2OTcyYzcxYmU5XkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_.jpg', channel: "HBO" }),
    Show.create({ name: 'Better Call Saul', image: 'https://flxt.tmsimg.com/assets/p13837077_b_v8_aa.jpg', channel: "NETFLIX" }),
    Show.create({ name: 'Last of Us', image: 'https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg', channel: "HBO" }),
    Show.create({ name: 'White Lotus', image: 'https://m.media-amazon.com/images/M/MV5BYjdjNzBmYjEtM2Y5My00YjI0LWJjY2YtOGQ4MjNkNmE2MDVjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg', channel: "HBO" }),
    Show.create({ name: 'Yellowstone', image: 'https://ntvb.tmsimg.com/assets/p15060458_b_h8_at.jpg?w=960&h=540', channel: "OTHER" }),
    Show.create({ name: 'The Walking Dead', image: 'https://ntvb.tmsimg.com/assets/p8282918_b_h8_bn.jpg?w=960&h=540', channel: "OTHER" }),
    Show.create({ name: 'Tulsa King', image: 'https://m.media-amazon.com/images/M/MV5BYmI3N2EzOWQtZjFiMi00MjgwLTgzN2UtZGI0ZGY1ZDQyOTRiXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg', channel: "OTHER" }),
    Show.create({ name: 'Mayor of Kingstown', image: 'https://flxt.tmsimg.com/assets/p20531845_b_h8_ai.jpg', channel: "OTHER" }),
    Show.create({ name: 'The Office', image: 'https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Campaign/landingpages/library/theoffice/mainpage/office-social-min.png/_jcr_content/renditions/original', channel: "NETFLIX" }),


  ])

  const Ratings = await Promise.all([
    Rating.create({ rating: 10, userId: 1, showId: 1, showName:"The Wire", status: "WATCHED", progress: 4}),
    Rating.create({ rating: 5, userId: 2, showId: 1, showName:"The Wire", status: "WATCHED", progress: 4}),
    Rating.create({ rating: 8, userId: 1, showId: 2, showName:"Sopranos", status: "WATCHING", progress: 2}),
    Rating.create({ userId: 2, showId: 2, showName:"Sopranos",status: "WATCHLIST"}),
    Rating.create({ rating: 2, userId: 1, showId: 3,showName:"Breaking Bad", status: "WATCHING", progress: 1}),
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
