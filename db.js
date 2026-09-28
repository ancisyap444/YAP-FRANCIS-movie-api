const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'movie_db',
  port: parseInt(process.env.DB_PORT || '3306', 10)
});

async function initDB() {
  try {
    const rootConn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || '3306', 10)
    });

    await rootConn.query('CREATE DATABASE IF NOT EXISTS movie_db;');
    await rootConn.end();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        year INT NOT NULL
      );
    `);

    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM movies');
    if (rows[0].count === 0) {
      const sampleMovies = [
        ['Dune: Part Two', 'Science Fiction', 2024],
        ['The Batman', 'Action', 2022],
        ['Interstellar', 'Science Fiction', 2014],
        ['House of the Dragon', 'Fantasy', 2022],
        ['The Dark Knight', 'Action', 2008],
        ['Inception', 'Science Fiction', 2010],
        ['Succession', 'Drama', 2023],
        ['The Last of Us', 'Action', 2023]
      ];
      for (const m of sampleMovies) {
        await pool.query('INSERT INTO movies (title, genre, year) VALUES (?, ?, ?)', m);
      }
    }
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
}

module.exports = { pool, initDB };
