const express = require('express')
var cors = require('cors')
const app = express()
const morgan = require('morgan')

const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

//important.. this line creates a connection to use static files such as html saved in the

app.use(express.static('./views'))
app.use(morgan('short'))

app.get('/', (request, response) => {
	response.sendFile('/views/index.html', { root: __dirname })
 })

 app.listen(80, () => {
	 console.log("Server is up and listening on 80...")
 })
