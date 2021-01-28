
const {Item} = require('./db/models');

const seedPlayers = [
  { itemName: 'Bottle', quantity: 5, category: 'plastic', points: 10},
];

const seed = () => {
  return Item.bulkCreate(seedPlayers);
};

// const seed = async () => {
//   console.log('before')
//   await Promise.all([
    
//     Item.create({
//       itemName: 'Bottle', quantity: 5, category: 'plastic', points: 10
//     }),
//   ]);
//   console.log('after')
// }

console.log('seeding')
seed().then(() => process.exit());

module.exports = seed;
