const db = require('./db');
const Players = require('./db/models').Player;

// const seedPlayers = [
//   { firstName: 'Bilbo', lastName: 'Baggins', jerseyNumber: 11 },
//   { firstName: 'Harry', lastName: 'Potter', jerseyNumber: 22 },
//   { firstName: 'Lucifer', lastName: 'Morningstart', jerseyNumber: 666 },
// ];

// const seed = () => {
//   return Players.bulkCreate(seedPlayers);
// };

const seed = async () => {
  console.log('before')
  await Promise.all([
    
    Players.create({
      firstName: 'Bilbo', lastName: 'Baggins', jerseyNumber: 11
    }),
    Players.create({
      firstName: 'Harry', lastName: 'Potter', jerseyNumber: 22
    }),
    Players.create({
      firstName: 'Lucifer', lastName: 'Morningstart', jerseyNumber: 666
    }),
  ]);
  console.log('after')
}

console.log('seeding')
seed().then(() => process.exit());

module.exports = seed;
