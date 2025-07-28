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

const showData = function () {
  tbody.innerHTML = "";
  let dataNo = 1;

  expenseData.forEach(function (data, index) {
    let dataRow = document.createElement("tr");

    // load from local storage
    const storedData = localStorage.getItem("expenseData");
    if (storedData) {
        expenseData = JSON.parse(storedData);
        console.log(expenseData);
    } else {
        expenseData = []; // fallback
    }

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

    const removeExpense = document.querySelector(".expense--remove");
    removeExpense.addEventListener("click", function () {
      expenseData.splice(index, 1);

      for (let i = 0; i < expenseData.length; i++) {
        expenseData[i].idx = i;
      }

      storeExpenseToLocal();
      showData();
      showTotalExpense();
    });
  });
};

const showTotalExpense = function () {
  let totalExpense = 0;
  for (let i = 0; i < expenseData.length; i++) {
    totalExpense += parseInt(expenseData[i].amount);
  }
  document.getElementById("total-expense").innerHTML = totalExpense;
};

const addData = function (idx, name, amount, date, category) {
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
};

// remove expense from both table and local storage
const removeExpense = function (index) {
  expenseData.splice(index, 1);

  for (let i = 0; i < expenseData.length; i++) {
    expenseData[i].idx = i;
  }

  showData();
  showTotalExpense();
};

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  addData(dataNo, Expname.value, amount.value, date.value, category.value);
  expenseForm.reset();
});

// function storeLocal(name, amount, date, category){
//     let key = dataNo
// }

const storeExpenseToLocal = function () {
  localStorage.setItem("expenseData", JSON.stringify(expenseData));
};

// const loadExpensefromLocal = function () {
//   JSON.parse(localStorage.getItem("expenseData"));
// };