const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [{
        image: './img/drink.jpg',
        text: "Jeg er tørstig"
    },
    {
        image: './img/food.jpg',
        text: "Jeg er sulten"
    },
    {
        image: './img/tired.jpg',
        text: "Jeg er træt"
    },
    {
        image: './img/hurt.jpg',
        text: "Jeg har slået mig"
    },
    {
        image: './img/happy.jpg',
        text: "Jeg er glad"
    },
    {
        image: './img/angry.jpg',
        text: "Jeg er sur"
    },
    {
        image: './img/sad.jpg',
        text: "Jeg er ked af det"
    },
    {
        image: './img/scared.jpg',
        text: "Jeg er bange"
    },
    {
        image: './img/outside.jpg',
        text: 'Jeg vil ud'
    },
    {
        image: './img/home.jpg',
        text: 'Jeg vil hjem'
    },
    {
        image: './img/school.jpg',
        text: 'Jeg vil i skole'
    },
    {
        image: './img/grandma.jpg',
        text: 'Jeg vil hjem til bedste'
    }
];

data.forEach(createBox);

// Create boxes
function createBox(item) {
    const box = document.createElement('div');

    const {
        image,
        text
    } = item;

    box.classList.add('box');

    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);

    });

    main.appendChild(box);
}

// Initiate speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `
        ${voice.name} ${voice.lang}
        `;

        voicesSelect.appendChild(option);
    });
}

// Set text message
function setTextMessage(text) {
    message.text = text;
}

// Speak text
function speakText() {
    speechSynthesis.speak(message);
}

// Set voice
function setVoice(event) {
    message.voice = voices.find(voice => voice.name === event.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

// Close button
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
})

getVoices();