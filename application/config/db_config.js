const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'cs667db',
});

//check if database is connected
db.connect((err)=> {
 	if (err) throw err;
 	console.log('Connected');
 });


module.exports = db;
