const hamburger = document.querySelector('.hamburger');
const logo = document.querySelector('.header-logo');
const shadow = document.querySelector('.shadow')

function openMenu() {
    hamburger.addEventListener('click', closeMenu)
    hamburger.classList.add('is-active');
    document.getElementById('menu').classList.add('open');
    logo.classList.add('header-logo--menu');
    shadow.classList.add('shadow-active');
    document.body.style.position = 'fixed';
}

hamburger.addEventListener('click', openMenu);

function closeMenu() {
    document.getElementById('menu').classList.remove('open');
    document.getElementById('hamburger').classList.remove('is-active');
    logo.classList.remove('header-logo--menu');
    document.body.style.position = 'absolute';
    shadow.classList.remove('shadow-active');
    hamburger.removeEventListener('click', closeMenu);

}

const Links = document.querySelectorAll('.link');

Links.forEach((el) => el.addEventListener('click', closeMenu));

shadow.addEventListener('click', closeMenu);
