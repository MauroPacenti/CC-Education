import "./global.css";
import "./preflight.css";

// Typescript per la gestione del menu di navigazione

const ul = document.querySelector("ul");
const menu = document.querySelector(".menu-container");
const menuClick = document.querySelector(".menu-icon");
const icon = document.querySelector("#icon-menu");
const closeIcon = document.querySelector("#icon-close");
const logo = document.querySelector(".logo-container");
const form = document.querySelector(".form-container");

menuClick?.addEventListener("click", toggleMenu);

function toggleMenu() {
  form?.classList.add("hide");
  menu?.classList.add("active");
  logo?.classList.add("hide");
  closeIcon?.classList.remove("hide");
  icon?.classList.add("hide");

  if (ul?.classList.contains("not-display")) {
    form?.classList.remove("hide");
    ul.classList.remove("not-display");
    menu?.classList.remove("active");
    logo?.classList.remove("hide");
    closeIcon?.classList.add("hide");
    icon?.classList.remove("hide");
  } else {
    ul?.classList.add("not-display");
  }
}
