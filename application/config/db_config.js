const mysql = require('mysql');

const sync_mysql = require('sync-mysql');

const sync_db = new sync_mysql({
  host: 'ec2-18-191-136-71.us-east-2.compute.amazonaws.com',
  user: 'ludo',
  password: 'ludo867',
  database: 'cs667db',
  port: '3306',
  multipleStatements: true
});

const db = mysql.createConnection({
    host: 'ec2-18-191-136-71.us-east-2.compute.amazonaws.com',
    user: 'ludo',
    password: 'ludo867',
    database: 'cs667db',
    port: '3306',
    multipleStatements: true
});

//check if database is connected
db.connect((err)=> {
 	if (err) throw err;
 	console.log('DB Connected');
 });

module.exports = {
  'db': db,
  'sync_db': sync_db
};
