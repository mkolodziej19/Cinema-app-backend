const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	filmId: {
		type: String,
		required: true
	},
	hall: {
		number: Number,
		seats: Array
	}
})

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
