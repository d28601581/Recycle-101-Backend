const express = require('express');
const router = express.Router();
const { UserData } = require('../db/models');

// Express Routes for Players - Read more on routing at https://expressjs.com/en/guide/routing.html
router.get('/', async (req, res, next) => {
  try {
    const allUserData = await UserData.findAll();
    // An if/ternary statement to handle not finding allPlayers explicitly
    !allUserData
      ? res.status(404).send('Players Listing Not Found')
      : res.status(200).json(allUserData);
  } catch (error) {
    next(error);
  }
});





// Export our router, so that it can be imported to construct our api routes
module.exports = router;