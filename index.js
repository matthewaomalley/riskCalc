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

	const weightKg = weight * .454
	const heightM = (heightInches + (heightFeet * 12)) * 0.0254
	let BMI = weightKg / (heightM * heightM)
	BMI = parseInt(BMI)
	
	response.type('text/plain')
	response.send(BMI.toString())
	
})

// This function takes in all data and calculates the risk
app.get('/calc-risk', (request, response) => {

	//TODO: risk calculation with all data, return total points and riskFactor	
	var inputs = url.parse(request.url, true).query
	const age = parseInt(inputs.age)
	const bpress = parseInt(inputs.bpressure)
	const disease = parseInt(inputs.disease) // 
	// parse int might not work for the string values, worry about later

	// calculations done here

	//let riskFactor = (total points, risk category)
	//response.type('text/plain')
	//response.send(riskFactor.toString())
})

// custom 500 page
app.use((err, request, response, next) => {
	console.error(err.message)
	response.type('text/plain')
	response.status(500)
	response.send('500 - Server Error')
  })

// listen on the port
app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))