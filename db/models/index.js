const UserData = require('./userData');
const Item = require('./item');
const User = require('./user');
//ASSOICATIONS GO HERE -- Read more at https://sequelize.org/master/manual/assocs.html

// Item.belongsTo(User);
// User.hasMany(Item);
// UserData.belongsTo(User);
// User.hasOne(UserData);


module.exports = {
  UserData,
  Item,
  User
};
