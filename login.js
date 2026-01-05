const users = {
  bharani: "1234",
  admin: "admin123"
};

const form = document.getElementById("loginForm");
const error = document.getElementById("error");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btnText");
const welcomeScreen = document.getElementById("welcomeScreen");
const welcomeUser = document.getElementById("welcomeUser");

// SHOW / HIDE PASSWORD
togglePassword.addEventListener("click", () => {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
});

// LOGIN
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = passwordInput.value;

  if (users[username] === password) {

    spinner.style.display = "inline-block";
    btnText.textContent = "Logging in...";
    document.getElementById("loginBtn").disabled = true;
    error.textContent = "";

    setTimeout(() => {
      form.style.display = "none";

      welcomeUser.textContent = username;
      welcomeScreen.style.display = "flex";

      setTimeout(() => {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
      }, 1200);

    }, 800);

  } else {
    error.textContent = "Invalid username or password";
  }
});
