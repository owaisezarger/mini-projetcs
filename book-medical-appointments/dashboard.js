import { navbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  let navbarContainer = document.getElementById("navbar");
  navbarContainer.innerHTML = navbar;
});

//collecting appointmentData and posting it to API

let appointmentForm = document.getElementById("appointmentForm");
appointmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let name = appointmentForm.name.value;
  let image = appointmentForm.image.value;
  let specialization = appointmentForm.specialization.value;
  let experience = parseInt(appointmentForm.experience.value);
  let location = appointmentForm.location.value;
  let date = appointmentForm.date.value;
  let slots = parseInt(appointmentForm.slots.value);
  let fee = parseFloat(appointmentForm.fee.value);

  let appointmentObj = {
    name,
    image,
    specialization,
    experience,
    location,
    date,
    slots,
    fee,
  };
  //   console.log(appointmentObj);
  //posting appointmentObj
  try {
    let response = await fetch(
      "https://mock-json-server-o332.onrender.com/appointments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentObj),
      }
    );
    let data = await response.json();
    // console.log(data);
    appendTable();
    appointmentForm.reset();
  } catch (err) {
    console.log(err);
  }
});

//appending data to the table

let tbody = document.querySelector("tbody");

const appendTable = async () => {
  //fetch data from API
  let response = await fetch(
    "https://mock-json-server-o332.onrender.com/appointments"
  );
  let data = await response.json();
  //   console.log(data);

  //iterate over the data and append

  tbody.innerHTML = "";
  data.forEach((el) => {
    let tr = document.createElement("tr");
    let tdName = document.createElement("td");
    tdName.innerText = el.name;
    let tdExperience = document.createElement("td");
    tdExperience.innerText = el.experience;
    let tdSpecialization = document.createElement("td");
    tdSpecialization.innerText = el.specialization;
    let tdLocation = document.createElement("td");
    tdLocation.innerText = el.location;
    let tdSlots = document.createElement("td");
    tdSlots.innerText = el.slots;
    let tdEdit = document.createElement("td");
    tdEdit.innerText = "Edit";
    tdEdit.className = "editBtn";
    let tdDelete = document.createElement("td");
    tdDelete.innerText = "Delete";
    tdDelete.className = "deleteBtn";
    tdDelete.addEventListener("click", () => {
      let id = el.id;
      deleteAppointmentRow(id);
    });
    let tdAppointment = document.createElement("td");
    tdAppointment.innerText = "Appointment";
    tdAppointment.className = "appointmentBtn";

    tr.append(
      tdName,
      tdExperience,
      tdSpecialization,
      tdLocation,
      tdSlots,
      tdEdit,
      tdDelete,
      tdAppointment
    );
    tbody.appendChild(tr);
  });
};
appendTable();

//delete appointment row using id and Delete method

async function deleteAppointmentRow(id) {
  await fetch(`https://mock-json-server-o332.onrender.com/appointments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    response.json();
    appendTable();
  });
}
