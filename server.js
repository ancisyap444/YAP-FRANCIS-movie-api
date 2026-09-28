const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { pool, initDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/movies', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM movies ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/movies', async (req, res) => {
  const { title, genre, year } = req.body;
  if (!title || !genre || !year) {
    return res.status(400).json({ error: 'Title, genre, and year are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO movies (title, genre, year) VALUES (?, ?, ?)',
      [title.trim(), genre.trim(), parseInt(year, 10)]
    );
    res.status(201).json({ id: result.insertId, title, genre, year: parseInt(year, 10) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/movies/:id', async (req, res) => {
  const { title, genre, year } = req.body;
  if (!title || !genre || !year) {
    return res.status(400).json({ error: 'Title, genre, and year are required' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE movies SET title = ?, genre = ?, year = ? WHERE id = ?',
      [title.trim(), genre.trim(), parseInt(year, 10), req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json({ id: Number(req.params.id), title, genre, year: parseInt(year, 10) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/movies/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM movies WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
