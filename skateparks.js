const express = require('express');
const router = express.Router();
const Skatepark = require('../models/skatepark');


router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
});

router.get('/', async (req, res) => {
    try {
        const { city } = req.query;
        let query = {};

        if (city) {
            query.city = city;
        }

        const skateparks = await Skatepark.find(query);

        if (skateparks.length === 0) {
            return res.status(404).json({ message: 'W podanym mieście nie ma skateparków.' });
        }

        res.json(skateparks);
    } catch (error) {
        console.error('Error retrieving skateparks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
