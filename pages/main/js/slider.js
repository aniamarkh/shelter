
import { pets } from './pets.js';

const SLIDER = document.querySelector('.friends-cards');

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

    SLIDER.insertAdjacentHTML(where, cardTemplate);
}

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < 3; i++) {
        createCard("beforeend");
    }
})

const BTN_LEFT = document.querySelector('.friends-back');
const BTN_RIGHT = document.querySelector('.friends-forward');

let left = SLIDER.style.left;
let width = window.innerWidth;

BTN_RIGHT.addEventListener('click', () => {
    SLIDER.style.transition = '1s all ease-in-out';

    if (cardsArr.length > 3) {
        cardsArr.splice(0, 3);
    }

    if (width >= 1280) {
        for (let i = 0; i < 3; i++) {
            createCard("beforeend");
        }
        left = left - 1080;
    } else if (width < 1280 && width >= 768) {
        for (let i = 0; i < 2; i++) {
            createCard("beforeend");
        }
        left = left - 620;
    } else if (width < 768) {
        createCard("beforeend");
        left = left - 270;
    }
    SLIDER.style.left = `${left}px`;
}
);

BTN_LEFT.addEventListener('click', () => {

    if (width < 768) {
        left = left + 270;
        SLIDER.style.left = `${left}px`;
    }
    else if (768 <= width && width < 1280) {
        left = left + 620;
        SLIDER.style.left = `${left}px`;
    }
    else {
        left = left + 1080;
        SLIDER.style.left = `${left}px`;
    }

    if (left > 0) {

        left = 0;
        SLIDER.style.transition = '0.001ms all ease-in-out';

        if (cardsArr.length > 3) {
            cardsArr.splice(0, 3);
        }

        if (width < 768) {
            for (let i = 0; i < 1; i++) {
                createCard("afterbegin");
            }
            left = left - 270;
            SLIDER.style.left = `${left}px`;
        } else if (768 <= width && width < 1279) {
            for (let i = 0; i < 2; i++) {
                createCard("afterbegin");
            }
            left = left - 620;
            SLIDER.style.left = `${left}px`;
        } else {
            for (let i = 0; i < 3; i++) {
                createCard("afterbegin");
            }
            left = left - 1080;
            SLIDER.style.left = `${left}px`;
        }

        setTimeout(() => {
            SLIDER.style.transition = '1s all ease-in-out';
            left = 0;
            SLIDER.style.left = `${left}px`;
        }, 1);
    }
});

