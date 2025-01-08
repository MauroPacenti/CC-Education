import "../global.css";
import "./richiesta-prenotazione.css";

// // POST verso /api/richiedi-prenotazione

// /**
//  * @name startSpinner
//  * @description Adds a class to the spinner element to start the animation.
//  */
// const startSpinner = () => {
//   // add class to the spinner element to start animation
// };

// /**
//  * @name stopSpinner
//  * @description Removes a class from the spinner element to stop the animation.
//  */
// const stopSpinner = () => {
//   // remove class to the spinner element to stop animation
// };

// /**
//  * @name postData
//  * @description Handles the POST request to the "/api/prenotazione" endpoint.
//  * Sends a POST request to the "/api/prenotazione" endpoint.
//  * Starts a spinner animation before making the request and stops it
//  * upon receiving a response. This function converts the response to JSON.
//  * Error handling is not yet implemented.
//  */
// const postData = async () => {
//   startSpinner();
//   try {
//     const response = await fetch("/api/prenotazione", {
//       method: "POST",
//       body: JSON.stringify(""), // aggiungere l'oggetto che bisogna mandare
//     });

//     const data = await response.json();

//     if (!data) {
//       throw new Error(data); // add error handling
//     }

//     stopSpinner();
//     // add success handling
//     // ex. show a success message
//     console.log(data);
//   } catch (error) {
//     // add error handling
//     console.error(error);
//   }
// };

// postData();

// Interazione con l'api per la richiesta di prenotazione

const form = document.querySelector<HTMLFormElement>('.appointment-form');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const endpoint = ''; // Inserire l'endpoint corretto

  const response = await fetch(endpoint , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const json = await response.json();
    console.log(json);
  } else {
    console.error('Errore nella richiesta di prenotazione');
  }
});


// Gestione cambio pagine del form
let currentPage = 0;
const btnNext = document.querySelectorAll('.btn-next');
const btnPrev = document.querySelectorAll('.btn-prev');
const section1 = document.querySelector('#page1');
const section2 = document.querySelector('#page2');
const section3 = document.querySelector('#page3');
const icon1 = document.querySelector('#icon1');
const icon2 = document.querySelector('#icon2');
const icon3 = document.querySelector('#icon3');
const i1 = document.querySelector('#i1');
const i2 = document.querySelector('#i2');
const title = document.querySelector('.form-title');

btnNext.forEach((btn) => {
  btn.addEventListener('click', () => {
    if(currentPage === 0){

      if(title !== null){
        title.textContent = 'Dati Organizzazione';
      }
      section1?.classList.remove('active');
      section2?.classList.add('active');
      icon1?.classList.replace('active', 'done');
      icon2?.classList.add('active');
      i1?.classList.replace('bxs-user', 'bx-check');
      currentPage++;
    }
    else if(currentPage === 1){

      if(title !== null){
        title.textContent = 'Dati Prenotazione';
      }
      section2?.classList.remove('active');
      section3?.classList.add('active');
      icon2?.classList.replace('active', 'done');
      icon3?.classList.add('active');
      i2?.classList.replace('bxs-group', 'bx-check');
      currentPage++;
    }
  });
});

btnPrev.forEach((btn) => {
  btn.addEventListener('click', () => {
    if(currentPage === 2){

      if(title !== null){
        title.textContent = 'Dati Organizzazione';
      }
      section3?.classList.remove('active');
      section2?.classList.add('active');
      icon3?.classList.remove('active');
      icon2?.classList.replace('done', 'active');
      i2?.classList.replace('bx-check', 'bxs-group');
      currentPage--;
    }
    else if(currentPage === 1){
      
      if(title !== null){
        title.textContent = 'Dati Accompagnatore';
      }
      section2?.classList.remove('active');
      section1?.classList.add('active');
      icon2?.classList.remove('active');
      icon1?.classList.replace('done', 'active');
      i1?.classList.replace('bx-check', 'bxs-user');
      currentPage--;
    }
  });
});



// Fine Gestione cambio pagine del form


