import "./index.css";

const spinner = document.querySelector(".spinner");

// Gestione API POST per il form richiesta informazioni

const form = document.querySelector<HTMLFormElement>(".richiedi-informazioni");
const submitBtn = form?.querySelector<HTMLButtonElement>(".send");
if (submitBtn) {
  submitBtn.disabled = true;
}
const inputs = form?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
  "input, textarea, checkbox"
);

inputs?.forEach((input) => {
  input.addEventListener("input", () => {
    const allFilled = Array.from(inputs).every((input) =>
      input.type === "checkbox"
        ? (input as HTMLInputElement).checked === true
        : input.value.length > 0
    );

    if (submitBtn) {
      submitBtn.disabled = !allFilled;
    }
  });
});

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {
    email: formData.get("email"),
    title: formData.get("firstName") + " " + formData.get("lastName"),
    content: formData.get("message"),
  };

  const endpoint = "/api/pub/createInfoRequest";
  try {
    // modal?.classList.toggle("active");
    spinner?.classList.add("loading");
    const response = await fetch(
      endpoint +
        `?email=${data.email}&title=${data.title}&content=${data.content}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("err:" + response.status);
    }

    const result = await response.json();

    toggleToast("La richiesta è stata inviata con successo", "success");
    form.reset();
  } catch (err) {
    toggleToast(
      err instanceof Error
        ? err.message
        : "La richiesta non è andata a buon fine",
      "error"
    );
  } finally {
    spinner?.classList.remove("loading");
  }
});
/**
 * Creates a toast notification element with the specified message and type
 * @param {string} message - The message to display in the toast
 * @param {string} type - The type of toast ('success' or 'error')
 * @returns {string} HTML string for the toast element
 */
const createToast = (message: string, type: string) => {
  const toast = `<div class="toast-item ${
    type === "success" ? "success" : "error"
  }">
    <div class="toast-icon">${type === "success" ? "✓" : "!"}</div>
    <div class="toast-content">
      <h4>${type === "success" ? "Successo" : "Errore"}</h4>
      <p>${message}</p>
    </div>
    <button class="toast-close">&times;</button>
  </div>`;

  return toast;
};

/**
 * Displays a toast notification and handles its removal
 * @param {string} message - The message to display in the toast
 * @param {string} type - The type of toast ('success' or 'error')
 */
const toggleToast = (message: string, type: string) => {
  form?.classList.add("error");
  const toastContainer = document.querySelector(".toast-container");
  const toast = createToast(message, type);

  toastContainer?.insertAdjacentHTML("beforeend", toast);

  const toastItem = document.querySelectorAll(".toast-item");
  const toastClose = document.querySelectorAll(".toast-close");

  toastClose?.forEach((item) => {
    item.addEventListener("click", () => {
      item.parentElement?.remove();
    });
  });
  setTimeout(() => {
    toastItem?.forEach((item) => item.remove());
  }, 3000);
};
