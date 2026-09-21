# Movie Collection REST API

Simple Movie Collection REST API using Node.js and Express with an in-memory array for data storage and a frontend interface.

## Requirements
- Node.js (v18 or higher)
- npm

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open in browser:
```
http://localhost:3000
```

## API Endpoints
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get a single movie by ID
- `POST /api/movies` - Add a new movie (requires `title`, `genre`, `year`)
