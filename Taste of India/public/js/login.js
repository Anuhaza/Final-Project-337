let type = "login";
const swapLoginSignupDiv = document.getElementById("login-signup-swap");
const swapLoginSignupText = document.getElementById("login-signup-swap-text");
const usernameFieldGroup = document.getElementById("username-field-group");
const termsFieldGroup = document.getElementById("terms-field-group");
const formBtn = document.getElementById("create-account-btn");
const form = document.getElementById("form");
const usernameField = document.getElementById("username");
const termsField = document.getElementById("terms");

function termsAndConditions() {
  var modal = document.getElementById("modal");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function () {
    modal.style.display = "none";
  };
}

function login() {
  document.getElementById("message").innerHTML = "";
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = {
    email: email,
    password: password,
  };

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        window.location.href = "/menu"; //redirect.
      } else {
        document.getElementById("message").innerHTML = data.message;
      }
    })
    .catch((error) => {
      document.getElementById("message").innerHTML =
        "An error occurred while login";
    });
}

function createAccount() {
  document.getElementById("message").innerHTML = "";
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  const user = {
    username: username,
    password: password,
    email: email,
  };

  fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        window.location.href = "/menu"; //redirect.
      } else {
        document.getElementById("message").innerHTML = data.message;
      }
    })
    .catch((error) => {
      document.getElementById("message").innerHTML = error;
    });
}

function toggleLogin(btn) {
  type = type === "signup" ? "login" : "signup";
  if (type === "signup") {
    // login to signup
    usernameFieldGroup.style.display = "block";
    swapLoginSignupText.textContent = "Already have an Account";
    termsFieldGroup.style.display = "flex";
    usernameField.disabled = false;
    termsField.disabled = false;
    btn.textContent = "Login";
    formBtn.textContent = "Create Account";
  } else {
    // signup to login
    usernameFieldGroup.style.display = "none";
    swapLoginSignupText.textContent = "New here? Create an Account";
    termsFieldGroup.style.display = "none";
    usernameField.disabled = true;
    termsField.disabled = true;
    btn.textContent = "Here!";
    formBtn.textContent = "Login";
  }
  document.getElementById("message").innerHTML = "";
  document.getElementById("password").value = "";
  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (type === "signup") {
    createAccount();
  } else {
    login();
  }
});
