const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your-password',
  database: 'albion'
});

module.exports = pool;
