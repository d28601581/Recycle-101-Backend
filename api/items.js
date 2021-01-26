const express = require('express');
const router = express.Router();
const { Item } = require('../db/models');

// Express Routes for Players - Read more on routing at https://expressjs.com/en/guide/routing.html
router.get('/', async (req, res, next) => {
  try {
    const allItems = await Item.findAll();
    // An if/ternary statement to handle not finding allPlayers explicitly
    !allItems
      ? res.status(404).send('Players Listing Not Found')
      : res.status(200).json(allItems);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const item = await Item.create(

      req.body
      // {
      //   itemName: req.body.itemName, quantity: req.body.quantity, category: req.body.category, points: req.body.points
      // }
    );
    
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const item = Item.findByPk(req.params.id);

    await item.update(
      {
        itemName: req.body.itemName, quantity: req.body.quantity, category: req.body.category, points: req.body.points
      }
    )
    item.save();
    // An if/ternary statement to handle not finding allPlayers explicitly
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const allItems = await Item.findAll();
    // An if/ternary statement to handle not finding allPlayers explicitly
    !allItems
      ? res.status(404).send('Players Listing Not Found')
      : res.status(200).json(allItems);
  } catch (error) {
    next(error);
  }
});





// Export our router, so that it can be imported to construct our api routes
module.exports = router;
