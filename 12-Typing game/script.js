const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for the game

const words = [
"Askesky",
"blodmineral",
"Fedtafgift",
"Genopretningsplan",
"Ghettopakke",
"Ghettoplan",
"iPad",
"Kødklister",
"Lækagesag",
"Mailgate", 
"Nulvækst",
"Tabletcomputer",
"Udkantsdanmark",
"Vuvuzela", 
"WikiLeaks",
"Zumba"
];

// Initiate word
let randomWord;

// Initiate score
let score = 0;

// Initiate time
let time = 10;

// Initiate difficulty
let dificulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set focus on input field on start
text.focus();

// Start countdown
const timeInterval = setInterval(updateTime, 1000);


// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)] 
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
addWordToDOM();

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// update time
function updateTime() {
  time--;
  timeEl.innerHTML = time +' '+ 'sek'  

  if (time === 0) {
      clearInterval(timeInterval);

      gameOver();
  }
};

// Game over show end screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Tiden gik</h1>
    <p>Din score blev ${score}</p>
    <button onclick="window.location.reload()">Prøv igen</button>
    `;

    endgameEl.style.display ='flex';
}

// Event listeners

text.addEventListener('input', event => {
const indsatTekst = event.target.value;

if (indsatTekst === randomWord) {
    addWordToDOM();
    updateScore();
    event.target.value = '';

    if (difficulty === 'hard') {
        time += 3;
    } else if (dificulty === 'medium'){
        time += 8;
    } else {
        time += 12;
    }
    updateTime();
}
});

// Settings btn click
settingsBtn.addEventListener('click', () => 
    settings.classList.toggle('hide'));

// Settings select difficulty
settingsForm.addEventListener('change', event => {
    dificulty = event.target.value;
    localStorage.setItem('difficulty', dificulty);
});