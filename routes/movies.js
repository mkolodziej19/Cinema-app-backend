const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let movie = await Movie.findOne({ filmId: req.body.filmId });
	if (movie) return res.status(400).send('Movie already registered.');

	movie = new Movie({
		filmId: req.body.filmId,
		hall: {
			number: req.body.number,
			seats: req.body.seats
		}
	}));

	movie = await movie.save()

	res.send(movie);
	
});

router.put('/:fimlId', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let movie = await Movie.findOne({ filmId: req.body.filmId}); // czy zamiast body powinno być params?
	if (!movie) return res.status(400).send("Movie doesn't exist.");

	movie.seats = req.body.seats;

	movie = await movie.save();
	
	res.send(movie);
});

router.get('/:filmId', async (req, res) => {
	const movie = await Movie.find(movieId: req.body.filmId}); // czy zamiast body powinno być params?
	res.send(movie);
});

router.delete('/:filmId', async (req, res) => {
	const { error } = validate(req.body);
	let movie = await Movie.findOne({ filmId: req.body.id}); // czy zamiast body powinno być params?
	res.send(movie);
	await movie.remove();  
});

module.exports = router;
