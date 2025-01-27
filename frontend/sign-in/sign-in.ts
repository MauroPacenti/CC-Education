import "./sign-in.css";
const form = document.querySelector<HTMLFormElement>(".login-form");
const spinner = document.querySelector(".spinner");
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
 * Displays a toast notification and handles its lifecycle
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

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.remove("error");
  const formData = new FormData(form);

  const url = "http://localhost:8080/login";
  spinner?.classList.add("loading");
  fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Dati non validi");
      }
      const responseData = response.json();

      window.location.href = "/dashboard/";
    })
    .catch((error) => {
      toggleToast(
        error instanceof Error
          ? error.message
          : "La richiesta non è andata a buon fine",
        "error"
      );
    })
    .finally(() => {
      spinner?.classList.remove("loading");
    });
});
