//Web app with Node.js and express for assignment portfolio

// use express and create app object
const express = require('express')
const app = express()

var url = require('url')

// define directory for files to server
app.use(express.static(__dirname + '/public'))

// define the port
const port = process.env.PORT || 8080;

// Function to calculate BMI on the server
app.get('/calculate-bmi', (request, response) => {

	// ToDo: Do input validation for weight in this function

	var inputs = url.parse(request.url, true).query
	const heightFeet = parseInt(inputs.feet)
	const heightInches = parseInt(inputs.inch)
	const weight = parseInt(inputs.weight)

	const weightKg = weight*.454
	const heightM = (heightInches + (heightFeet * 12))*0.0254
	const BMI = weightKg/(heightM*heightM)

	response.type('text/plain')
	response.send(BMI.toString())
})

// listen on the port
app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))