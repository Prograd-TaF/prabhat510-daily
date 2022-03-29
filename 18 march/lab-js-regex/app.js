function formValidate() {
  const name = document.getElementsByName("Name")[0].value;
  const address = document.getElementsByName("Address")[0].value;
  const email = document.getElementsByName("EMail")[0].value;
  const password = document.getElementsByName("Password")[0].value;
  const matchPassword = document.getElementsByName("cPassword")[0].value;
  const phone = document.getElementsByName("phone")[0].value;

  if (name === "") {
    document.getElementById("name").innerHTML = "name field cannot be empty";
  } else if (address === "") {
    document.getElementById("address").innerHTML =
      "address field cannot be empty";
  } else if (email === "") {
    document.getElementById("email").innerHTML = "email field cannot be empty";
  } else if (password === "") {
    document.getElementById("pwd").innerHTML = "password field cannot be empty";
  } else if (matchPassword === "") {
    document.getElementById("cpwd").innerHTML =
      "password field cannot be empty";
  } else if (phone === "") {
    document.getElementById("phone").innerHTML =
      "phone no field cannot be empty";
  } else {
    const nameRegex = /^[a-zA-Z_\s]{8,15}$/;
    const emailRegex = /^([a-zA-Z_\.0-9]+)@([a-zA-Z]+).com$/;
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const phoneRegex = /^[0-9]{10}$/;
    if (!nameRegex.test(name))
      alert(
        "username should contain a minimum of 8 characters and a maximum of 15 characters"
      );
    else if (!emailRegex.test(email)) {
      alert("Email should contain @, .(dot) or underscore");
    } else if (passRegex.test(password)) {
      alert(
        "password must contain 1 uppercase letter, 1 lowercase letter, atleast 1 number, password must contain the following special characters !@#$%^&*()."
      );
    } else if (!phoneRegex.test(phone)) {
      alert("Phone number should be numerical in nature. with 10 digits");
    }
    if (password !== matchPassword) {
      alert("passwords do not match");
    }
  }
}
