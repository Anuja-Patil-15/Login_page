const mysql = require('mysql2');
const dotenv=require('dotenv');
dotenv.config();

const db = mysql.createConnection({  
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});


db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('MySQL database connected');
    }
});

module.exports = db;
