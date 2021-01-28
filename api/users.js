const express = require('express');
const router = express.Router();
const { User } = require('../db/models');

// Express Routes for Players - Read more on routing at https://expressjs.com/en/guide/routing.html

router.post('/', async(req, res, next) => {
    try {
        await User.create(
            req.query
        )        
    } catch (error) {
        next(error);
    }
})





// Export our router, so that it can be imported to construct our api routes
module.exports = router;