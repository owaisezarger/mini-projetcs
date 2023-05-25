import { navbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  let navbarContainer = document.getElementById("navbar");
  navbarContainer.innerHTML = navbar;
});

let registerForm = document.getElementById("registerForm");
registerForm.style.display = "none";

let loginForm = document.getElementById("loginForm");
let loginBtn = document.getElementById("loginBtn");
let registerBtn = document.getElementById("registerBtn");

loginBtn.addEventListener("click", () => {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
});

registerBtn.addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});
