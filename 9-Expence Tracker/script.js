const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

/* const dummyTransactions = [
  { id: 1, text: "RAM", amount: -250 },
  { id: 2, text: "SSD", amount: -500 },
  { id: 3, text: "Overført", amount: 1000 },
  { id: 4, text: "M2 ssd", amount: -250 },
  { id: 5, text: "Salg af dele", amount: 250 },
]; */

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(event) {
  event.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("du skal lave en beskrivelse og beløb");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}
// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000);
}
// Add transactions to DOM list
function addTransactionDOM(transaction) {
  //Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
<button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>
`;
  list.appendChild(item);
}

// Update the blanace, incom and expence
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `${formatMoney(total)}`;
  money_plus.innerText = `${formatMoney(income)}`;
  money_minus.innerText = `${formatMoney(expense)}`;
}
// Format number as money
function formatMoney(number) {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  }).format(number);
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

// Eventlistners
form.addEventListener("submit", addTransaction);
