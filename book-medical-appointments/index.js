//import navbar
import { navbar } from "./navbar.js";

//render navbar
document.addEventListener("DOMContentLoaded", () => {
  let navbarContainer = document.getElementById("navbar");
  navbarContainer.innerHTML = navbar;
});

//default registerForm hidden
let registerForm = document.getElementById("registerForm");
registerForm.style.display = "none";

let loginForm = document.getElementById("loginForm");
let loginBtn = document.getElementById("loginBtn");
let registerBtn = document.getElementById("registerBtn");

//click on login to see loginForm
loginBtn.addEventListener("click", () => {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
});

//click on register to see registerForm

registerBtn.addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

//post login form data to api/users
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let username = document.getElementById("loginUsername").value;
  let password = document.getElementById("loginPassword").value;

  //create obj with the data to post
  let userLoginObj = {
    username: username,
    password: password,
  };
  console.log(userLoginObj);

  //try block
  try {
    let response = await fetch(
      "https://mock-json-server-o332.onrender.com/users"
    );
    let data = await response.json();
    console.log(data);

    //check if user exists
    let userFound = false;
    data.forEach((user) => {
      if (
        user.username === userLoginObj.username &&
        user.password === userLoginObj.password
      ) {
        userFound = true;
        //conditional redirect to different pages based on role
        if (user.isDoctor) {
          window.location.href = "./dashboard.html";
        } else {
          window.location.href = "./booking.html";
        }
      }
    });
    alert("user logged in successfully");

    if (!userFound) {
      alert("user not found");
      return;
    }
  } catch (e) {
    //catch block for any error
    console.log(e);
    alert(e);
    return;
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  let isDoctor = document.getElementById("isDoctor").checked;

  let userRegisterObj = {
    username: username,
    password: password,
    email: email,
    isDoctor: isDoctor,
  };
  console.log(userRegisterObj);
  try {
    let response = await fetch(
      "https://mock-json-server-o332.onrender.com/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegisterObj),
      }
    );
    alert("User registration successful");
    registerForm.reset();
  } catch (e) {
    console.log(e);
    alert(e);
    return;
  }
});
