document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('carouselWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const container = document.querySelector('.carousel-container');

    let isDragging = false;
    let startX = 0; //posizione iniziale del tocco
    let currentTranslateX = 0; //posizione corrente
    let previousTranslateX = 0; //posizione prima del trascinamento

    /**
     * Sets the horizontal transformation of the carousel wrapper.
     * Moves carousel elements horizontally using the CSS transform property.
     * Allows smooth sliding of carousel items by changing their horizontal position.
     * @param {*} translateX - Horizontal translation value in pixels
     */
    function setTranslateX(translateX) {
        wrapper.style.transform = `translateX(${translateX}px)`; //permette di spostare gli elementi orizzontalmente
    }

    // GESTIONE EVENTI TOUCH
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX; //posizione iniziale del tocco: touches[0] rappresenta il primo punto di contatto e 
                                        // clientX restituisce la posizione orizzontale del tocco rispetto al bordo sinistro della finestra
        previousTranslateX = currentTranslateX; //memorizza la traduzione corrente
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const currentX = e.touches[0].clientX; //posizione corrente del tocco
        const diffX = currentX - startX; //calcola lo spostamento

        currentTranslateX = previousTranslateX + diffX; //aggiorna la traduzione
        setTranslateX(currentTranslateX);
    });

    container.addEventListener('touchend', () => {
        isDragging = false;

        applyBounds(); //per assicurarsi che il movimento rimanga entro i limiti
    });

    /**
     * Applies movement constraints to the carousel to prevent it from moving beyond the edges.
     * If the movement goes beyond the left edge (0), resets the position to 0
     * If the movement goes beyond the right edge, locks it to the maximum allowed width
     */
    function applyBounds() {
        const containerWidth = container.offsetWidth; //larghezza del contenitore visibile
        const wrapperWidth = wrapper.scrollWidth; //larghezza del contenitore

        if (currentTranslateX > 0) { //se supera il limite a sinistra viene riportata a 0
            currentTranslateX = 0; 
        } else if (currentTranslateX < containerWidth - wrapperWidth) {
            currentTranslateX = containerWidth - wrapperWidth;
        }

        setTranslateX(currentTranslateX);
    }

    // PULSANTI AVANTI E INDIETRO
    const itemWidth = 320; //larghezza elemento + margine
    let itemsToScroll = 3; //numero di elementi da scorrere a clic
    let currentPosition = 0; //indice degli elementi
    const totalItems = wrapper.children.length; //numero tot di elementi nel carosello
    const maxPosition = totalItems - itemsToScroll; //massima posizione raggiungibile

    /**
     * Dynamically updates the number of items to scroll based on the width of the screen.
     */
    function updateItemsToScroll() {
        itemsToScroll = window.innerWidth <= 1024 ? 1 : 3; //scorre 1 elemento alla volta per schermi più piccoli di 1024
    }

    updateItemsToScroll();
    window.addEventListener('resize', updateItemsToScroll); //ricalcola il numero di elementi da scorrere quando la finestra viene ridimensionata

    nextBtn.addEventListener('click', () => {
        if (currentPosition < maxPosition) {
            currentPosition += itemsToScroll; //incremeneta la posizione attuale di elementi da scorrere
            currentPosition = Math.min(currentPosition, maxPosition); //ci si assicura che la posizione attuale non superi la massima
        } else {
            currentPosition = 0; //se è alla fine torna all'inizio
        }
        currentTranslateX = -currentPosition * itemWidth; //sposta gli elementi verso sinistra
        setTranslateX(currentTranslateX); //aggiorna la posizione
    });

    prevBtn.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition -= itemsToScroll; //descrementa la posizione attuale di elementi
            currentPosition = Math.max(currentPosition, 0); //per assicurarsi che la posizione attuale non scenda sotto lo 0
        } else {
            currentPosition = maxPosition; //se è all'inizio torna alla fine
        }
        currentTranslateX = -currentPosition * itemWidth;
        setTranslateX(currentTranslateX);
    });
});
