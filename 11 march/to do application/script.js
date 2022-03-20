function addTask() {
  var task = document.getElementById("myInput").value;
  var li = document.createElement("li");
  li.innerHTML = task;
  var ul = document.getElementById("myUL");
  ul.appendChild(li);
}
function deleteTask() {
  var li = document.getElementsByTagName("li");
  li.className = "checked";
}
