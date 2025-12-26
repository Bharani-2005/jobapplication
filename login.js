const users = {
  bharani: "1234",
  admin: "admin123"
};

const form = document.getElementById("loginForm");
const error = document.getElementById("error");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (users[username] && users[username] === password) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "index.html";
  } else {
    error.textContent = "Invalid username or password";
  }
});
