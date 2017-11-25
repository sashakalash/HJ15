const prevBtn = document.querySelector('[data-action="prev"]');
const nextBtn = document.querySelector('[data-action="next"]');
const firstBtn = document.querySelector('[data-action="first"]');
const lastBtn = document.querySelector('[data-action="last"]');
const slides = document.querySelector('.slides');

var currentSlide = slides.firstElementChild;
currentSlide.classList.add('slide-current');

prevBtn.addEventListener('click', event => moveSlider('prev'));
nextBtn.addEventListener('click', event => moveSlider('next'));

firstBtn.addEventListener('click', event => moveSlider('first'));
lastBtn.addEventListener('click', event => moveSlider('last'));

function getActiveSlide(way) {
    switch(way) {
        case 'prev': 
            return currentSlide.previousElementSibling;
        case 'next':
            return currentSlide.nextElementSibling;
        case 'first':
            return slides.firstElementChild; 
        case 'last':
            return slides.lastElementChild;    
    }
}

function moveSlider(way) {
    const activatedSlide = getActiveSlide(way);
    currentSlide.classList.remove('slide-current');
    activatedSlide.classList.add('slide-current');
    nextBtn.classList.toggle('disabled', !activatedSlide.nextElementSibling);
    lastBtn.classList.toggle('disabled', !activatedSlide.nextElementSibling);
    prevBtn.classList.toggle('disabled', !activatedSlide.previousElementSibling);
    firstBtn.classList.toggle('disabled', !activatedSlide.previousElementSibling);
    currentSlide = activatedSlide;
}


