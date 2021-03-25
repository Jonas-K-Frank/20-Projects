const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const blokRaekkeAntal = 9;
const blokKolonneAntal = 5;

// Ketcher props
const ketcher = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	w: 80,
	h: 10,
	dx: 0,
	speed: 8,
};

// Blokke props
const blokInfo = {
	w: 70,
	h: 20,
	padding: 10,
	offsetX: 45,
	offsetY: 60,
	visible: true,
};
// Bold props
const bold = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	size: 10,
	speed: 4,
	dx: 4,
	dy: -4,
};

// tegne ketcheren på canvas
function tegnKetcher() {
	ctx.beginPath();
	ctx.rect(ketcher.x, ketcher.y, ketcher.w, ketcher.h);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
}

// Tegne blokkene
const blokke = [];
for (let i = 0; i < blokRaekkeAntal; i++) {
	blokke[i] = [];
	for (let j = 0; j < blokKolonneAntal; j++) {
		const x = i * (blokInfo.w + blokInfo.padding) + blokInfo.offsetX;
		const y = j * (blokInfo.h + blokInfo.padding) + blokInfo.offsetY;
		blokke[i][j] = { x, y, ...blokInfo };
	}
}

// tegne bolden på canvas
function tegnBold() {
	ctx.beginPath();
	ctx.arc(bold.x, bold.y, bold.size, 0, 2 * Math.PI);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
}
// tegne blokkene på canvas
function tegnBlok() {
	blokke.forEach((column) => {
		column.forEach((blok) => {
			ctx.beginPath();
			ctx.rect(blok.x, blok.y, blok.w, blok.h);
			ctx.fillStyle = blok.visible ? "#0095dd" : "transparent";
			ctx.fill();
			ctx.closePath();
		});
	});
}
// Få scoren på canvas
function tegnScore() {
	ctx.font = "20px Arial";
	ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// bevæg ketcheren
function bevaegKetcher() {
	ketcher.x += ketcher.dx;

	// Vægene
	if (ketcher.x + ketcher.w > canvas.width) {
		ketcher.x = canvas.width - ketcher.w;
	}
	if (ketcher.x < 0) {
		ketcher.x = 0;
	}
}

// Bevæg bolden
function bevaegBold() {
	bold.x += bold.dx;
	bold.y += bold.dy;

	// Vægkollision højre/venstre
	if (bold.x + bold.size > canvas.width || bold.x - bold.size < 0) {
		bold.dx *= -1;
	}
	// vægkollission top/bund
	if (bold.y + bold.size > canvas.height || bold.y - bold.size < 0) {
		bold.dy *= -1;
	}

	// Ketcher kollision
	if (
		bold.x - bold.size > ketcher.x &&
		bold.x + bold.size < ketcher.x + ketcher.w &&
		bold.y + bold.size > ketcher.y
	) {
		bold.dy = -bold.speed;
	}

	// Blok kollision
	blokke.forEach((column) => {
		column.forEach((blok) => {
			if (blok.visible) {
				if (
					bold.x - bold.size > blok.x &&
					bold.x + bold.size < blok.x + blok.w &&
					bold.y + bold.size > blok.y &&
					bold.y - bold.size < blok.y + blok.h
				) {
					bold.dy *= -1;
					blok.visible = false;

					increaseScore();
				}
			}
		});
	});
	// Hvis bolden rammer bunden taber man
	if (bold.y + bold.size > canvas.height) {
		visAlleBlokke();
		score = 0;
	}
}

// Forøg scoren
function increaseScore() {
	score++;

	if (score % (blokRaekkeAntal * blokRaekkeAntal) === 0) {
		visAlleBlokke();
	}
}

// gøre alle blokke synlige
function visAlleBlokke() {
	blokke.forEach((column) => {
		column.forEach((blok) => (blok.visible = true));
	});
}

// Tegne det hele på canvas
function tegner() {
	// tøm canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	tegnBold();
	tegnKetcher();
	tegnBlok();
	tegnScore();
}

// Opdatere canvas
function update() {
	bevaegKetcher();
	bevaegBold();
	tegner();

	requestAnimationFrame(update);
}

update();

//keydown event
function keyDown(e) {
	if (e.key === "Right" || e.key === "ArrowRight") {
		ketcher.dx = ketcher.speed;
	} else if (e.key === "Left" || e.key === "ArrowLeft") {
		ketcher.dx = -ketcher.speed;
	}
}
//keyup event
function keyUp(e) {
	if (
		e.key === "Right" ||
		e.key === "ArrowRight" ||
		e.key === "Left" ||
		e.key === "ArrowLeft"
	) {
		ketcher.dx = 0;
	}
}

// keyboard event handler
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Regler og luk knapperne event handler

rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));
