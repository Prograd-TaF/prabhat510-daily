const showFeedbackPopUp = () => {
  const popUpContainer = document.getElementById("popUpContainer");
  popUpContainer.hidden = false;
};

if (window.location.href !== "http://localhost:5500/feedback") {
  setTimeout(() => {
    console.log("display popup");
    showFeedbackPopUp();
  }, 5000);
} else {
  showFeedbackPopUp();
}
let userFeedback = {
  likedArticle: null,
  suggestion: [],
  feedback: null,
};
if (sessionStorage.length !== 0) {
  userFeedback.user = JSON.parse(sessionStorage.getItem("user"));
  console.log(typeof sessionStorage.getItem("user"));
}

function logOut() {
  userLoggedIn = false;
  sessionStorage.clear();
  location.href = "http://localhost:5500/login";
}

function displayUserFeedbacks() {
  location.href = "http://localhost:5500/showfeedbacks";
}

getElementById("form1-submit").addEventListener("click", (event) => {
  let optionChosen = false;
  if (getElementById("form1-res1").checked) {
    optionChosen = true;
    userFeedback.likedArticle = "yes";
    getElementById("form1").hidden = true;
    getElementById("form3").hidden = false;
  } else if (getElementById("form1-res2").checked) {
    optionChosen = true;
    userFeedback.likedArticle = "no";
    getElementById("form1").hidden = true;
    getElementById("form2").hidden = false;
  } else if (getElementById("form1-res3").checked) {
    optionChosen = true;
    userFeedback.likedArticle = "not sure";
    getElementById("form1").hidden = true;
    getElementById("form3").hidden = false;
  }
  if (optionChosen === false) {
    alert("please choose any option");
  }
});

getElementById("form2-submit").addEventListener("click", (event) => {
  if (getElementById("form2-res1").checked) {
    userFeedback.suggestion.push(getElementById("form2-res1").value);
  }
  if (getElementById("form2-res2").checked) {
    userFeedback.suggestion.push(getElementById("form2-res2").value);
  }
  if (getElementById("form2-res3").checked) {
    userFeedback.suggestion.push(getElementById("form2-res3").value);
  }
  if (getElementById("form2-res4").checked) {
    userFeedback.suggestion.push(getElementById("form2-res4").value);
  }
  if (getElementById("form2-res5").checked) {
    userFeedback.suggestion.push(getElementById("form2-res5").value);
  }
  getElementById("form2").hidden = true;
  getElementById("form3").hidden = false;
});
getElementById("form3-submit").addEventListener("click", (event) => {
  userFeedback.feedback = getElementById("user-feedback").value;
  if (userFeedback.feedback === "") {
    alert("please fill this field");
  } else {
    getElementById("form3").hidden = true;
    alert("Thanks for your response");
    console.log(userFeedback);

    fetch("http://localhost:5500/user/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFeedback),
    });
  }
});

function getElementById(id) {
  return document.getElementById(id);
}
