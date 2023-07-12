// create empty table
function clearTable(penel) {
	if (penel != null) penel.innerHTML = "";
}

const penel = document.getElementById("restable");
clearTable(penel);
penel.className = "x_panel";

const delBtn = document.createElement("button");
delBtn.id="deleteBtn";
delBtn.className = "btn btn-danger";
delBtn.type="button";
delBtn.textContent="Delete";

const table = document.createElement('table');
table.className = 'table';
table.id = "table";


//------------------ table title --------------------------------
const label = ['description', 'target', 'port'];

const thead = document.createElement('thead');
thead.className = "thead-dark";
const tbody = document.createElement('tbody');

const headerTr = document.createElement('tr');

const del_title = document.createElement('th');
del_title.scope = "col";
del_title.style.fontSize = 'medium';
del_title.style.textAlign = 'center';
del_title.textContent = 'delete';
headerTr.appendChild(del_title);

label.forEach(title_item => {
	let th = document.createElement('th');
	th.scope = "col";
	th.style.fontSize = 'medium';
	// th.style.textAlign = 'center';
	th.textContent = title_item;
	headerTr.appendChild(th);
})


thead.appendChild(headerTr);
//----------------------------------------------------------------------

penel.appendChild(delBtn);
penel.appendChild(table);


