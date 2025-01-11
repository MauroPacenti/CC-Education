import "./richiesta-prenotazione.css";

// Interazione con l'api per la richiesta di prenotazione

const form = document.querySelector<HTMLFormElement>(".appointment-form");

// funzione per recuperare i dati del form visibile
const getVisibleFormData = (section: Element) => {
  const inputs = section.querySelectorAll<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >("input, select, textarea");
  const formData = new FormData();
  inputs.forEach((input) => {
    if (input.name) {
      formData.append(input.name, input.value);
    }
  });
  return Object.fromEntries(formData.entries());
};

const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");
const closeButtons = document.querySelectorAll(".close-button");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (
    section1 === null ||
    section2 === null ||
    groupSelect === null ||
    journeySelect === null
  )
    return;

  const keeper = getVisibleFormData(section1);
  const organization = getVisibleFormData(section2);
  const group = getVisibleFormData(groupSelect);
  const journey = getVisibleFormData(journeySelect);

  const data = {
    keeper,
    organization,
    group,
    journey,
  };

  console.log(data);

  const endpoint = "api/pub/createJourneyRequest";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const json = await response.json();
    console.log(json);
    if (successModal !== null) {
      successModal.style.display = "block";
    }
  } else {
    console.error("Errore nella richiesta di prenotazione");
    if (errorModal !== null) {
      errorModal.style.display = "block";
    }
  }
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (successModal !== null) successModal.style.display = "none";
    if (errorModal !== null) errorModal.style.display = "none";
  });
});

window.addEventListener("click", (event) => {
  if (event.target === successModal) {
    if (successModal !== null) successModal.style.display = "none";
  }
  if (event.target === errorModal) {
    if (errorModal !== null) errorModal.style.display = "none";
  }
});

// Gestione cambio pagine del form
let currentPage = 0;
const btnNext = document.querySelectorAll(".btn-next");
const btnPrev = document.querySelectorAll(".btn-prev");
const section1 = document.querySelector("#page1");
const section2 = document.querySelector("#page2");
const section3 = document.querySelector("#page3");
const icon1 = document.querySelector("#icon1");
const icon2 = document.querySelector("#icon2");
const icon3 = document.querySelector("#icon3");
const i1 = document.querySelector("#icon1 img");
const i2 = document.querySelector("#icon2 img");
const title = document.querySelector(".form-title");
const done1 = document.querySelector("#done1");
const done2 = document.querySelector("#done2");
const groupSelect = document.querySelector(".group");
const journeySelect = document.querySelector(".journey");

btnNext.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentPage === 0) {
      if (title !== null) {
        title.textContent = "Dati Organizzazione";
      }
      section1?.classList.remove("active");
      section2?.classList.add("active");
      icon1?.classList.replace("active", "done");
      icon2?.classList.add("active");
      i1?.classList.add("hide");
      done1?.classList.remove("hide");

      currentPage++;
    } else if (currentPage === 1) {
      if (title !== null) {
        title.textContent = "Dati Prenotazione";
      }
      section2?.classList.remove("active");
      section3?.classList.add("active");
      icon2?.classList.replace("active", "done");
      icon3?.classList.add("active");
      i2?.classList.add("hide");
      done2?.classList.remove("hide");
      currentPage++;
    }
  });
});

btnPrev.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentPage === 2) {
      if (title !== null) {
        title.textContent = "Dati Organizzazione";
      }
      section3?.classList.remove("active");
      section2?.classList.add("active");
      icon3?.classList.remove("active");
      icon2?.classList.replace("done", "active");
      i2?.classList.remove("hide");
      done2?.classList.add("hide");
      currentPage--;
    } else if (currentPage === 1) {
      if (title !== null) {
        title.textContent = "Dati Accompagnatore";
      }
      section2?.classList.remove("active");
      section1?.classList.add("active");
      icon2?.classList.remove("active");
      icon1?.classList.replace("done", "active");
      i1?.classList.remove("hide");
      done1?.classList.add("hide");
      currentPage--;
    }
  });
});

// Fine Gestione cambio pagine del form
