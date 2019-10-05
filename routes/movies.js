const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let movie = await Movie.findOne({ filmId: req.body.filmId });
    if (movie) return res.status(400).send('Movie already registered.');

    movie = new Movie(_.pick(req.body, ['filmId', 'hall']));
    
});

module.exports = router;
