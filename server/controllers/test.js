exports.testGet = async (req, res) => {

	console.log("GET request recieved");

	res.send("GET request processed succesfully");

}

exports.testPut = async (req, res) => {

	console.log("PUT request recieved");

	res.send("PUT request processed succsfully");

}