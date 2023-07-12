//delete data

const delButton = document.getElementById("deleteBtn");

function restart() {
	fetch('http://localhost:5000/restart');
	location.reload();
}

delButton.addEventListener("click", (e) => {
	e.preventDefault();

	const table = document.getElementById("table");
	const delCkbox = document.getElementsByName("delete");
	console.log(table.rows);
	console.log(delCkbox);
	let delPort = [];
	for (let i = 1, row; row = table.rows[i]; i++) {
		if (delCkbox[i - 1].checked) {
			const value = row.children[3].innerHTML;
			delPort.push(value)
		}
	}

	console.log(delPort);
	const delStr = delPort.toString();


	const url = window.location.origin;
	const sel_url = `${url}:5000/delete?port=${delStr}`
	console.log(sel_url);
	fetch(sel_url, {
		method: "GET"
	}).then((response) => {
		// console.log(response.body);
		const statuscode = response.status;
		if (statuscode == 200) {
			alert("proxy deleted")
		}
		else if (statuscode == 406) {
			alert("port not found")
		}
		location.reload();

	}).catch((error) => {
		console.log(error);

	})

	restart()
})