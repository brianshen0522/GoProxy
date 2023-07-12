//change data enable

const refButton = document.getElementById("refresh-submit");

refButton.addEventListener("click", (e) => {
	e.preventDefault();

	const url = window.location.origin;
	const sel_url = `${url}/restart`;
	fetch(sel_url);
	location.reload();
})
