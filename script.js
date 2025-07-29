// write javascript here

const expenseForm = document.getElementById("expenseForm");
const expenseTable = document.getElementById("expenseTable");
const Expname = document.getElementById("name");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const category = document.getElementById("category");

const tbody = expenseTable.querySelector("tbody");

const btnAddExpense = document.getElementsByClassName("expense--add");

let expenseData = [];

let dataNo = 1;

function getExpenseFromLocal() {
  if (localStorage.getItem("expenseData")) {
    expenseData = JSON.parse(localStorage.getItem("expenseData"));
    showData();
    showTotalExpense();
  }
}

function showData() {
  tbody.innerHTML = "";
  let dataNo = 1;

  expenseData.forEach(function (data, index) {
    let dataRow = document.createElement("tr");

    // load from local storage
    dataRow.innerHTML = `<tr>
                            <td>${dataNo}</td>
                            <td>${data.name}</td>
                            <td>${data.amount}</td>
                            <td>${data.date}</td>
                            <td>${data.category}</td>
                            <td><button class="btn expense--remove" data-index="${index}">Remove</button></td>
                        </tr>`;

    tbody.appendChild(dataRow);
    dataNo++;
    // if(dataNo > 3){
    //   tbody.style.height = "20rem";
    //   tbody.style.overflowY = "scroll";
    // }
  });
}

function showTotalExpense() {
  let totalExpense = 0;
  for (let i = 0; i < expenseData.length; i++) {
    totalExpense += parseInt(expenseData[i].amount);
  }
  document.getElementById("total-expense").innerHTML = totalExpense;
}

function addData(idx, name, amount, date, category) {
  const data = {
    idx: idx,
    name: name,
    amount: amount,
    date: date,
    category: category,
  };
  expenseData.push(data);
  console.log(expenseData);
  showData();
  storeExpenseToLocal();
  showTotalExpense();
}

function storeExpenseToLocal() {
  localStorage.setItem("expenseData", JSON.stringify(expenseData));
}

// remove expense from both table and local storage
function removeExpense(index) {
  expenseData.splice(index, 1);
  for (let i = 0; i < expenseData.length; i++) {
    expenseData[i].idx = i;
  }
  showData();
  showTotalExpense();
  storeExpenseToLocal();
}

// function storeLocal(name, amount, date, category){
//     let key = dataNo
// }

// Remove expense
tbody.addEventListener("click", function (e) {
  if (e.target.classList.contains("expense--remove")) {
    let index = e.target.getAttribute("data-index");
    removeExpense(index);
  }
});

window.addEventListener("DOMContentLoaded", getExpenseFromLocal);

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  addData(dataNo, Expname.value, amount.value, date.value, category.value);
  expenseForm.reset();
});
