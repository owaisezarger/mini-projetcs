import { navbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  let navbarContainer = document.getElementById("navbar");
  navbarContainer.innerHTML = navbar;
});

let container = document.getElementById("container");

const getData = async () => {
  let response = await fetch(
    "https://mock-json-server-o332.onrender.com/appointments"
  );
  let data = await response.json();
  console.log(data);

  container.innerHTML = "";
  data.forEach((appointment) => {
    container.innerHTML += `
    <div class="card">
        <div class="card-body">
        <img class="card-img" src=${appointment.image} alt="${appointment.title}" />
            <h5 class="card-title">${appointment.name}</h5>
            <p class="card-text">Experience: ${appointment.experience}</p>
            <p class="card-text">Specialization: ${appointment.specialization}</p>
            <p class="card-text">Location: ${appointment.location}</p>
            <p class="card-text">Date: ${appointment.date}</p>
            <p class="card-text">Slots: ${appointment.slots}</p>
            <p class="card-text">Fee: ${appointment.fee}</p>
            <button id="book">Book Now</button>
            </div>
            </div>
            `;
  });
};

getData();
