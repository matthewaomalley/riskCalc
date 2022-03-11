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
	var riskTotal = 0

	// Risk calculations for age
	if (age == "under45") {
		riskTotal += 10
	}
	else if (age == "under60") {
		riskTotal += 20
	}
	else if (age == "over60") {
		riskTotal += 30
	}

	// Risk calculations for BMI
	if (bmi < 18.5) {
		riskTotal += 75
	}
	else if (bmi < 25) {
		riskTotal += 0
	}
	else if (bmi < 30) {
		riskTotal += 30
	}
	else {
		riskTotal += 75
	}

	// Risk calculations for blood pressure
	if (bpress == "elevated") {
		riskTotal += 15
	}
	else if (bpress == "stage1") {
		riskTotal += 30
	}
	else if (bpress == "stage2") {
		riskTotal += 75
	}
	else if (bpress == "crisis") {
		riskTotal += 100
	}

	// Risk calculations for family disease history
	if (disease == 1) {
		riskTotal += 10
	}
	if (disease == 2) {
		riskTotal += 20
	}
	if (disease == 3) {
		riskTotal += 30
	}
	
	// Input validation || break it if the weight is not correct
	breakit: if ((age == "select") || (heightFeet == "select") || (weight == "") || bpress == ("select")) {
		response.type('text/plain')
		response.send("Error: One or more fields are uncompleted") }
	else if (weight > 500 || weight < 1) {
		response.send("")
		break breakit }
	else {
		response.type('text/plain')
		if (riskTotal <=20 ) {
			response.send("Total Score: " + riskTotal + "	You are at a low risk")
		}
		else if (riskTotal <= 50) {
			response.send("Total Score: " + riskTotal + "	You are at a moderate risk")
		}
		else if (riskTotal <= 75) {
			response.send("Total Score: " + riskTotal + "	You are at high risk")
		}
		else {
			response.send("Total Score: " + riskTotal + "	You are uninsurable")
		}
		response.send("") }

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