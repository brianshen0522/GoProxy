//add item

const target_in = document.getElementById("target");
const description_in = document.getElementById("description");
const addButton = document.getElementById("add-submit");

const tables = document.getElementById("table");

function restart() {
	fetch('http://localhost:5000/restart');
	location.reload();
}

addButton.addEventListener("click", (e) => {
	e.preventDefault();

	const target = target_in.value;
	const description = description_in.value;
	const url = window.location.origin;
	const sel_url = `${url}:5000/add?url=${target}&description=${description}`;
	console.log(sel_url);

	fetch(sel_url, {
		method: "GET"
	}).then((response) => {
		// console.log(response.body);
		const statuscode = response.status;
		if (statuscode == 201) {
			alert("proxy added")
		}
		else if (statuscode == 400) {
			alert("URL must start with https")
		}
		else if (statuscode == 503) {
			alert("no available port for the new proxy")
		}


	}).catch((error) => {
		console.log(error);

	});

	restart();
})



