const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("The number is:", randomNum);

window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start the recognition and the game
recognition.start();

// Capture user speak
function onSpeak(e) {
	const msg = e.results[0][0].transcript;

	writeMessage(msg);
	checkNumber(msg);
}

// check msg against number
function checkNumber(msg) {
	const num = +msg;

	// Check if number is valid
	if (Number.isNaN(num)) {
		msgEl.innerHTML = "<div> That is not a valid number</div>";
		return;
	}

	// Check if number is in range
	if (num > 100 || num < 1) {
		msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
		return;
	}
	// Check number
	if (num === randomNum) {
		document.body.innerHTML = `<h2>Congrats! You have guessed the number
    <br><br>
    It was ${num} </h2>
    <button class="play-again" id="play-again">Play again</button>
    `;
	} else if (num > randomNum) {
		msgEl.innerHTML += "<div>GO LOWER</div>";
	} else {
		msgEl.innerHTML += "<div>GO HIGHER</div>";
	}
}

// Write what user says
function writeMessage(msg) {
	msgEl.innerHTML = ` 
    <div>You said:</div>
    <span class="box">${msg}</span>
    `;
}

// Generate random number
function getRandomNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

// Speek result
recognition.addEventListener("result", onSpeak);

// End RS service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
})