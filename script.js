let expenseForm = document.getElementById("expense-form");
let expenseList = document.getElementById("expense-list");
let totalAmountItem = document.getElementById("total-amount");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
  expenseList.innerHTML = "";
  let totalAmount = 0;

  for (i = 0; i < expenses.length; i++) {
    let expense = expenses[i];
    let expenseRow = document.createElement("tr");
    expenseRow.innerHTML = `
  <td>${expense.SNo}</td>
  <td>${expense.name}</td>
  <td>${expense.amount}</td>
  <td class="delete-btn" data-id="${i}">Delete</td> 
  `;
    expenseList.appendChild(expenseRow);
    totalAmount += expense.amount;
  }

  totalAmountItem.textContent = totalAmount.toFixed(2);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense(e) {
  e.preventDefault();

  let expenseNameInput = document.getElementById("expense-name");
  let expenseAmountInput = document.getElementById("expense-amount");
  let expenseName = expenseNameInput.value;
  let expenseAmount = parseFloat(expenseAmountInput.value);

  expenseNameInput.value = "";
  expenseAmountInput.value = "";

  if (expenseName === "" || isNaN(expenseAmount)) {
    alert("please enter valid expense details.");
    return;
  }

  const expense = {
    SNo: expenses.length + 1,
    name: expenseName,
    amount: expenseAmount,
  };

  expenses.push(expense);
  renderExpenses();
}

function deleteExpense(event) {
  if (event.target.classList.contains("delete-btn")) {
    let expenseIndex = parseInt(event.target.getAttribute("data-id"));
    expenses.splice(expenseIndex, 1);

    renderExpenses()
  }
}

expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

renderExpenses();