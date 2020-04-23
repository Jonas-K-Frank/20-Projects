const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairsBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Fordoble formuen
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sorter efter formue
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Vis kun millionære
function showMillionairs() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Samlet formue
function calculateWealth() {
    const wealth = data.reduce((accumulator, user) => (accumulator += user.money), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Samlet formue: <strong>${formatMoney(wealth)}</strong></h3>`;

    main.appendChild(wealthElement);
    
}
// Add new object to the data array
function addData(object) {
  data.push(object);

  updateDOM();
}

// updateDOM function
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong>Formue</h2>";

  providedData.forEach((personer) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${personer.name}</strong> ${formatMoney(
      personer.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  }).format(number);
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairsBtn.addEventListener("click", showMillionairs);
calculateWealthBtn.addEventListener("click", calculateWealth);
