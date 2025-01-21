const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let images = [
    'img/carosello-home/home-carosello1.jpeg',
    'img/carosello-home/home-carosello2.jpg',
    'img/carosello-home/home-carosello4.jpeg',
    'img/carosello-home/home-carosello5.jpeg',
    'img/carosello-home/home-carosello6.jpeg',
    'img/carosello-home/home-carosello7.jpeg',
    'img/carosello-home/home-carosello9.jpeg',
    'img/carosello-home/home-carosello10.jpeg',
];

//assegna le immagini di sfondo agli elementi del carosello
items.forEach((item, index) => {
    if (index < images.length) {
        item.style.backgroundImage = `url('${images[index]}')`;
        item.style.backgroundSize = 'cover';
        item.style.backgroundPosition = 'center';
    }
});

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let isDragging = false;

/**
 * Updates the carousel position based on the current index.
 * 
 * Calculates the horizontal offset based on the current index
 * 
 * Uses CSS transform to move the carousel
 * 
 * Moves the carousel by 100% of the width for each slide change
 * @returns {void}
 */
function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

//vai all'elemento precedente
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
    updateCarousel();
});

//vai all'elemento successivo
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});

/**
 * Manages the automatic scrolling of the carousel.
 * 
 * Increments the current index
 * Resets the index to 0 if it reaches the end of the images
 * Updates the carousel position
 * 
 * Called every 4 seconds via setInterval
 * Continuous and cyclic scrolling of the images
 * 
 * @returns {void}
 */
function autoSlide() {
    currentIndex++;
    
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`; //aggiorna la posizione del carosello
  }
  
setInterval(autoSlide, 4000);

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('touchstart', startDrag);
carousel.addEventListener('mousemove', drag);
carousel.addEventListener('touchmove', drag);
carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('touchend', endDrag);
carousel.addEventListener('mouseleave', endDrag);

/**
 * Starts the carousel drag interaction.
 *
 * Set drag state to true
 * Record initial touch/mouse position
 * Temporarily disable transition for smooth motion
 * @param {Event} e - Drag start event (mousedown/touchstart)
 * @returns {void}
 */
function startDrag(e) {
    isDragging = true;
    startX = getPositionX(e);
    carousel.style.transition = 'none'; //disabilita transizione durante il trascinamento
}

/**
 * Handles movement when dragging the carousel.
 * 
 * Calculates finger/mouse movement
 * Updates the current translation position
 * Visually moves the carousel based on movement
 * @param {Event} e - Movement event (mousemove/touchmove)
 * @returns {void}
 */
function drag(e) {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    const deltaX = currentX - startX;
    currentTranslate = previousTranslate + deltaX;

    carousel.style.transform = `translateX(${currentTranslate}px)`; //sposta il carosello in base al trascinamento
}

/**
 * Ends the carousel drag interaction.
 *  
 * Calculates dragged distance
 * Change slide if movement exceeds a specific threshold
 * Resets carousel position
 * Re-enables CSS transition
 *
 * @returns {void}
 */
function endDrag() {
    if (!isDragging) return; // se non è in corso un trascinamento la funzione termina
    isDragging = false;
    const movedBy = currentTranslate - previousTranslate; //differenza tra la posizione finale e quella iniziale

    //se si trascina oltre una soglia, cambia immagine
    if (movedBy < -50 && currentIndex < items.length - 1) { //se l'utente ha trascinato di almeno 50px a sinistra e se l'immagine non è l'ultima
        currentIndex++;
    } 
    if (movedBy > 50 && currentIndex > 0) { //se l'utente ha trascinato di 50px a destra
        currentIndex--;
    }

    updateCarousel();

    previousTranslate = -currentIndex * carousel.offsetWidth; 
    carousel.style.transition = 'transform 0.5s ease-in-out'; //riabilita la transizione
}

/**
 * Returns the horizontal position (X) of the event, whether it is a mouse click 
 * or a tap on touch devices.
 * @param {Event} e - The event (can be a mouse or touch event)
 * @returns {number} - The X position of the event
 */
function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX; //controlla se il tipo di evento contiene la parola 'mouse', in caso usa la posizione orizzontale, se è un evento touch, usa la posizione del tocco
}
