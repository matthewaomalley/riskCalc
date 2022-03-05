//Web app with Node.js and express for assignment portfolio

// use express and create app object
const express = require('express')
const app = express()

// define directory for files to server
app.use(express.static(__dirname + '/public'))

// define the port
const port = process.env.PORT || 8080;

// Function to calculate BMI on the server
app.get('/calculate-bmi', (request, response) => {
	var inputs = url.parse(request.url, true).query
	const heightFeet = parseInt(inputs.feet)
	const heightInches = parseInt(inputs.inches)
	const weight = parseInt(inputs.lbs)

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