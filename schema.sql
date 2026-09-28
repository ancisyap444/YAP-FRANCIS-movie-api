CREATE DATABASE IF NOT EXISTS movie_db;
USE movie_db;

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  year INT NOT NULL
);

INSERT INTO movies (title, genre, year) VALUES 
('Dune: Part Two', 'Science Fiction', 2024),
('The Batman', 'Action', 2022),
('Interstellar', 'Science Fiction', 2014),
('House of the Dragon', 'Fantasy', 2022),
('The Dark Knight', 'Action', 2008),
('Inception', 'Science Fiction', 2010),
('Succession', 'Drama', 2023),
('The Last of Us', 'Action', 2023);
