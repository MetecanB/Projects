const db = require('./db');

// Function to fetch data from the database
async function fetchData() {
  try {
    const [rows, fields] = await db.query('SELECT name, address FROM actor');
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { fetchData };
