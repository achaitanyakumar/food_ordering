const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    res.json({
        foodItems: global.food_items,
        foodCategory: global.food_categories
    });
});

module.exports = router;
