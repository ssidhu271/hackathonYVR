const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

let db = new sqlite3.Database('./people_data.db');

app.use(cors());
app.use(express.json());

// Endpoint to add people count
app.post('/add', (req, res) => {
  const { peopleCount } = req.body;
  db.run(`INSERT INTO people_count (peopleCount) VALUES (?)`, [peopleCount], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.send({ id: this.lastID });
  });
});

// Endpoint to fetch counts
app.get('/counts', (req, res) => {
  db.all(`SELECT * FROM people_count ORDER BY timestamp DESC`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
