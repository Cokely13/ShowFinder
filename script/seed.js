

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

// const { db, models: { User, Show } } = require('../server/db');
// const axios = require('axios').default;

// const baseURL = 'http://api.tvmaze.com';
// const API_KEY = '9BNGjUxBbrFaisuV-xKIATvtUuKaZYG9';
// const PAGE_SIZE = 250;
// const TOTAL_SHOWS = 500;

// async function seed() {
//   await db.sync({ force: true }); // clears db and matches models to tables
//   console.log('db synced!');

//   // Creating Users
//   const users = await Promise.all([
//     User.create({ username: 'Ryan', email: "ryan.cokely@gmail.com",  password: '123', admin: true }),
//     User.create({ username: 'Ac', email: "ac@gmail.com",  password: '123' }),
//     User.create({ username: 'Val', email: "val@gmail.com",  password: '123' }),
//     User.create({ username: 'Jeff', email: "jeff@gmail.com",  password: '123' }),
//   ]);

//   // Creating TV Shows
//   for (let page = 0; page < TOTAL_SHOWS / PAGE_SIZE; page++) {
//     const response = await axios.get(`${baseURL}/shows`, {
//       params: {
//         page,
//         limit: PAGE_SIZE,
//       },
//       headers: {
//         'Content-Type': 'application/json;charset=UTF-8',
//         'Accept': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`,
//       },
//     });

//     const shows = response.data;
//     for (const show of shows) {
//       const { name, premiered, image, status } = show;

//       await Show.create({ name, premiered, image: image?.medium, status});
//     }
//   }

//   console.log(`seeded ${users.length} users`);
//   console.log(`seeded successfully`);
//   return {
//     users: {
//       cody: users[0],
//       murphy: users[1],
//     },
//   };
// }

// /*
//  We've separated the `seed` function from the `runSeed` function.
//  This way we can isolate the error handling and exit trapping.
//  The `seed` function is concerned only with modifying the database.
// */
// async function runSeed() {
//   console.log('seeding...');
//   try {
//     await seed();
//   } catch (err) {
//     console.error(err);
//     process.exitCode = 1;
//   } finally {
//     console.log('closing db connection');
//     await db.close();
//     console.log('db connection closed');
//   }
// }

// /*
//   Execute the `seed` function, IF we ran this module directly (`node seed`).
//   `Async` functions always return a promise, so we can use `catch` to handle
//   any errors that might occur inside of `seed`.
// */
// if (module === require.main) {
//   runSeed();
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed;


// const { db, models: { User, Show } } = require('../server/db');
// const fetch = require('node-fetch');

// const baseURL = 'http://api.tvmaze.com';
// const API_KEY = '9BNGjUxBbrFaisuV-xKIATvtUuKaZYG9';
// const PAGE_SIZE = 250;
// const TOTAL_SHOWS = 500;

// async function seed() {
//   await db.sync({ force: true }); // clears db and matches models to tables
//   console.log('db synced!');

//   // Creating Users
//   const users = await Promise.all([
//     User.create({ username: 'Ryan', email: "ryan.cokely@gmail.com",  password: '123', admin: true }),
//     User.create({ username: 'Ac', email: "ac@gmail.com",  password: '123' }),
//     User.create({ username: 'Val', email: "val@gmail.com",  password: '123' }),
//     User.create({ username: 'Jeff', email: "jeff@gmail.com",  password: '123' }),
//   ]);

//   // Creating TV Shows
//   for (let page = 0; page < TOTAL_SHOWS / PAGE_SIZE; page++) {
//     const url = `${baseURL}/shows?page=${page}&limit=${PAGE_SIZE}`;
//     const response = await fetch(url, {
//       headers: {
//         'Content-Type': 'application/json;charset=UTF-8',
//         'Accept': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`,
//       },
//     });

//     const shows = await response.json();
//     for (const show of shows) {
//       const { name, premiered, image, status } = show;

//       await Show.create({ name, premiered, image: image?.medium, status});
//     }
//   }

//   console.log(`seeded ${users.length} users`);
//   console.log(`seeded successfully`);
//   return {
//     users: {
//       cody: users[0],
//       murphy: users[1],
//     },
//   };
// }

// async function runSeed() {
//   console.log('seeding...');
//   try {
//     await seed();
//   } catch (err) {
//     console.error(err);
//     process.exitCode = 1;
//   } finally {
//     console.log('closing db connection');
//     await db.close();
//     console.log('db connection closed');
//   }
// }

// if (module === require.main) {
//   runSeed();
// }

// module.exports = seed;

const { db, models: { User, Show } } = require('../server/db');
const fetch = require('cross-fetch');

const baseURL = 'http://api.tvmaze.com';
const API_KEY = '9BNGjUxBbrFaisuV-xKIATvtUuKaZYG9';
const PAGE_SIZE = 250;
const TOTAL_SHOWS = 500;

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ username: 'Ryan', email: "ryan.cokely@gmail.com",  password: '123', admin: true }),
    User.create({ username: 'Ac', email: "ac@gmail.com",  password: '123' }),
    User.create({ username: 'Val', email: "val@gmail.com",  password: '123' }),
    User.create({ username: 'Jeff', email: "jeff@gmail.com",  password: '123' }),
  ]);

  for (let page = 0; page < TOTAL_SHOWS / PAGE_SIZE; page++) {
    const url = `${baseURL}/shows?page=${page}&limit=${PAGE_SIZE}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    const shows = await response.json();
    for (const show of shows) {
      const { name, premiered, image, status } = show;

      const imageMedium = image ? image.medium : null; // Use conditional (ternary) operator
      await Show.create({ name, premiered, image: imageMedium, status });
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

if (module === require.main) {
  runSeed();
}

module.exports = seed;

