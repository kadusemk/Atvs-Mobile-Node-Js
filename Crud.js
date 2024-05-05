const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/moviestore', {useNewUrlParser: true, useUnifiedTopology: true});

const MovieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
  genre: String
});

const Movie = mongoose.model('Movie', MovieSchema);

const app = express();
app.use(bodyParser.json());

// Operações do CRUD
app.post('/movies', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.send(movie);
});

app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

app.put('/movies/:id', async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body);
  res.send(movie);
});

app.delete('/movies/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  res.send(movie);
});

app.listen(3000, () => console.log('Server started on port 3000'));
