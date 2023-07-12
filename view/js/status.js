//show table

const url = window.location.origin;
const sel_url = `${url}:5000/status`;
console.log(sel_url);

function showtable(data) {
	const label = ['description', 'target', 'port'];

	data.forEach(row => {
		// console.log("row ");
		// console.log(row);
		let tr = document.createElement('tr');

		let delTd = document.createElement('td');
		let del_ckbox = document.createElement('input');
		delTd.style.textAlign = 'center';
		del_ckbox.type = 'checkbox';
		del_ckbox.name = 'delete';
		delTd.appendChild(del_ckbox);
		tr.appendChild(delTd);

		label.forEach(title => {
			let td = document.createElement('td');
			td.textContent = row[title];
			//console.log(tdName);
			tr.appendChild(td);
		});

		tbody.appendChild(tr);
	})

	table.appendChild(tbody);
	thead.appendChild(headerTr);

	return thead;
}

document.addEventListener('DOMContentLoaded', function (event) {
	const table = document.getElementById("table");

	fetch(sel_url, {
		method: "GET"
	}).then((response) => response.json()
	).then((responseJSON) => {

		const data = responseJSON.proxies;
		// console.log(data);
		if (data) {
			let thead = showtable(data);
			table.appendChild(thead);
		}
	}).catch((error) => {
		console.log(error);
	});

})