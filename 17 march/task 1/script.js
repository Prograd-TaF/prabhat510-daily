var transactionCount = 0;
var income = 0;
var expense = 0;

function addTransaction(event) {
  const text = document.getElementById("text").value;
  const amount = parseInt(document.getElementById("amount").value);
  var ele = document.getElementById("list");
  var li = document.createElement("li");
  li.innerHTML = text + " " + amount;
  ele.appendChild(li);
  const obj = {
    amount: amount,
    id: Math.floor(Math.random() * 100000),
    text: text,
  };

  localStorage.setItem(transactionCount, JSON.stringify(obj));
  transactionCount++;

  if (amount > 0) income += amount;
  else expense += Math.abs(amount);
  document.getElementById("money-plus").innerHTML = `$ ${income}`;
  document.getElementById("money-minus").innerHTML = `$ ${expense}`;
  document.getElementById("balance").innerHTML = `$ ${income - expense}`;
  console.log(text);
  console.log(amount);
}
function clearTransactions() {
  localStorage.clear();
}
