const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 8080; // This matches what we want the container to use!

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'postgres',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Hello from the custom Backend! DB Time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Database connection failed: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
