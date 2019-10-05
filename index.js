const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const movies = require('./routes/movies');
const express = require ('express');
const app = express();


if (!config.get('mongoPassword')) {
    console.error('FATAL ERROR: mongoPassword is not defined');
    process.exit(1);
}

mongoose.connect(`mongodb+srv://admin:${config.get('mongoPassword')}@cluster0-2mffx.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
    })
    // Hasło jest w zmiennej środowiskowej.
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
