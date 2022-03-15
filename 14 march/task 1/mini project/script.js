const items = {
  chocolate: 300,
  strawberry: 100,
  butterscotch: 200,
  vanilla: 250,
  Redvelvet: 100,
};
var cost = 0;
var layer = 0;
function addItem(item) {
  switch (item) {
    case "chocolate":
      cost += 300;
      var temp = document.getElementById("items");
      var node = document.createTextNode("chocolate ---- 300");
      var tag = document.createElement("li");
      tag.append(node);
      temp.appendChild(tag);

      layer += 1;
      addLayer("chocolate");
      break;
    case "strawberry":
      cost += 100;
      var temp = document.getElementById("items");
      var node = document.createTextNode("strawberry ---- 100");
      var tag = document.createElement("li");
      tag.append(node);
      temp.appendChild(tag);

      layer += 1;
      addLayer("strawberry");
      break;
    case "butterscotch":
      cost += 200;
      var temp = document.getElementById("items");
      var node = document.createTextNode("butterscotch ---- 200");
      var tag = document.createElement("li");
      tag.append(node);
      temp.appendChild(tag);

      layer += 1;
      addLayer("butterscotch");
      break;
    case "vanilla":
      cost += 250;
      var temp = document.getElementById("items");
      var node = document.createTextNode("vanilla ---- 250");
      var tag = document.createElement("li");
      tag.append(node);
      temp.appendChild(tag);

      layer += 1;
      addLayer("vanilla");
      break;
    case "Readvelvet":
      cost += 100;
      var temp = document.getElementById("items");
      var node = document.createTextNode("Redvelvet ---- 100");
      var tag = document.createElement("li");
      tag.append(node);
      temp.appendChild(tag);

      layer += 1;
      addLayer("Redvelvet");
      break;
  }
}
function buyItems() {
  if (cost === 0) {
    alert("please select items");
    return;
  }
  var tag = document.createElement("li");
  var node = document.createTextNode(`Total ---- ${cost}`);
  tag.append(node);
  var temp = document.getElementById("items");
  temp.appendChild(tag);
  tag.className = "total";
}

function addLayer(layer_name) {
  var select = document.getElementById(`layer${layer}`);
  select.innerHTML = layer_name;
}
