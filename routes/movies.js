const config = require('config');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie');

if (!config.get('emailPassword')) {
	console.error('FATAL ERROR: emailPassword is not defined');
	process.exit(1);
}  

const transporter = nodemailer.createTransport({
	jsonTransport: true,
	service: `gmail`,
	auth: {
		user: 'km8530278@gmail.com',
		pass: `${config.get('emailPassword')}`
	}
});

router.post('/', async (req, res) => {

	let movie = await Movie.findOne({ filmId: req.body.filmId });
	if (movie) return res.status(400).send('Movie already registered.');

	movie = new Movie({
		filmId: req.body.filmId,
		hall: {
			number: req.body.number,
			seats: req.body.seats
		}
	});

	movie = await movie.save()

	res.send(movie);
	
});

router.put('/:filmId', async (req, res) => {

	let oldMovie = await Movie.findOne({ filmId: req.params.filmId });

	const movie = await Movie.findOneAndUpdate({
		filmId: req.params.filmId,
		hall: {
			number: oldMovie.hall.number,
			seats: req.body.hall.seats
		}
	});

	if (!movie) return res.status(400).send("Movie doesn't exist.");

	const mailOptions = {
		from: 'km8530278@gmail.com',
		to: 'marc1911@gmail.com',//`${req.body.email}`,
		subject: 'Potwierdzenie rezerwacji',
		html: `<center><h1>Witaj</h1> <h3>Oto potwierdzenie twojej rezerwacji</h3><h4> Rezerwacja dotyczy seansu: ${req.body.seance}. Zarezerwowane miejsca to ${req.body.reservedSeats}</h4></center>`
	}
	
	transporter.sendMail(mailOptions, function(err, info){
		if(err) console.log(err)
		if(info) console.log(info)
		else console.log('Something bad had happend')
	});

	res.send(movie);

});

router.get('/:filmId', async (req, res) => {
	const movie = await Movie.find({ filmId: req.params.filmId }); // czy zamiast body powinno być params?
	res.send(movie);
});

router.delete('/:filmId', async (req, res) => {
//	const { error } = validate(req.body);
	let movie = await Movie.findOne({ filmId: req.params.id}); // czy zamiast body powinno być params?
	res.send(movie);
	await movie.remove();  
});

module.exports = router;
