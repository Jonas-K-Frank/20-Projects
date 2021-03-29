const dage = document.getElementById("dage");
const timer = document.getElementById("timer");
const minutter = document.getElementById("minutter");
const sekunder = document.getElementById("sekunder");
const nedtaelling = document.getElementById("nedtaelling");
const aar = document.getElementById("aar");
const loading = document.getElementById("loading");

const detteAr = new Date().getFullYear();

const nytarsTid = new Date(`January 01 ${detteAr + 1} 00:00:00`);

// Årstallet i baggrunden
aar.innerText = detteAr + 1;

// Opdatere nedtællingen

function opdaterNedtaelling() {
	const aktuelTid = new Date();
	const diff = nytarsTid - aktuelTid;

	const dag = Math.floor(diff / 1000 / 60 / 60 / 24);
	const time = Math.floor(diff / 1000 / 60 / 60) % 24;
	const minut = Math.floor(diff / 1000 / 60) % 60;
	const sekund = Math.floor(diff / 1000) % 60;

	// skriver tiden til DOMen
	dage.innerHTML = dag;
	timer.innerHTML = time < 10 ? "0" + time : time;
	minutter.innerHTML = minut < 10 ? "0" + minut : minut;
	sekunder.innerHTML = sekund < 10 ? "0" + sekund : sekund;
}

// Vis spinner ved load/reload
setTimeout(() => {
	loading.remove();
    nedtaelling.style.display = 'flex';
}, 1000);

setInterval(opdaterNedtaelling, 1000);
