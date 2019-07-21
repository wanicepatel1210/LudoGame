/**
 * @class
 * this class serves as setup to connect to mysql.
 */
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'ec2-18-191-136-71.us-east-2.compute.amazonaws.com',
    user: 'ludo',
    password: 'ludo867',
    database: 'cs667db',
    port: '3306'
});

//check if database is connected
db.connect((err)=>{
    if(err) throw err;
    console.log('CSC867 Database Connected!!!');
})


module.exports = db
