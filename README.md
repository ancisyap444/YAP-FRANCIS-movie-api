# Movie Collection REST API

A simple Movie Collection REST API built with **Node.js** and **Express**, using an in-memory JavaScript array as temporary data storage.

## Features

- **In-Memory Storage**: Uses a JavaScript array to store movies (no database needed; records reset upon server restart).
- **RESTful Endpoints**:
  - `GET /api/movies` — Retrieve all movies in the collection.
  - `GET /api/movies/:id` — Retrieve a single movie by its ID. Returns 404 if not found.
  - `POST /api/movies` — Add a new movie. Automatically assigns a unique numeric `id`. Returns 400 if required fields (`title`, `genre`, `year`) are missing.
- **Interactive Frontend**:
  - Located in `public/index.html` (served automatically at `http://localhost:3000`).
  - Displays the movie table with columns: `ID`, `Title`, `Genre`, `Year`.
  - Form with inputs for Title, Genre, and Year.
  - Submits data via `fetch()` and auto-refreshes the movie list.
  - "Load Movies" button to manually reload movies.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

Open your browser and visit:
```
http://localhost:3000
```

---

## API Documentation

### 1. Retrieve All Movies
- **URL**: `/api/movies`
- **Method**: `GET`
- **Response**: `200 OK`
```json
[
  { "id": 1, "title": "Interstellar", "genre": "Science Fiction", "year": 2014 },
  { "id": 2, "title": "Avengers: Endgame", "genre": "Action", "year": 2019 },
  { "id": 3, "title": "Coco", "genre": "Animation", "year": 2017 }
]
```

### 2. Retrieve One Movie
- **URL**: `/api/movies/:id`
- **Method**: `GET`
- **Response**: `200 OK`
```json
{
  "id": 1,
  "title": "Interstellar",
  "genre": "Science Fiction",
  "year": 2014
}
```
- **Error Response**: `404 Not Found` if movie doesn't exist.

### 3. Add a New Movie
- **URL**: `/api/movies`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "title": "Inception",
  "genre": "science fiction",
  "year": 2010
}
```
- **Response**: `201 Created`
```json
{
  "id": 4,
  "title": "Inception",
  "genre": "science fiction",
  "year": 2010
}
```
- **Error Response**: `400 Bad Request` if any required field is missing.
