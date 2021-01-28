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

router.post('/newitem', async (req, res, next) => {
  console.log(req.body)
  try {
    const item = await Item.create(
      req.body
    );
    res.send(item)
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    // const item = Item.findByPk(req.params.id);

    await Item.update(
      
        {itemName: req.query.itemName,
        quantity: req.query.quantity,
        category: req.query.category,
        points: req.query.points
        }, {where:{id: req.params.id}}, {multi: true} 
      
    )
    // An if/ternary statement to handle not finding allPlayers explicitly
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Item.destroy({where:{id: req.params.id}}, {multi: true} 
    
  )
  } catch (error) {
    next(error);
  }
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
