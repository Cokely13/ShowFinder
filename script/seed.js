// 'use strict'

// const {db, models: {User, Show, Rating} } = require('../server/db')

// /**
//  * seed - this function clears the database, updates tables to
//  *      match the models, and populates the database.
//  */
// async function seed() {
//   await db.sync({ force: true }) // clears db and matches models to tables
//   console.log('db synced!')

//   // Creating Users
//   const users = await Promise.all([
//     User.create({ username: 'Ryan', password: '123', admin: true }),
//     User.create({ username: 'Scott', password: '123' }),
//     User.create({ username: 'Jamal', password: '123' }),
//     User.create({ username: 'Matt', password: '123' }),
//     User.create({ username: 'Zarmon', password: '123' }),
//     User.create({ username: 'Tebo', password: '123' })
//   ])

//   const shows = await Promise.all([
//     Show.create({ name: 'The Wire', image: 'https://m.media-amazon.com/images/I/511fyhhxpWL._AC_SY580_.jpg', channel: "HBO" }),
//     Show.create({ name: 'Sopranos', image: 'https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', channel: "HBO" }),
//     Show.create({ name: 'Breaking Bad', image: 'https://ntvb.tmsimg.com/assets/p8696131_b_h10_aa.jpg?w=1280&h=720', channel: "NETFLIX" }),
//     Show.create({ name: 'Game of Thrones', image: 'https://flxt.tmsimg.com/assets/p8553063_b_v13_ax.jpg', channel: "HBO" }),
//     Show.create({ name: 'Leftovers', image: 'https://m.media-amazon.com/images/M/MV5BNTE3MDc1MjY4NV5BMl5BanBnXkFtZTgwMDg4MjQ4MTE@._V1_.jpg', channel: "HBO" }),
//     Show.create({ name: 'Seinfeld', image: 'https://m.media-amazon.com/images/M/MV5BZjZjMzQ2ZmUtZWEyZC00NWJiLWFjM2UtMzhmYzZmZDcxMzllXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg', channel: "NETFLIX" }),
//     Show.create({ name: 'Stranger Things', image: 'https://occ-0-58-444.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABV5lteI3eHet1nPBQKC_uEChESjqQfYpRwMWLR0wULt52odnxQtG69JNFDj9N4maZWJWDFZyi2sc1YzZ8mKE4Ajmt7Btva1CnWagGbYXVMp3t4OETM4LwiD70dHu-qWUbBAesQ.jpg?r=c68', channel: "NETFLIX" }),
//     Show.create({ name: 'Black Mirror', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/black-mirror-font-1513096756.jpg?crop=1xw:1xh;center,top&resize=480:*', channel: "NETFLIX" }),
//     Show.create({ name: 'Simpsons', image: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/70D3467689219126A2A5F78B340D2F168D975A15DEE2BDDF159B8EB2D3B24C0E/scale?width=1200&aspectRatio=1.78&format=jpeg', channel: "DISNEY" }),
//     Show.create({ name: 'Narcos', image: 'https://i.ytimg.com/vi/iiuW754iw7o/maxresdefault.jpg', channel: "NETFLIX" }),
//     Show.create({ name: 'Curb Your Enthusiasm', image: 'https://static.cdn.turner.com/styles/thumbnail_image_cropped_564x318/s3/2021-09/1643975_Curb%20Your%20Enthusiasm%20-%20S11_HO_KA_27x40_DOM_RGB.jpg?h=9296f9fb&itok=K-Gh_R89', channel: "HBO" }),
//     Show.create({ name: 'Friends', image: 'https://i.shgcdn.com/3cfb514f-e69c-4450-8bcc-86f8474e5fb6/-/format/auto/-/preview/3000x3000/-/quality/lighter/', channel: "AMAZON" }),
//     Show.create({ name: 'Mr. Robot', image: 'https://m.media-amazon.com/images/M/MV5BM2QyNDIzOGMtNThhNS00NmUwLWI0ZjUtZjdkN2I1OTRjZWQ3XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg', channel: "AMAZON" }),
//     Show.create({ name: 'Westworld', image: 'https://m.media-amazon.com/images/M/MV5BZDg1OWRiMTktZDdiNy00NTZlLTg2Y2EtNWRiMTcxMGE5YTUxXkEyXkFqcGdeQXVyMTM2MDY0OTYx._V1_.jpg', channel: "HBO" }),
//     Show.create({ name: 'Modern Family', image: 'https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/modern-family/modern-family-description-image.jpg/_jcr_content/renditions/original.JPEG', channel: "AMAZON" }),
//     Show.create({ name: 'True Detective', image: 'https://m.media-amazon.com/images/M/MV5BMmRlYmE0Y2UtNDk2Yi00NzczLWEwZTEtZmE2OTcyYzcxYmU5XkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_.jpg', channel: "HBO" }),
//     Show.create({ name: 'Better Call Saul', image: 'https://flxt.tmsimg.com/assets/p13837077_b_v8_aa.jpg', channel: "NETFLIX" }),
//     Show.create({ name: 'Last of Us', image: 'https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg', channel: "HBO" }),
//     Show.create({ name: 'White Lotus', image: 'https://m.media-amazon.com/images/M/MV5BYjdjNzBmYjEtM2Y5My00YjI0LWJjY2YtOGQ4MjNkNmE2MDVjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg', channel: "HBO" }),
//     Show.create({ name: 'Yellowstone', image: 'https://ntvb.tmsimg.com/assets/p15060458_b_h8_at.jpg?w=960&h=540', channel: "OTHER" }),
//     Show.create({ name: 'The Walking Dead', image: 'https://ntvb.tmsimg.com/assets/p8282918_b_h8_bn.jpg?w=960&h=540', channel: "OTHER" }),
//     Show.create({ name: 'Tulsa King', image: 'https://m.media-amazon.com/images/M/MV5BYmI3N2EzOWQtZjFiMi00MjgwLTgzN2UtZGI0ZGY1ZDQyOTRiXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg', channel: "OTHER" }),
//     Show.create({ name: 'Mayor of Kingstown', image: 'https://flxt.tmsimg.com/assets/p20531845_b_h8_ai.jpg', channel: "OTHER" }),
//     Show.create({ name: 'The Office', image: 'https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Campaign/landingpages/library/theoffice/mainpage/office-social-min.png/_jcr_content/renditions/original', channel: "NETFLIX" }),
//     Show.create({ name: "What We Do in the Shadows" , image:"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/A046F94E02B33FB4BF4C80A3AD1EACB55A316636A72CF3C9822E573C2E8C8A96/scale?width=1200&aspectRatio=1.78&format=jpeg"}),
//     Show.create({ name: "Oz", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Ozposter.jpg/225px-Ozposter.jpg"}),
//     Show.create({ name: "The Good Fight", image: "https://m.media-amazon.com/images/M/MV5BMDI3OThlOTUtZGY0ZC00NmNlLTk2YTEtYjA3NjE3ODAwZjMzXkEyXkFqcGdeQXVyODM0NDY1ODY@._V1_FMjpg_UX1000_.jpg"}),
//     Show.create({ name: "The Odd Couple", image: 'https://m.media-amazon.com/images/M/MV5BNmQ1YTFmYTUtOTQyYi00YzMxLTk0NDUtMWZjODJmMTNlNGIyXkEyXkFqcGdeQXVyMTk0MjQ3Nzk@._V1_.jpg'}),
//     Show.create({ name: "Rick and Morty", image: "https://resizing.flixster.com/x8gJp78ygKg_VQbdHpuDHdIijnE=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vUlRUVjU5NjY2My53ZWJw"}),
//     Show.create({ name: "Squid Game", image: "https://m.economictimes.com/thumb/msid-97982008,width-1440,height-1080,resizemode-4,imgsize-99866/squid-game-season-2-heres-everything-we-know-about-the-netflix-series.jpg"}),
//     Show.create({ name: "NewsRadio", image: "https://www.tvguide.com/a/img/catalog/provider/1/1/1-1525530834.JPG"}),
//     Show.create({ name: "The Wonder Years", image:"https://m.media-amazon.com/images/M/MV5BMTBlMDI0ZWUtNWZmNC00ODNlLWJiNzItN2MxYzJhNzI2YjUyXkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_.jpg"}),
//     Show.create({ name: "The Crown", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/The_Crown_season_2.jpeg/220px-The_Crown_season_2.jpeg"}),
//     Show.create({ name: "The Kids in the Hall", image:"https://m.media-amazon.com/images/M/MV5BMTI2MDY0NzI4NV5BMl5BanBnXkFtZTcwNzUyMzEzMQ@@._V1_.jpg"}),
//     Show.create({ name: "Orange is the New Black", image:"https://akns-images.eonline.com/eol_images/Entire_Site/201869/rs_634x939-180709061638-634-oitnb-s6.ch.070918.jpg?fit=around%7C634:939&output-quality=90&crop=634:939;center,top"}),
//     Show.create({ name: "Fargo", image:"http://static.next-episode.net/tv-shows-images/huge/fargo.jpg"}),
//     Show.create({ name: "It's Always Sunny in Philadelphia", image:"https://m.media-amazon.com/images/M/MV5BMzg3ODVjZTYtZTAyNC00MzVjLTk3NmUtMGI4ZjZmNGQ1NmY4XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg"}),
//     Show.create({ name: "Band of Brothers", image:"https://resizing.flixster.com/8PrK7bOcPTGabSGj7Js1I6EXUyw=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvUlRUVjE1MjEzMC53ZWJw"}),
//     Show.create({ name: "Sex and the City", image:"https://m.media-amazon.com/images/M/MV5BNGEyNDRjM2QtY2VlYy00OWRhLWI4N2UtZTM4NDc0MGM0YzBkXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_.jpg"}),
//     Show.create({ name: "Justified", image:"https://upload.wikimedia.org/wikipedia/en/8/8f/JustifiedSsn1.jpg"}),
//     Show.create({ name: "Frasier", image:"https://upload.wikimedia.org/wikipedia/en/b/b7/Frasier_S5_DVD.jpg"}),
//     Show.create({ name: "Buffy The Vampire Slayer", image:"https://m.media-amazon.com/images/M/MV5BY2MwOGIyZGYtNzgxZC00N2Q5LTllYjItM2U4MTkwMDBjYzUyXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_FMjpg_UX1000_.jpg"}),
//     Show.create({ name: "Chappelle's Show", image:"https://m.media-amazon.com/images/M/MV5BOWNjYTg5NGMtOWRjNy00ZGNlLTg2MmYtZjQ5NTM0MTQxOGM2XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"}),
//     Show.create({ name: "Girls", image:"https://m.media-amazon.com/images/M/MV5BMTU1Mzk2ODEzN15BMl5BanBnXkFtZTgwNDQwMjAxMTI@._V1_FMjpg_UX1000_.jpg"}),
//     Show.create({ name: "Community", image:"https://m.media-amazon.com/images/M/MV5BNDQ5NDZiYjktZmFmMy00MjAxLTk1MDktOGZjYTY5YTE1ODdmXkEyXkFqcGdeQXVyNjcwMzEzMTU@._V1_.jpg"}),
//     Show.create({ name: "Halt and Catch Fire", image:"https://m.media-amazon.com/images/M/MV5BZmVkZmQ1MWQtNjE0NS00NjYzLTk1ZTEtYzMyNTA3ZWU0NGMyXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_FMjpg_UX1000_.jpg"}),
//     Show.create({ name: "Er", image:"https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Cast_Season_15.jpg/275px-Cast_Season_15.jpg"}),
//     Show.create({ name: "Barry", image:"https://m.media-amazon.com/images/M/MV5BMzE0MDNiNDMtZTQ4Ni00MmQ4LTk4YzktZjFkYTVmODEzMDc2XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_.jpg"}),
//     Show.create({ name: "X-Files", image:"https://m.media-amazon.com/images/M/MV5BZDA0MmM4YzUtMzYwZC00OGI2LWE0ODctNzNhNTkwN2FmNTVhXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg"}),
//     Show.create({ name: "The Shield", image:"https://upload.wikimedia.org/wikipedia/en/6/69/TheShieldTitle.JPG"}),
//     Show.create({ name: "The West Wing", image:"https://m.media-amazon.com/images/M/MV5BNjk3ZWE3ZDctN2Q1YS00NzNhLWFjNmYtZTkwYWQxZmQ3NzM3XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_FMjpg_UX1000_.jpg"}),
//     Show.create({ name: "Insecure", image:"https://m.media-amazon.com/images/M/MV5BMjMyMTIxNzU2NV5BMl5BanBnXkFtZTgwNDQxMzEyNjM@._V1_.jpg"}),
//     Show.create({ name: "Bojack Horseman", image:"https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg"}),
//     Show.create({ name: "The Good Place", image:"https://m.media-amazon.com/images/M/MV5BYmMxNjM0NmItNGU1Mi00OGMwLTkzMzctZmE3YjU1ZDE4NmFjXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_FMjpg_UX1000_.jpg"}),
//     Show.create({ name: "Arrested Development", image:"https://upload.wikimedia.org/wikipedia/en/e/ec/Arrested_Development_S1_DVD.jpg"}),
//     Show.create({ name: "Lost", image:"https://m.media-amazon.com/images/M/MV5BNzhlY2E5NDUtYjJjYy00ODg3LWFkZWQtYTVmMzU4ZWZmOWJkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"}),
//     Show.create({ name: "Friday Night Lights", image:"https://upload.wikimedia.org/wikipedia/en/b/bc/FNL_S5_DVD.jpg"}),
//     Show.create({ name: "Deadwood", image:"https://m.media-amazon.com/images/M/MV5BNDJhMjUzMDYtNzc4MS00Nzk2LTkyMGQtN2M5NTczYTZmYmY5XkEyXkFqcGdeQXVyMzU3MTc5OTE@._V1_.jpg"}),
//     Show.create({ name: "Watchmen", image:"https://m.media-amazon.com/images/M/MV5BYjhhZDE3NjgtMjkzNC00NzI3LWJhOTItMWQ5ZjljODA5NWNkXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg"}),
//     Show.create({ name: "30 Rock", image:"https://m.media-amazon.com/images/M/MV5BMTQ4NDQ4OTUzOV5BMl5BanBnXkFtZTcwMjMzMTUyNw@@._V1_.jpg"}),
//     Show.create({ name: "The Americans", image:"https://m.media-amazon.com/images/M/MV5BMjIzNTEzMDY3OF5BMl5BanBnXkFtZTcwMzI5NDI5OA@@._V1_.jpg"}),
//     Show.create({ name: "Veep", image:"https://m.media-amazon.com/images/M/MV5BMjE2NDM0OTEwMl5BMl5BanBnXkFtZTgwNzgwNDI0ODE@._V1_.jpg"}),
//     Show.create({ name: "Atlanta", image:"https://m.media-amazon.com/images/M/MV5BZGU1MzRhNmMtNDExOS00NTk2LWJlYzMtMzc4YWYyN2Q3M2ZmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"}),
//     Show.create({ name: "Fleabag", image:"https://m.media-amazon.com/images/M/MV5BMjA4MzU5NzQxNV5BMl5BanBnXkFtZTgwOTg3MDA5NzM@._V1_.jpg"}),
//   ])

//   const Ratings = await Promise.all([
//     Rating.create({ rating: 10, userId: 1, showId: 1, showName:"The Wire", status: "WATCHED", progress: 4}),
//     Rating.create({ rating: 5, userId: 2, showId: 1, showName:"The Wire", status: "WATCHED", progress: 4}),
//     Rating.create({ rating: 8, userId: 1, showId: 2, showName:"Sopranos", status: "WATCHING", progress: 2}),
//     Rating.create({ userId: 2, showId: 2, showName:"Sopranos",status: "WATCHLIST"}),
//     Rating.create({ rating: 2, userId: 1, showId: 3,showName:"Breaking Bad", status: "WATCHING", progress: 1}),
//     Rating.create({ rating: 5, userId: 1, showId: 4,showName:"Game of Thrones", status: "WATCHLIST"}),
//     Rating.create({ rating: 5, userId: 1, showId: 5,showName:"Leftovers", status: "WATCHLIST"}),

//   ])

//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
//   return {
//     users: {
//       cody: users[0],
//       murphy: users[1]
//     }
//   }
// }

// /*
//  We've separated the `seed` function from the `runSeed` function.
//  This way we can isolate the error handling and exit trapping.
//  The `seed` function is concerned only with modifying the database.
// */
// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// /*
//   Execute the `seed` function, IF we ran this module directly (`node seed`).
//   `Async` functions always return a promise, so we can use `catch` to handle
//   any errors that might occur inside of `seed`.
// */
// if (module === require.main) {
//   runSeed()
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed

const { db, models: { User, Show } } = require('../server/db');
const axios = require('axios');

const baseURL = 'http://api.tvmaze.com';
const API_KEY = '9BNGjUxBbrFaisuV-xKIATvtUuKaZYG9';
const PAGE_SIZE = 250;
const TOTAL_SHOWS = 500;

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'Ryan', email: "ryan.cokely@gmail.com",  password: '123', admin: true }),
    User.create({ username: 'Ac', email: "ac@gmail.com",  password: '123' }),
    User.create({ username: 'Val', email: "val@gmail.com",  password: '123' }),
    User.create({ username: 'Jeff', email: "jeff@gmail.com",  password: '123' }),
  ]);

  // Creating TV Shows
  for (let page = 0; page < TOTAL_SHOWS / PAGE_SIZE; page++) {
    const response = await axios.get(`${baseURL}/shows`, {
      params: {
        page,
        limit: PAGE_SIZE,
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    const shows = response.data;
    for (const show of shows) {
      const { name, premiered, image, status } = show;

      await Show.create({ name, premiered, image: image?.medium, status});
    }
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
