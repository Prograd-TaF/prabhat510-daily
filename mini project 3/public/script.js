function redirectToSignup() {
  location.href = "http://127.0.0.1:5500/signup.html";
}

function redirectToLogin() {
  location.href = "http://127.0.0.1:5500/login.html";
}
//handling user login and signup

var userCount = 0;

function validateUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("signup-user-email").value;
  const username = document.getElementById("signup-user").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // const nameRegex = /^([a-zA-Z]\s){1,25}$/;
  if (localStorage.getItem(username) !== null) {
    alert("user already exits");
    return false;
  }
  if (localStorage.getItem(email) !== null) {
    alert("email already exits");
    return false;
  }
  // if (!nameRegex.test(name)) {
  //   console.log(
  //     `name can contain 1 to 25 characters only, no special characters or numbers are allowed`
  //   );
  //   return false;
  // }

  const emailRegex = /^([a-zA-Z0-9\.]+)@([a-zA-Z]+).com/;
  if (!emailRegex.test(email)) {
    alert(`email is invalid`);
    return false;
  }

  const userRegex = /([a-zA-Z0-9]+)/;
  if (!userRegex.test(username)) {
    alert("username can contain alphabets and numbers only");
    return false;
  }
  const passwordRegex = /^[A-Za-z]\w{7,14}$/;

  if (!passwordRegex.test(password)) {
    alert(
      "password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
    );
    return false;
  }
  if (password !== confirmPassword) {
    alert(`passwords to not match`);
    return false;
  }
  return true;
}

function createAccount() {
  if (!validateUser()) return;

  const userObject = {
    name: document.getElementById("name").value,
    username: document.getElementById("signup-user").value,
    password: document.getElementById("signup-password").value,
    email: document.getElementById("signup-user-email").value,
  };
  console.log(userObject);
  localStorage.setItem(userObject.username, JSON.stringify(userObject));
  userCount++;
  location.href = "http://127.0.0.1:5500/login.html";
}

function loginUser() {
  const username = document.getElementById("login-user").value;
  const password = document.getElementById("login-password").value;

  const storedUser = localStorage.getItem(username);
  if (storedUser !== null) {
    const storedUserPassword = JSON.parse(storedUser).password;
    console.log(storedUserPassword);
    if (password === storedUserPassword) {
      location.href = "http://127.0.0.1:5500";
      const userData = localStorage.getItem(username);
      sessionStorage.setItem("user", userData);
    } else {
      alert(`incorrect password`);
    }
  } else {
    alert("user doesnot exists");
  }
}

// The Home Page Script

document.getElementById("feat-tem").addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/temprature";
});

document.getElementById("feat-num").addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/numbers";
});

document.getElementById("feat-cur").addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/currency";
});

document.getElementById("feat-spe").addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/speed";
});

// temprature conversion

function convertTemprature() {
  let temprature_input = document.getElementById("temprature-input");
  if (temprature_input.value.length === 0) {
    alert("this field cannot be empty");
    return;
  }

  temprature_input = parseInt(temprature_input.value);
  const from = document.getElementById("from-temprature").value;
  const to = document.getElementById("to-temprature").value;
  let ans = temprature_input;
  if (from === to) {
    ans = temprature_input;
  } else if (from === "celsius") {
    switch (to) {
      case "fahrenheit":
        ans = (temprature_input * 9) / 5 + 32;
        break;

      case "kelvin":
        ans = temprature_input + 273.15;
        break;
    }
  } else if (from === "fahrenheit") {
    switch (to) {
      case "celsius":
        ans = (temprature_input - 32) / 1.8;
        break;

      case "kelvin":
        ans = ((temprature_input + 459.67) * 5) / 9;
        break;
    }
  } else {
    switch (to) {
      case "celsius":
        ans = temprature_input - 273.15;
        break;

      case "fahrenheit":
        ans = (temprature_input * 9) / 5 - 459.67;
        break;
    }
  }
  console.log(ans);
  document.getElementById("temprature-res").innerHTML = ans + " " + to;
}

// Number conversion

function convertNumber() {
  let number_input = document.getElementById("number-input");
  if (number_input.value.length === 0) {
    alert("this field cannot be empty");
    return;
  }

  const from = document.getElementById("from-number").value;
  const to = document.getElementById("to-number").value;
  let ans = number_input.value;
  // handling different scenarios
  number_input = number_input.value;
  if (from === to) {
    ans = number_input;
  } else if (from === "decimal") {
    switch (to) {
      case "binary":
        ans = parseInt(number_input, 10).toString(2);
        break;
      case "hexadecimal":
        ans = parseInt(number_input, 10).toString(16);
        break;
    }
  } else if (from === "binary") {
    switch (to) {
      case "decimal":
        ans = parseInt(number_input, 2);
        break;
      case "hexadecimal":
        ans = parseInt(number_input, 2); //Convert binary to hex
        ans = ans.toString(16); //Convert decimal to hex
        break;
    }
  } else if (from === "hexadecimal") {
    switch (to) {
      case "decimal":
        ans = parseInt(number_input, 16);
        break;
      case "binary":
        ans = ("00000000" + parseInt(number_input, 16).toString(2)).substr(-8);
        break;
    }
  }
  document.getElementById("numbers-res").innerHTML = `${to}: ${ans}`;
}

// currency conversion

function convertAmount() {
  const amount = document.getElementById("amount").value;

  if (amount.length === 0) {
    alert("this field cannot be empty");
    return;
  }
  const from = document.getElementById("from-curr").value;
  const to = document.getElementById("to-curr").value;

  fetch(
    `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "currency-res"
      ).innerHTML = `${data.result} ${to}`;
    });
}

// speed conversion

function convertSpeed() {
  const from = document.getElementById("from-speed").value;
  const to = document.getElementById("to-speed").value;
  const speed = document.getElementById("speed").value;

  if (speed.length === 0) {
    alert("this field cannot be empty");
    return;
  }

  let ans = speed;
  if (from === to) {
    ans = speed;
  } else if (from === "mps") {
    switch (to) {
      case "mph":
        ans = speed * 2.236936;
        break;

      case "kmph":
        ans = speed * 3.6;
        break;
    }
  } else if (from === "mph") {
    switch (to) {
      case "mps":
        ans = speed / 0.44704;
        break;

      case "kmph":
        ans = speed * 1.60934;
        break;
    }
  } else {
    switch (to) {
      case "mps":
        ans = speed / 3.6;
        break;

      case "mph":
        ans = speed / 1.60934;
        break;
    }
  }
  document.getElementById("speed-res").innerHTML = `${ans} ${to}`;
}

function handleFeedback() {
  location.href = "http://localhost:5500/feedback";
}
