import { navbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  let navbarContainer = document.getElementById("navbar");
  navbarContainer.innerHTML = navbar;
});
