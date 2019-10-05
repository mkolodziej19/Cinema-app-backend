const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	filmId: {
		type: Number,
		required: true
	},
	hall: {
		number: {
			type: Number
		},
		audience: Array
});

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
