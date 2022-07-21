// PAGINATION

import { pets } from "./pets.js";

const SLIDER = document.querySelector('.friends-cards');
let width = window.innerWidth;

// CREATING CARDS

let cardsArr = [];

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createCard() {
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

    SLIDER.innerHTML += cardTemplate;
}

let array = [];
let randomArray;
let finalArray = [];

for (let i = 1; i <= 8; i++) {
    array.push(i);
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (width > 1279) {
        for (let i = 0; i < 6; i++) {
            for (let i = 0; i < 8; i++) {
                createCard();
            }
            cardsArr = [];
        }
    } else if (768 <= width && width < 1280) {
        for (let i = 0; i < 8; i++) {
            if (cardsArr.length = 8) {
                cardsArr.splice(0, 6);
            }
            for (let i = 0; i < 6; i++) {
                createCard();
            }
        }
    } else if (width < 768) {
        for (let i = 0; i < 16; i++) {

            if (cardsArr.length = 8) {
                cardsArr.splice(0, 3);
            }
            for (let i = 0; i < 3; i++) {
                createCard();
            }
        }
    }

})

const BTN_FIRST = document.querySelector('.first');
const BTN_PREV = document.querySelector('.previous');
const BTN_ACTIVE = document.querySelector('.active');
const BTN_NEXT = document.querySelector('.next');
const BTN_LAST = document.querySelector('.last');
let page = 1;
BTN_ACTIVE.innerHTML = page;
let left = SLIDER.style.left;

// BLOCKING BUTTONS

function blockLastPage() {
    BTN_NEXT.classList.add('off');
    BTN_LAST.classList.add('off');
    BTN_NEXT.removeEventListener('click', getNextPage);
    BTN_LAST.removeEventListener('click', getLastPage);


}

function blockFirstPage() {
    BTN_FIRST.classList.add('off');
    BTN_PREV.classList.add('off');
    BTN_PREV.removeEventListener('click', getPrevPage);
    BTN_FIRST.removeEventListener('click', getFirstPage);
}

if (BTN_ACTIVE.innerHTML = "1") {
    blockFirstPage();
}

// UNLOCKING PAGES

function unlockFirstPage() {
    BTN_FIRST.classList.remove('off');
    BTN_PREV.classList.remove('off');
    BTN_PREV.addEventListener('click', getPrevPage);
    BTN_FIRST.addEventListener('click', getFirstPage);
}

function unlockLastPage() {
    BTN_NEXT.classList.remove('off');
    BTN_LAST.classList.remove('off');
    BTN_NEXT.addEventListener('click', getNextPage);
    BTN_LAST.addEventListener('click', getLastPage);
}

// NEXT PAGE FUNCTION

BTN_NEXT.addEventListener('click', getNextPage);

function getNextPage() {
    unlockFirstPage();

    SLIDER.style.transition = '1s all ease-in-out';

    if (width >= 1280) {
        left = left - 1240;
        if (page == 5) {
            blockLastPage();
        }
    }

    if (768 <= width && width < 1280) {
        left = left - 620;
        if (page == 7) {
            blockLastPage();
        }
    }

    if (width < 768) {
        left = left - 300;
        if (page == 15) {
            blockLastPage();
        }
    }

    SLIDER.style.left = `${left}px`;
    BTN_ACTIVE.innerHTML = page + 1;
    page = page + 1;
}

// PREVIOUS PAGE FUNCTION

BTN_PREV.addEventListener('click', getPrevPage);

function getPrevPage() {
    if (page != 1) {
        SLIDER.style.transition = '1s all ease-in-out';

        if (width >= 1280) {
            left = left + 1240;
        } else if (768 <= width && width < 1280) {
            left = left + 620;
        } else if (width < 768) {
            left = left + 300;
        }

        SLIDER.style.left = `${left}px`;
        BTN_ACTIVE.innerHTML = page - 1;
        page = page - 1;
    }
    if (width >= 1280) {
        if (page != 6) {
            unlockLastPage();
        }
    } else if (768 <= width && width < 1280) {
        if (page != 8) {
            unlockLastPage();
        }
    } else if (width < 768) {
        if (page != 16) {
            unlockLastPage();
        }
    }

    if (page == 1) {
        blockFirstPage();
    }
}

BTN_NEXT.addEventListener('click', getNextPage);
BTN_LAST.addEventListener('click', getLastPage);

// FIRST PAGE FUNCTION

function getFirstPage() {
    unlockLastPage();
    if (page != 1) {
        SLIDER.style.transition = '1s all ease-in-out';
        SLIDER.style.left = `0px`;
        BTN_ACTIVE.innerHTML = 1;
        left = 0;
        page = 1;
        blockFirstPage();
    }
}

// LAST PAGE FUNCTION 

function getLastPage() {
    unlockFirstPage();
    SLIDER.style.transition = '1s all ease-in-out';

    if (width < 768) {
        SLIDER.style.left = `-4500px`;
        BTN_ACTIVE.innerHTML = 16;
        left = -4500;
        page = 16;
    }

    if (768 <= width && width < 1280) {
        SLIDER.style.left = `-4340px`;
        BTN_ACTIVE.innerHTML = 8;
        left = -4340;
        page = 8;
    }

    if (width >= 1280) {
        SLIDER.style.left = `-6200px`;
        BTN_ACTIVE.innerHTML = 6;
        left = -6200;
        page = 6;
    }

    blockLastPage();

}