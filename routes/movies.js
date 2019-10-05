const config = require('config');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

if (!config.get('emailPassword')) {
	console.error('FATAL ERROR: emailPassword is not defined');
	process.exit(1);
}  

const transporter = nodemailer.createTransport({
	service: `gmail`,
	auth: {
		user: 'km8530278@gmail.com',
		pass: `m1k23456`
	}
});

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
	});

	movie = await movie.save()

	res.send(movie);
	
});

router.put('/:fimlId', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let movie = await Movie.findOne({ filmId: req.body.filmId }); // czy zamiast body powinno być params?
	if (!movie) return res.status(400).send("Movie doesn't exist.");

	movie.seats = req.body.seats;

	movie = await movie.save();

	const mailOptions = {
		from: 'km8530278@gmail.com',
		to: `${req.body.email}`,
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
	const movie = await Movie.find({ movieId: req.body.filmId }); // czy zamiast body powinno być params?
	res.send(movie);
});

router.delete('/:filmId', async (req, res) => {
	const { error } = validate(req.body);
	let movie = await Movie.findOne({ filmId: req.body.id}); // czy zamiast body powinno być params?
	res.send(movie);
	await movie.remove();  
});

module.exports = router;
