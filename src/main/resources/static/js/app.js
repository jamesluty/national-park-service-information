fetch("https://developer.nps.gov/api/v1/parks?stateCode=WA&api_key=MZ7Qm9huvc8sZk2jzmwn9eA4ge9OLfzRwMV1pkPd")
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(err => console.log(err));