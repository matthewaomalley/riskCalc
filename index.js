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


	var inputs = url.parse(request.url, true).query
	const heightFeet = (inputs.feet)
	const heightInches = parseInt(inputs.inch)
	const weight = parseInt(inputs.weight)

	if (weight > 500 || weight < 1) {
		response.type('text/plain')
		response.send("Error: Please enter a valid weight between 1 and 500")
	}
	else {
		const weightKg = weight * .454
		const heightM = (heightInches + (heightFeet * 12)) * 0.0254
		let BMI = weightKg / (heightM * heightM)
		BMI = parseInt(BMI)
		
		response.type('text/plain')
		response.send(BMI.toString())
	}
})

// This function takes in all data and calculates the risk
app.get('/calc-risk', (request, response) => {

	//TODO: risk calculation with all data, return total points and riskFactor	
	var inputs = url.parse(request.url, true).query
	const heightFeet = (inputs.feet)
	const heightInches = (inputs.inch)
	const age = (inputs.age)
	const weight = (inputs.weight)
	const bmi = parseInt(inputs.bmi)
	const bpress = (inputs.bpressure)
	const disease = parseInt(inputs.disease)


	// calculations done here (they might have to be moved below input validation and before the last else
	//statement, not sure.)
	//let riskFactor = (total points, risk category)

	
	// Input validation || break it if the weight is not correct
	breakit: if ((age == "select") || (heightFeet == "select") || (heightInches == "select") || (weight == "") || bpress == ("select")) {
		response.type('text/plain')
		response.send("Error: One or more fields are uncompleted") }
	else if (weight > 500 || weight < 1) {
		response.send("")
		break breakit }
	else {
		response.type('text/plain')
		response.send("Result") } // This will be the actual result variable and not a string

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