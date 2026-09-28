# HBO Max Movie API — Integrative Programming Project

A clean and creative REST API and web application inspired by **HBO Max**, powered by **Node.js/Express** and persistent **MySQL**.

---

## Features

- **HBO Max Aesthetic**: Dark sleek theme, signature purple gradient accents, and streaming-style movie cards.
- **Simple CRUD Operations**:
  - **Create**: Add a movie (Title, Genre, Year)
  - **Read**: View collection with live search filtering
  - **Update**: Edit any existing movie in-place
  - **Delete**: Remove a movie from the database with confirmation
- **MySQL Integration**: Persistent storage using `movie_db` database.

---

## Setup & Running

1. **Start XAMPP**: Ensure **Apache** and **MySQL** are running in XAMPP Control Panel.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start Server**:
   ```bash
   npm start
   ```
4. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/movies` | Fetch all movies |
| `GET` | `/api/movies/:id` | Fetch one movie by ID |
| `POST` | `/api/movies` | Add a new movie (`title`, `genre`, `year`) |
| `PUT` | `/api/movies/:id` | Update a movie by ID |
| `DELETE` | `/api/movies/:id` | Delete a movie by ID |

---

## How to Delete `student_db` in MySQL

Run this in PowerShell or Command Prompt:
```powershell
C:\xampp\mysql\bin\mysql.exe -u root -e "DROP DATABASE student_db;"
```
Or open [http://localhost/phpmyadmin](http://localhost/phpmyadmin) -> **Databases** tab -> select `student_db` -> click **Drop**.
