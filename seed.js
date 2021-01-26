const db = require('./db');
const Item = require('./db/models').Item;

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
    
    Item.create({
      itemName: 'Bottle', quantity: 5, category: 'plastic', points: 10
    }),
  ]);
  console.log('after')
}

console.log('seeding')
seed().then(() => process.exit());

module.exports = seed;
