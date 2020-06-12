const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const showBtn = document.getElementById("show");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const hideBtn = document.getElementById("hide");
const answerEl = document.getElementById("answer");
const questionEl = document.getElementById("question");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();


/* const cardsData = [
  {
    question: "Hvad skal en variabel starte med?",
    answer: "Et bogstav, $ eller _",
  },
  {
    question: "Hvad er en variabel?",
    answer: "En beholder for et stykke data",
  },
  {
    question: "Hvad er forskellen på const og let?",
    answer: "let kan ændres det kan const ikke",
  },
]; */

// Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create single card in DOM
function createCard(data, index) {
    const card = document.createElement("div");
    card.classList.add("card");

    if (index === 0) {
        card.classList.add("active");
    }

    card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
      <p>${data.question}</p>
  </div>
  <div class="inner-card-back">
      <p>${data.answer}</p>
  </div>
</div>
`;

    card.addEventListener("click", () => card.classList.toggle("show-answer"));

    // add cards to DOM
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1} ud af ${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Add cards to local storage 
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

// Eventlisteners
// Next button
nextBtn.addEventListener("click", () => {
    cardsEl[currentActiveCard].className = "card left";

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

// previous button
prevBtn.addEventListener("click", () => {
    cardsEl[currentActiveCard].className = "card right";

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = {
            question,
            answer
        };

        createCard(newCard);

        questionEl.value = "";
        answerEl.value = "";

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = "";
    window.location.reload();
})