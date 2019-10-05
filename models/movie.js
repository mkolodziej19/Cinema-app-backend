const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	id: {
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
