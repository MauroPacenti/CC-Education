import "./sign-in.css";
const form = document.querySelector<HTMLFormElement>(".login-form");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const url = "http://localhost:8080/login";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },

    credentials: "include",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        const responseData = response.json();
        console.log(responseData);
        window.location.href = "/dashboard/";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
