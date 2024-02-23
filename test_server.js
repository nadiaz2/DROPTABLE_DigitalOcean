console.log("server ran")

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time))
}

while (true) {
	await sleep(500)
}