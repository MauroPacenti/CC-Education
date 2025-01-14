import "./richiesta-prenotazione.css";

// Interazione con l'api per la richiesta di prenotazione

const form = document.querySelector<HTMLFormElement>(".appointment-form");

const formData: {
  keeper: {
    firstName: string;
    lastName: string;
    email: string;
    cf: string;
    phone: string;
  };
  group: {
    minors: number;
    adults: number;
  };
  organization: {
    name: string;
    type: string;
    address: string;
    phone: string;
    email: string;
  };
  journeyRequest: {
    startAvailabilityDate: string;
    endAvailabilityDate: string;
    duration: number;
  };
} = {
  keeper: {
    firstName: "",
    lastName: "",
    email: "",
    cf: "",
    phone: "",
  },
  group: {
    minors: 0,
    adults: 0,
  },
  organization: {
    name: "",
    type: "",
    address: "",
    phone: "",
    email: "",
  },
  journeyRequest: {
    startAvailabilityDate: "",
    endAvailabilityDate: "",
    duration: 0,
  },
};

// funzione per recuperare i dati del form visibile
const getVisibleFormData = (section: Element) => {
  const inputs = section.querySelectorAll<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >("input, select, textarea");

  const data: Record<string, string | number> = {};
  inputs.forEach((input) => {
    if (input.name) {
      data[input.name] =
        input.type === "number" ? Number(input.value) : input.value;
    }
  });

  return data as any;
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

  formData.keeper = keeper;
  formData.organization = organization;
  formData.group = group;
  formData.journeyRequest = journey;

  formData.group.minors = Number(formData.group.minors);
  formData.group.adults = Number(formData.group.adults);
  formData.journeyRequest.duration = Number(formData.journeyRequest.duration);

  const endpoint = "/api/pub/createJourneyRequest";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const json = await response.json();
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

    if(validateForm(currentPage)){
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
    } else {
      alert("Compila correttamente tutti i campi obbligatori.");
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

// Funziona di validazione del form di prenotazione

const validateForm = (page: number): boolean => {

    let isValid = true;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const cfPattern = /^[A-Z0-9]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/;

    const phonePattern = /^\+?[0-9]{1,4}?[-.\s]?[0-9]{6,10}$/;

    // Validazione del primo step (Accompagnatore)
    if(page === 0) {
      
        const firstName = form?.querySelector<HTMLInputElement>('[name="firstName"]');
        const lastName = form?.querySelector<HTMLInputElement>('[name="lastName"]');
        const email = form?.querySelector<HTMLInputElement>('[name="email"]');
        const cf = form?.querySelector<HTMLInputElement>('[name="cf"]');
        const phone = form?.querySelector<HTMLInputElement>('[name="phone"]');


        if(!firstName?.value.trim()){
            firstName?.classList.add('error');
            isValid = false;
        } else {
            firstName.classList.remove('error');
        }

        if (!lastName?.value.trim()) {
          lastName?.classList.add('error');
          isValid = false;
        } else {
          lastName.classList.remove('error');
        }

        if(!email?.value.trim() || !emailPattern.test(email.value)) {
          email?.classList.add('error');
          isValid = false;
        } else {
          email.classList.remove('error');
        }

        if(!cf?.value.trim() || !cfPattern.test(cf.value)){
          cf?.classList.add('error');
          isValid = false;
        } else {
          cf.classList.remove('error');
        }

        if(!phone?.value.trim() || !phonePattern.test(phone.value)) {
          phone?.classList.add('error');
          isValid = false;
        } else {
          phone.classList.remove('error');
        }
    }

    // Validazione del secondo step (Organizzazione)
    if(page === 1){
      const nameOrg = form?.querySelector<HTMLInputElement>('[name="name"]');
      const typeOrg = form?.querySelector<HTMLInputElement>('[name="type"]');
      const addressOrg = form?.querySelector<HTMLInputElement>('[name="address"]');
      const phoneOrg = form?.querySelector<HTMLInputElement>('[name="phone"]');
      const emailOrg = form?.querySelector<HTMLInputElement>('[name="email"]');

      if(!nameOrg?.value.trim()) {
        nameOrg?.classList.add('error');
        isValid = false;
      } else {
        nameOrg.classList.remove('error');
      }

      if(!typeOrg?.value.trim()) {
        typeOrg?.classList.add('error');
        isValid = false;
      } else {
        typeOrg.classList.remove('error');
      }

      if (!addressOrg?.value.trim()) {
        addressOrg?.classList.add('error');
        isValid = false;
      } else {
        addressOrg.classList.remove('error');
      }

      if (!phoneOrg?.value.trim() || !phonePattern.test(phoneOrg.value)) {
        phoneOrg?.classList.add('error');
        isValid = false;
      } else {
        phoneOrg.classList.remove('error');
      }

      if(!emailOrg?.value.trim() || !emailPattern.test(emailOrg.value)) {
        emailOrg?.classList.add('error');
        isValid = false;
      } else {
        emailOrg.classList.remove('error');
      }
      
    }

    // Validazione del terzo step (Prenotazione)
    if(page === 2) {
      const minors = form?.querySelector<HTMLInputElement>('[name="minors"]');
      const adults = form?.querySelector<HTMLInputElement>('[name="adults"]');
      const startDate = form?.querySelector<HTMLInputElement>('[name="startAvailabilityDate"]');
      const endDate = form?.querySelector<HTMLInputElement>('[name="endAvailabilityDate"]');
      const duration = form?.querySelector<HTMLInputElement>('[name="duration"]');

      if(minors?.value.trim() === "" || Number(minors?.value) < 0) {
        minors?.classList.add('error');
        isValid = false;
      } else {
        minors?.classList.remove('error');
      }

      if(adults?.value.trim() === "" || Number(adults?.value) <= 0) {
        adults?.classList.add('error');
        isValid = false;
      } else {
        adults?.classList.remove('error');
      }

      if(!startDate?.value.trim() || !endDate?.value.trim() || new Date(startDate.value) >= new Date(endDate.value)) {
        startDate?.classList.add('error');
        endDate?.classList.add('error');
        isValid = false;
      } else {
        startDate.classList.remove('error');
        endDate.classList.remove('error');
      }

      if(duration?.value.trim() === "" || Number(duration?.value) <= 0) {
        duration?.classList.add('error');
        isValid = false;
      } else {
        duration?.classList.remove('error');
      }
    }

    return isValid;
}
