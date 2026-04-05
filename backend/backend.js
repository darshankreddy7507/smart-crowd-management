const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

// 🔥 Middleware (VERY IMPORTANT)
app.use(cors());
app.use(express.json());

// 📁 Database
const db = new sqlite3.Database('./bus.db', (err) => {
    if (err) {
        console.error("DB Error:", err.message);
    } else {
        console.log("Connected to SQLite DB ✅");
    }
});

// 🧱 Create table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS buses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        busNumber TEXT,
        passengerCount INTEGER,
        location TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// =======================
// 🚀 ADD BUS DATA
// =======================
app.post('/add-data', (req, res) => {
    console.log("Incoming Bus Data:", req.body);

    const { busNumber, passengerCount, location } = req.body;

    db.run(
        `INSERT INTO buses (busNumber, passengerCount, location) VALUES (?, ?, ?)`,
        [busNumber, passengerCount, location],
        function (err) {
            if (err) {
                console.error("Insert Error:", err.message);
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Bus data saved successfully ✅" });
            }
        }
    );
});

// =======================
// 🚀 ADD BUS STOP DATA
// =======================
app.post('/add-busstop-data', (req, res) => {
    console.log("Incoming Stop Data:", req.body);

    const { busStop, waitingCount, alert } = req.body;

    db.run(
        `INSERT INTO buses (busNumber, passengerCount, location) VALUES (?, ?, ?)`,
        [busStop, waitingCount, alert],
        function (err) {
            if (err) {
                console.error("Insert Error:", err.message);
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Bus stop data saved ✅" });
            }
        }
    );
});

// =======================
// 📡 GET LATEST DATA (FOR FRONTEND)
// =======================
app.get('/data', (req, res) => {
    db.all(
        `SELECT * FROM buses ORDER BY timestamp DESC LIMIT 1`,
        [],
        (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows);
            }
        }
    );
});

// =======================
// 🚀 START SERVER
// =======================
app.listen(port, () => {
    console.log(`🔥 Server running on http://localhost:${port}`);
});