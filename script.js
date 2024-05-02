'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// LET'S ADD A SMOOTH SCROLLING :

// SELECTING LEARN MORE BUTTON
const btnScrollTo = document.querySelector('.btn--scroll-to');
// SELECTING THE NEXT AND FIRST SECTION DIV
const section1 = document.querySelector('#section--1');

// ADDING EVENT LISTENER TO BUTTON
btnScrollTo.addEventListener('click', function (e) {
  // THE GETBOUNDINGREC METHOD , SHOWS THE OBJECT OF SCROLLING COORDS , IN WHICH X , Y COORDINATES ARE DEFINE , ALSO THE WIDTH AND HEIGHT INCLUDING THE TOP , BOTTOM , LEFT AND RIGHT AS WELL.
  // IT ALSO HAS THIER METHODS AS WELL.
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // IT SHOWS THE SCROLLING VALUE , WHENWE SCROLL, BUT THEY ARE DEPRECATED.
  console.log('Current scroll X/Y', window.pageXOffset, pageYOffset);

  // IT MEASURES THE WIDTH AND HIEGHT OF VEIWPORT , IT JUST SHOWS THE WIDTH AND HEIGHT OF THE VIEWPORT
  console.log(
    'heigth/width veiwport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // SCROLLING:
  // THE OLD WAY OF DEFINING SCROLLING EFFECT
  // SCROLLTO IS A GLOBAL OBJECT
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // BUT THERE A SIMPLE AND EASY WAY TO DEFINE SCROLLING EFFECT
  // THE SCROLLINTOVIEW IS FUNCTION IN WHICH WE PASS AN OBJECT
  section1.scrollIntoView({ behavior: 'smooth' });
});

// EVENT LISTENERS:
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert(`addEventListener: Great! You are reading the heading :D `);

  // IT WILL REMOVE THE EVENT LISTENER AFTER EXECUTING ONCE
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// WE ALSO HAVE AN OLD WAY OF HANDLING EVENTS:
// h1.onmouseenter = alertH1;

// WE ALSO HAVE ANOTHER WAY OF HANDLING EVENT , WHICH IS IN THE HTML , SUCH AS ONCLICK , BUT IT SHOULD NOT BE USED , BECUASE IT IS A VERY OLD WAY OF HANDLING EVENTS
