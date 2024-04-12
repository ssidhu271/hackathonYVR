const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const moment = require('moment');
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

// Endpoint to fetch averaged people counts
app.get('/people-counts', (req, res) => {
  const sql = `SELECT timestamp, peopleCount FROM people_count ORDER BY timestamp ASC;`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("SQL Error:", err.message);
      res.status(500).json({ error: "SQL error occurred.", detail: err.message });
      return;
    }

    const processedData = processData(rows);
    res.json(processedData);
  });
});

function processData(data) {
  const groupedData = new Map();

  data.forEach(({ timestamp, peopleCount }) => {
    // Use moment to parse and round the timestamp
    const roundedTimestamp = moment(timestamp).startOf('minute').add(15 * Math.floor(moment(timestamp).minute() / 5), 'minutes').format('YYYY-MM-DD HH:mm:ss');

    if (!groupedData.has(roundedTimestamp)) {
      groupedData.set(roundedTimestamp, []);
    }
    groupedData.get(roundedTimestamp).push(peopleCount);
  });

  // Convert the map to an array of objects with average counts
  const result = Array.from(groupedData).map(([key, values]) => ({
    rounded_timestamp: key,
    avgPeopleCount: values.reduce((acc, val) => acc + val, 0) / values.length
  }));

  return result;
}


// Endpoint to add luggage count
app.post('/add-luggage', (req, res) => {
  const { luggageCount } = req.body;
  db.run(`INSERT INTO luggage (luggagecount) VALUES (?)`, [luggageCount], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.send({ id: this.lastID });
  });
});

app.get('/luggage-counts', (req, res) => {
  const sql = `SELECT timestamp, luggageCount FROM luggage ORDER BY timestamp ASC;`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("SQL Error:", err.message);
      res.status(500).json({ error: "SQL error occurred.", detail: err.message });
      return;
    }

    const processedData = processLuggageData(rows);
    res.json(processedData);
  });
});

function processLuggageData(data) {
  const groupedData = new Map();

  data.forEach(({ timestamp, luggageCount }) => {
    // Use moment to parse and round the timestamp
    const roundedTimestamp = moment(timestamp).startOf('minute').add(15 * Math.floor(moment(timestamp).minute() / 5), 'minutes').format('YYYY-MM-DD HH:mm:ss');

    if (!groupedData.has(roundedTimestamp)) {
      groupedData.set(roundedTimestamp, []);
    }
    groupedData.get(roundedTimestamp).push(luggageCount);
  });

  // Convert the map to an array of objects with average counts
  const result = Array.from(groupedData).map(([key, values]) => ({
    rounded_timestamp: key,
    avgLuggageCount: values.reduce((acc, val) => acc + val, 0) / values.length
  }));

  return result;
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
