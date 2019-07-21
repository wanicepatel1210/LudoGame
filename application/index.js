const express = require('express')
var cors = require('cors')
const app = express()
const morgan = require('morgan')

const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('html', require('hbs').renderFile);
app.set('view engine', 'hbs');
app.use(express.static('./views'))
app.use(morgan('short'))



app.get('/', (request, response) => {
	response.sendFile('/views/index.html', { root: __dirname })
 })

 //create connection to main
 const main = require('./routes/main.js')
 app.use(main);

 //create connection to user
 const user = require('./routes/user.js')
 app.use(user);

 app.listen(80, () => {
	 console.log("Server is up and listening on 80...")
 })
