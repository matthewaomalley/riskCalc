//Web app with Node.js and express for assignment portfolio

// use express and create app object
const express = require('express')
const app = express()

// define directory for files to server
app.use(express.static(__dirname + '/public/assignment-portfolio'))

// need to add routes for other pages to work, but good enough for now

// define the port
const port = process.env.PORT || 8080;

// listen on the port
app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))