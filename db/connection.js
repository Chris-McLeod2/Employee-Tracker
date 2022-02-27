const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', 
        password: 'password2',
        database: 'EmployeeTracker'
    },
    console.log('Connected to Database')
);

module.exports = db;