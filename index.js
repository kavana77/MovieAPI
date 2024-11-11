const express = require('express');
const { getAllMovies, getMovieById } = require('./controllers');
const app = express();
app.use(express.json());
app.get('/movies', async (req, res) => {
  let movies = await getAllMovies();
  res.json({ movies });
});
app.get('/movies/details/:id', async (req, res) => {
  let movies = await getMovieById(parseInt(req.params.id));
  res.json({ movies });
});
module.exports = { app };
