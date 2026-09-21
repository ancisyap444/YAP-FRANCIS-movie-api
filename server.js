const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Serve static frontend files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory movie collection (temporary storage)
let movies = [
  { id: 1, title: 'Interstellar', genre: 'Science Fiction', year: 2014 },
  { id: 2, title: 'Avengers: Endgame', genre: 'Action', year: 2019 },
  { id: 3, title: 'Coco', genre: 'Animation', year: 2017 }
];

// Counter for auto-assigning IDs
let nextId = 4;

// GET /api/movies — retrieve all movies
app.get('/api/movies', (req, res) => {
  res.status(200).json(movies);
});

// GET /api/movies/:id — retrieve one movie
app.get('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id, 10);

  if (isNaN(movieId)) {
    return res.status(400).json({ error: 'Movie ID must be a number' });
  }

  const movie = movies.find(m => m.id === movieId);

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.status(200).json(movie);
});

// POST /api/movies — add a new movie
app.post('/api/movies', (req, res) => {
  const { title, genre, year } = req.body;

  // Validate that required fields are present
  if (!title || !genre || year === undefined || year === null || String(year).trim() === '') {
    return res.status(400).json({
      error: 'Missing required fields. title, genre, and year are required.'
    });
  }

  const parsedYear = parseInt(year, 10);
  if (isNaN(parsedYear)) {
    return res.status(400).json({
      error: 'Year must be a valid number.'
    });
  }

  // Create new movie with auto-assigned ID
  const newMovie = {
    id: nextId++,
    title: String(title).trim(),
    genre: String(genre).trim(),
    year: parsedYear
  };

  movies.push(newMovie);

  // Return 201 Created and the newly created movie
  res.status(201).json(newMovie);
});

// Fallback to index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start listening
app.listen(PORT, () => {
  console.log(`Movie API server is running at http://localhost:${PORT}`);
});
