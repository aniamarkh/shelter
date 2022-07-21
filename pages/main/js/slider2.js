import { pets } from './pets.js';

const SLIDER = document.querySelector('.friends-cards');
const ACTIVE = document.querySelector('.active-item');
const LEFT = document.querySelector('.left');
const RIGHT = document.querySelector('.right');
let width = window.innerWidth;


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let cardsArr = [];

function createCard(where) {
    let index = getRandomInteger(0, pets.length - 1);

    while (cardsArr.includes(index)) {
        index = getRandomInteger(0, pets.length - 1);
    }

    cardsArr.push(index);

    let cardTemplate = `<div class="friends-cards--pet" onclick="openModal(${index})">
<img src="${pets[index].img}" alt="${pets[index].type} ${pets[index].name}">
<p>${pets[index].name}</p>
<button>Learn more</button>
</div>`;

    where.innerHTML += cardTemplate;
}

document.addEventListener("DOMContentLoaded", () => {
    if (width > 1279) {
        for (let i = 0; i < 3; i++) {
            createCard(ACTIVE);
        }
        for (let i = 0; i < 3; i++) {
            createCard(LEFT);
        }
        cardsArr.splice(3, 3);
    } else if (width < 1280 && width >= 768) {
        for (let i = 0; i < 2; i++) {
            createCard(ACTIVE);
        }
        for (let i = 0; i < 2; i++) {
            createCard(LEFT);
        }
        cardsArr.splice(2, 2);
    } else if (width < 768) {
        createCard(ACTIVE);
        createCard(LEFT);
        cardsArr.pop();
    }
})

const BTN_LEFT = document.querySelector('.friends-back');
const BTN_RIGHT = document.querySelector('.friends-forward');

const moveLeft = () => {
    LEFT.innerHTML = '';
    if (width > 1279) {
        for (let i = 0; i < 3; i++) {
            createCard(LEFT);
        }
        cardsArr.splice(0, 3);
    } else if (width < 1280 && width >= 768) {
        for (let i = 0; i < 2; i++) {
            createCard(LEFT);
        }
        cardsArr.splice(0, 2);
    } else if (width < 768) {
        for (let i = 0; i < 1; i++) {
            createCard(LEFT);
        }
        cardsArr.shift();

    }


    SLIDER.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    RIGHT.innerHTML = '';
    if (width > 1279) {
        for (let i = 0; i < 3; i++) {
            createCard(RIGHT);
        }
        cardsArr.splice(0, 3);
    } else if (width < 1280 && width >= 768) {
        for (let i = 0; i < 2; i++) {
            createCard(RIGHT);
        }
        cardsArr.splice(0, 2);
    } else if (width < 768) {
        for (let i = 0; i < 1; i++) {
            createCard(RIGHT);
        }
        cardsArr.shift();
    }


    SLIDER.classList.add("transition-right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);

SLIDER.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "move-left") {
        SLIDER.classList.remove("transition-left");
        ACTIVE.innerHTML = LEFT.innerHTML;
    } else {
        SLIDER.classList.remove("transition-right");
        ACTIVE.innerHTML = RIGHT.innerHTML;
    }

    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
})
