//change data enable

const refButton = document.getElementById("refresh-submit");

refButton.addEventListener("click", (e) => {
	e.preventDefault();

	const url = window.location.origin;
	const sel_url = `${url}:5000/restart`;
	fetch('http://localhost:5000/restart');
	location.reload();
})
