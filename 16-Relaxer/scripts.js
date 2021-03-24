const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 8000;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
	text.innerText = "Træk vejret ind!";
	container.className = "container grow";

	setTimeout(() => {
		text.innerText = "Hold vejret!";

		setTimeout(() => {
			text.innerText = "Pust ud!";

			container.className = "container shrink";
		}, holdTime);
	}, breathTime);
}

setInterval(breathAnimation, totalTime);
