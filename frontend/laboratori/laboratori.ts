import "./laboratori.css";

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper button");
const firstCardWidth = carousel
  ?.querySelector(".card")
  ?.getBoundingClientRect().width;
const carouselChildrens = carousel ? [...carousel.children] : [];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

const cardsPerView = Math.round(
  (carousel?.getBoundingClientRect().width ?? 0) / (firstCardWidth ?? 1)
);

// insert copie of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardsPerView)
  .reverse()
  .forEach((card) => {
    carousel?.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardsPerView).forEach((card) => {
  carousel?.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (carousel && firstCardWidth !== undefined) {
      carousel.scrollLeft +=
        btn.id === "left" ? -firstCardWidth : firstCardWidth;
    }
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel?.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel?.scrollLeft;
};

const dragging = (e: MouseEvent) => {
  if (!isDragging || !carousel) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  carousel?.classList.remove("dragging");
};

const autoPlay = () => {
  if (window.innerWidth < 800) return;

  timeoutId = setTimeout(() => {
    if (carousel && firstCardWidth !== undefined) {
      carousel.scrollLeft += firstCardWidth;
    }
  }, 2500);
};
autoPlay();

const infiniteScroll = () => {
  if (carousel && carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft =
      carousel.scrollWidth - 2 * (carousel as HTMLElement).offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    carousel &&
    Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - (carousel as HTMLElement).offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = (carousel as HTMLElement).offsetWidth;
    carousel.classList.remove("no-transition");
  }
  clearTimeout(timeoutId);
  if (!wrapper?.matches(":hover")) autoPlay();
};

carousel?.addEventListener("mousedown", dragStart);
carousel?.addEventListener("mousemove", (e: Event) =>
  dragging(e as MouseEvent)
);
document.addEventListener("mouseup", dragStop);
carousel?.addEventListener("scroll", infiniteScroll);
wrapper?.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper?.addEventListener("mouseleave", autoPlay);

////////////////////////////////////
// MODAL

const showModalBtn = document.querySelectorAll(".showModalBtn");
const body = document.body;

const content = [
  {
    id: 1,
    title: "Storia della Cascina",
    image: "/img/carosello-laboratori/storia-della-cascina.jpg",
    description:
      "Scopri la storia di Cascina Caccia: dal tragico omicidio del magistrato Bruno Caccia alla confisca dei beni mafiosi. Esplora il percorso di riqualificazione sociale, la giustizia contro Domenico Belfiore e l'impegno per la legalità in questo significativo esempio di bene confiscato.",
  },
  {
    id: 2,
    title: "Bruno Caccia",
    image: "/img/carosello-laboratori/bruno-caccia.gif",
    description:
      "Esplora la vita e il lavoro del magistrato Bruno Caccia attraverso un coinvolgente documentario e testimonianze dirette. Scopri la sua importante figura nella lotta alla criminalità organizzata, il contesto storico del suo omicidio e gli sviluppi giudiziari più recenti che hanno segnato la storia della giustizia italiana.",
  },
  {
    id: 3,
    title: "RegoLegalità",
    image: "/img/carosello-laboratori/regolegalità.jpg",
    description:
      "Partecipa al nostro innovativo percorso educativo dedicato ai bambini, incentrato sul valore fondamentale delle regole nella convivenza civile. Scopri come bilanciare libertà personale e rispetto delle norme, promuovendo attivamente la cultura della legalità attraverso attività interattive ed educative.",
  },
  {
    id: 4,
    title: "Beni confiscati",
    image: "/img/carosello-laboratori/beni-confiscati.jpg",
    description:
      "Immergiti nella storia e nell'evoluzione della legislazione sui beni confiscati alle mafie. Esplora il profondo significato sociale di questi luoghi attraverso mappature interattive, con particolare attenzione alla straordinaria esperienza di Cascina Caccia e al suo importante ruolo nel riutilizzo sociale dei beni confiscati.",
  },
  {
    id: 5,
    title: "Le Mafie & il Cibo",
    image: "/img/carosello-laboratori/Agromafie.jpg",
    description:
      "Scopri l'impatto delle agromafie e del caporalato nel settore alimentare italiano. Comprendi il ruolo cruciale del consumatore consapevole nella lotta alle infiltrazioni mafiose e lasciati ispirare da storie di riscatto come quella di Cascina Caccia, esempio concreto di cambiamento positivo.",
  },
  {
    id: 6,
    title: "Miele & Api",
    image: "/img/carosello-laboratori/miele-api.jpg",
    description:
      "Scopri il meraviglioso mondo dell'apicoltura in un laboratorio unico che unisce natura, etica e imprenditorialità sostenibile. Esplora i parallelismi tra la società delle api e quella umana, riflettendo sull'importanza dell'etica del lavoro e delle opportunità di sviluppo sociale responsabile.",
  },
  {
    id: 7,
    title: "Ricicliamo",
    image: "/img/carosello-laboratori/ricicliamo.jpg",
    description:
      "Partecipa alle nostre stimolanti attività artistiche di riuso creativo, pensate per giovani creativi. Sviluppa la tua creatività mentre impari l'importanza della sostenibilità ambientale, collaborando in gruppo attraverso coinvolgenti laboratori manuali e progetti di manutenzione degli spazi comuni.",
  },
  {
    id: 8,
    title: "La Mafia attraverso il cinema",
    image: "/img/carosello-laboratori/mafia-cinema.jpg",
    description:
      "Esplora l'evoluzione della rappresentazione delle mafie nel cinema italiano e internazionale. Un viaggio critico e approfondito che confronta la narrazione cinematografica con la realtà storica e sociale, per sviluppare una comprensione più consapevole e critica del fenomeno mafioso.",
  },
  {
    id: 9,
    title: "Il gioco non è un azzardo",
    image: "/img/carosello-laboratori/azzardo.jpg",
    description:
      "Partecipa al nostro laboratorio educativo dedicato ai più piccoli, dove imparerai a riconoscere la differenza tra giochi costruttivi e dannosi. Un percorso coinvolgente che promuove il divertimento sano e sviluppa la consapevolezza critica fin dalla giovane età.",
  },
  {
    id: 10,
    title: "Chi non gioca vince",
    image: "/img/carosello-laboratori/gioco.jpg",
    description:
      "Unisciti al nostro percorso formativo specificamente progettato per adolescenti sui pericoli del gioco d'azzardo. Esplora le dinamiche delle dipendenze e sviluppa una consapevolezza critica sui comportamenti a rischio, attraverso attività interattive e discussioni guidate.",
  },
];

const modalFactory = function (event) {
  const numberBtn = event.currentTarget.dataset.content;

  const singleContent = content[numberBtn - 1];
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay"); // Add modal class
  modal.classList.add("show-modal"); // Add modal class

  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <img src="${singleContent?.image}" alt="Modal Image">
            </div>
            <div class="modal-body">
                <div class="modal-info">
                    <h4>${singleContent?.title}</h4>
                    <p>${singleContent?.description}</p>
                </div>
                <div class="modal-actions">
                    <button class="btn-modal btn-close">Chiudi</button>
                    <a href="/richiedi-prenotazione/" class="btn-modal btn-primary">Richiedi Prenotazione</a>
                </div>
            </div>
        </div>     
  `;

  body.appendChild(modal);
  body.classList.add("modal-open");

  // Listen for clicks on the modal background to remove it
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.remove(); // Removes modal when clicking on the background
      body.classList.remove("modal-open");
    }
  });

  const modalClose = modal.querySelector(".btn-close");
  modalClose?.addEventListener(
    "click",
    function () {
      modal.remove();
      body.classList.remove("modal-open");
    },
    { once: true }
  );
};

// Add event listener to all modal buttons
showModalBtn.forEach((btn) => {
  btn.addEventListener("click", modalFactory);
});
