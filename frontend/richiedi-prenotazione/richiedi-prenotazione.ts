import "./richiesta-prenotazione.css";

// Interazione con l'api per la richiesta di prenotazione

// Selezioniamo i campi data
const startDateInput = document.getElementById(
  "dataInizio"
) as HTMLInputElement;
const endDateInput = document.getElementById("dataFine") as HTMLInputElement;

// Impostiamo la data minima (data attuale) per i due campi
const today = new Date();
const minDate = new Date(today);
minDate.setDate(today.getDate()); // Il minimo per la data di inizio deve essere il giorno successivo
const minDateStr = minDate.toISOString().split("T")[0]; // Otteniamo la data in formato YYYY-MM-DD
startDateInput.min = minDateStr; // Impostiamo la data minima della data di inizio
endDateInput.min = minDateStr; // Impostiamo la data minima anche per la data di fine

// Funzione per abilitare/disabilitare la data finale e sincronizzarla con la data iniziale

// Funzione per sincronizzare le date
startDateInput.addEventListener("change", function () {
  const startDate = new Date(startDateInput.value);
  // Impostiamo la data minima della data di fine in base alla data di inizio
  endDateInput.min = startDate.toISOString().split("T")[0]; // La data finale non può essere anteriore alla data di inizio
});

// Se la data finale cambia, assicuriamoci che non sia prima della data di inizio
endDateInput.addEventListener("change", function () {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  if (endDate < startDate) {
    alert("La data di fine non può essere precedente alla data di inizio");
    endDateInput.value = startDateInput.value; // Imposta la data finale uguale alla data di inizio
  }
});

// Inizializza lo stato del campo data finale in base alla durata selezionata all'inizio

const privacyCheckbox = document.getElementById("privacy") as HTMLInputElement;
const termsCheckbox = document.getElementById("terms") as HTMLInputElement;
const submitButton = document.querySelector(".btn-submit") as HTMLButtonElement;

function updateSubmitButtonState(): void {
  if (privacyCheckbox.checked && termsCheckbox.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// Aggiungi un evento di ascolto ai checkbox
privacyCheckbox.addEventListener("change", updateSubmitButtonState);
termsCheckbox.addEventListener("change", updateSubmitButtonState);

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

const clearFormFields = (section: Element) => {
  const inputs = section.querySelectorAll<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >("input, select, textarea, checkbox");

  inputs.forEach((input) => {
    if (input instanceof HTMLInputElement && input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
};

const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");
const closeButtons = document.querySelectorAll(".close-button");
const modalLoading = document.querySelector("#modal-loading");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateStep(currentPage)) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }

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

  modalLoading?.classList.add("active");
  document.body.classList.add("no-scroll");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setTimeout(() => {
      modalLoading?.classList.remove("active");
    }, 10000);

    if (response.ok) {
      const json = await response.json();
      if (successModal !== null) {
        successModal.style.display = "block";
      }
    } else {
      if (errorModal !== null) {
        errorModal.style.display = "block";
      }
    }
  } catch (error) {
    modalLoading?.classList.remove("active");

    if (errorModal !== null) {
      errorModal.style.display = "block";
    }
  } finally {
    clearFormFields(section1);
    clearFormFields(section2);
    clearFormFields(groupSelect);
    clearFormFields(journeySelect);
    if (containerCheckbox) clearFormFields(containerCheckbox);

    modalLoading?.classList.remove("active");

    currentPage = 1;
    document.getElementById(`page3`)?.classList.remove("active");
    document.getElementById(`page2`)?.classList.remove("active");
    document.getElementById(`page1`)?.classList.add("active");

    document.querySelector(`#icon3`)?.classList.remove("active");
    document.querySelector(`#icon2`)?.classList.remove("active");
    document.querySelector(`#icon1`)?.classList.replace("done", "active");

    document.querySelector(`#icon1 img`)?.classList.remove("hide");
    document.querySelector(`#icon2 img`)?.classList.remove("hide");

    document.getElementById(`done1`)?.classList.add("hide");
    document.getElementById(`done2`)?.classList.add("hide");
    document.getElementById(`line1`)?.classList.remove("line-fill");
    document.getElementById(`line2`)?.classList.remove("line-fill");
  }
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (successModal !== null) successModal.style.display = "none";
    document.body.classList.remove("no-scroll");
    if (errorModal !== null) errorModal.style.display = "none";
    document.body.classList.remove("no-scroll");
  });
});

window.addEventListener("click", (event) => {
  if (event.target === successModal) {
    if (successModal !== null) successModal.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
  if (event.target === errorModal) {
    if (errorModal !== null) errorModal.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
});

// Gestione cambio pagine del form
let currentPage = 1;
const btnNext = document.querySelectorAll(".btn-next");
const btnPrev = document.querySelectorAll(".btn-prev");
const section1 = document.querySelector("#page1");
const section2 = document.querySelector("#page2");
const title = document.querySelector(".form-title");
const groupSelect = document.querySelector(".group");
const journeySelect = document.querySelector(".journey");
const containerCheckbox = document.querySelector(".container-check");

btnNext.forEach((btn) => {
  btn.addEventListener("click", () => {
    nextStep(currentPage);
  });
});

btnPrev.forEach((btn) => {
  btn.addEventListener("click", () => {
    prevStep(currentPage);
  });
});

// Fine Gestione cambio pagine del form

// Funzione di validazione del form di prenotazione

// Tipo per rappresentare un input HTML valido
type ValidatableInput = HTMLInputElement | HTMLTextAreaElement;

function showToast(message: string) {
  const toast = document.createElement("div");
  toast.className = "toast-error";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000); // Rimuove il toast dopo 3 secondi
}

function showInputError(input: ValidatableInput, message: string) {
  let errorElement = input.nextElementSibling as HTMLElement;

  // Se l'elemento di errore non esiste, crealo
  if (!errorElement || !errorElement.classList.contains("error-message")) {
    errorElement = document.createElement("p");
    errorElement.className = "error-message";
    input.parentNode?.insertBefore(errorElement, input.nextSibling);
  }

  // Mostra il messaggio di errore
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function hideInputError(input: ValidatableInput) {
  const errorElement = input.nextElementSibling as HTMLElement;

  if (errorElement && errorElement.classList.contains("error-message")) {
    errorElement.style.display = "none";
  }
}

function validateInput(input: ValidatableInput): boolean {
  const inputValue = input.value.trim();
  const fieldName = input.name;

  if (fieldName === "email" && !validateEmail(inputValue)) {
    if (!input.classList.contains("error")) {
      input.classList.add("error");
      input.classList.remove("success");
    }
    return false;
  } else if (fieldName === "phone" && !validatePhone(inputValue)) {
    if (!input.classList.contains("error")) {
      input.classList.add("error");
      input.classList.remove("success");
    }
    return false;
  } else if (fieldName === "cf" && !validateCF(inputValue)) {
    if (!input.classList.contains("error")) {
      input.classList.add("error");
      input.classList.remove("success");
    }
    return false;
  }

  // Controlla se l'input è vuoto
  if (!inputValue) {
    showInputError(input, `Il campo "${input.id}" non può essere vuoto.`);
    // Mostra un toast solo se non c'è già la classe di errore
    if (!input.classList.contains("error")) {
      input.classList.add("error");
      input.classList.remove("success");
    }
    return false;
  } else {
    if (!input.classList.contains("success")) {
      input.classList.remove("error");
      input.classList.add("success");
    }

    hideInputError(input);
    return true;
  }
}

// Funzione di validazione per l'email
function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Funzione di validazione per il telefono
function validatePhone(phone: string): boolean {
  const phoneRegex =
    /^(\+?[1-9]{1,4}[\s-]?)?(\(?\d{1,4}\)?[\s-]?)?[\d\s-]{6,15}$/;
  return phoneRegex.test(phone);
}

// Funzione di validazione per il codice fiscale
function validateCF(cf: string): boolean {
  const cfRegex = /^[a-zA-Z0-9]{16}$/;
  return cfRegex.test(cf);
}

// Funzione per validare tutti gli input di uno step
function validateStep(step: number): boolean {
  const inputs = document.querySelectorAll<ValidatableInput>(
    `#page${step} input`
  );
  let isStepValid = true;

  inputs.forEach((input) => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    const labelText = label ? label.textContent : label;

    if (!validateInput(input)) {
      isStepValid = false;
      showInputError(
        input,
        `Il campo ${labelText} è obbligatorio o non valido.`
      );
    } else {
      hideInputError(input);
    }
  });

  return isStepValid;
}

// Funzione per passare allo step successivo
function nextStep(current: number): void {
  if (validateStep(current)) {
    document.getElementById(`page${current}`)?.classList.remove("active");
    document.getElementById(`page${current + 1}`)?.classList.add("active");
    document
      .getElementById(`icon${current}`)
      ?.classList.replace("active", "done");
    document.getElementById(`icon${current + 1}`)?.classList.add("active");
    document.getElementById(`done${current}`)?.classList.add("check-animation");
    document.getElementById(`line${current}`)?.classList.add("line-fill");
    document.querySelector(`#icon${current} img`)?.classList.add("hide");
    document.getElementById(`done${current}`)?.classList.remove("hide");

    if (currentPage === 1) {
      if (title !== null) {
        title.textContent = "Dati Organizzazione";
      }
    } else if (currentPage === 2) {
      if (title !== null) {
        title.textContent = "Dati Prenotazione";
      }
    }

    currentPage++;
  } else {
    showToast("Compila tutti i campi obbligatori correttamente per procedere.");
  }
}

// Funzione per tornare allo step precedente
function prevStep(current: number): void {
  document.getElementById(`page${current}`)?.classList.remove("active");
  document.getElementById(`page${current - 1}`)?.classList.add("active");
  document.querySelector(`#icon${current}`)?.classList.remove("active");
  document
    .querySelector(`#icon${current - 1}`)
    ?.classList.replace("done", "active");
  // document.getElementById(`icon${current}`)?.classList.add("active");
  document.querySelector(`#icon${current - 1} img`)?.classList.remove("hide");
  document.getElementById(`done${current - 1}`)?.classList.add("hide");
  document.getElementById(`line${current - 1}`)?.classList.remove("line-fill");

  if (currentPage === 3) {
    if (title !== null) {
      title.textContent = "Dati Organizzazione";
    }
  } else if (currentPage === 2) {
    if (title !== null) {
      title.textContent = "Dati Accompagnatore";
    }
  }

  currentPage--;
}

// Aggiunge il listener per validare gli input in tempo reale
document
  .querySelectorAll<ValidatableInput>("input, textarea, select")
  .forEach((input) => {
    input.addEventListener("input", () => validateInput(input));
  });
