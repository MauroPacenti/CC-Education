import "./index.css";

// Gestione API POST per il form richiesta informazioni

const form = document.querySelector<HTMLFormElement>(".richiedi-informazioni");

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

    console.log(data);

    if (!response.ok) {
      throw new Error("err:" + response.status);
    }
    const result = await response.json();
  } catch (err) {
    console.error(err);
  }
});
