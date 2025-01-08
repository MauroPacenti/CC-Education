// Typescript per la gestione del menu di navigazione

const ul = document.querySelector('ul');
const menu = document.querySelector('.menu-container');
const click = document.querySelector('.menu-icon');
const icon = document.querySelector('.menu-icon i');
const logo = document.querySelector('.logo-container');

click?.addEventListener('click', toggleMenu);

function toggleMenu() {

    menu?.classList.add('active');
    logo?.classList.add('hide');
    icon?.classList.replace('bx-menu', 'bxs-left-arrow-square');
    
    if (ul?.classList.contains('not-display')) {
        ul.classList.remove('not-display');
        menu?.classList.remove('active');
        logo?.classList.remove('hide');
        icon?.classList.replace('bxs-left-arrow-square', 'bx-menu');
    } else {
        ul?.classList.add('not-display');
    }
}