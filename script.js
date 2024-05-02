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
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
// alert(`addEventListener: Great! You are reading the heading :D `);

// IT WILL REMOVE THE EVENT LISTENER AFTER EXECUTING ONCE
// h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// WE ALSO HAVE AN OLD WAY OF HANDLING EVENTS:
// h1.onmouseenter = alertH1;

// WE ALSO HAVE ANOTHER WAY OF HANDLING EVENT , WHICH IS IN THE HTML , SUCH AS ONCLICK , BUT IT SHOULD NOT BE USED , BECUASE IT IS A VERY OLD WAY OF HANDLING EVENTS

// EVENT PROPAGATION IN PRACTICE:

// CREATED A RANDOM INT'S GENERATOR FUNCTION
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// FUNCTION FOR RANDOM COLOR:
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// ADDED EVENT LISTENER TO THE NAV LINK (CHILD OF THE NAV AND NAV-LINKS DIVS)
document.querySelector('.nav__link').addEventListener('click', function (e) {
  // WE SAID THAT , THE this IN EVENTLISTENER IS POINTING THE DOCUMENT ELEMENT ITSELF THAT IS CALLING THE EVENT
  this.style.backgroundColor = randomColor();
  // IT TARGETS THE ACUALL ELEMENT ON WHICH THE EVENT IS TARGETTED TOWARDS. THE OTHER ARE PARENTS SO THEY WILL ASLO BE TARGETTED BY THIS ONE EVENT , BECAUSE WE SAID THAT BEFORE OF BUBBLING
  console.log('LINK ', e.target);

  // IT TARGETS THE CURRENT ELEMENT , IT IS LIKE AS THIS KEYWORD , WHICH TARGETS THE ELEMENT IN WHICH IT IS CALLED.
  console.log(e.currentTarget);

  // WE CAN ALSO STOP PROPAGATION AT CHILD DIV.
  // IT WILL THEN ONLY TARGET THE ACTUAL CHILD DIV AND THE BUBBLING WILL STOP.
  // BUT THAT'S NOT A GOOD IDEA TO STOP PROPAGATION.
  e.stopPropagation();
});

// THE PARENT DIV OF THE NAV_LINK
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER ', e.target);

  console.log(e.currentTarget);
});

// THE PARENT DIV OF THE NAV_LINKS
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV ', e.target);

    console.log(e.currentTarget);
  }
  // true
  // THIS TRUE HERE MEANS THAT , WE CAN KNOW ALSO HANDLE THE EVENT IN CAPTURE PHASE , AND IT WILL START FROM THE CAPTURE PHASE AS WELL(FROM THE ROOT OF THE DOCUMENT TO THE TARGET ELEMENT).
  // BUT CAPTURE PHASE HANDLING IS NOT ANYMORE USED NOW A DAYS.
  // AND THE REASON IS WHY THESE TWO PHASES STILL EXIST(CAPTURING & BUBBLING) IS SOME OF SOME HISTORICAL REASON , WHEN EVERY BROWSER USE DIFFERENT VERSION OF JAVASCRIPT.
);
// WHEN THE USER CLICKS ON A CHILD DIV , THE COLOR OF THIER PARENT DIVS ALSO CHANGES , BUT WHEN THE USER CLICKS ON ONE THE PARENT DIVS , IT WILL CHANGED ITSELF.
// THIS IS THE REAL EXAMPLE OF HOW BUUBLING IN EVENT PROPAGATION WORKS, BECAUSE  BUBBLING IS THE CONCEPT IN WHICH THE TARGET EVENT(CHILD DIV EVENT) MAY HAVE THE EVENT OF THIER PARENT DIV AS WELL, MEANS THE EVENT ON CHILD DIV IS ALSO THE EVENT OF THIER PARENT DIV , AND IT WORKS IN THE LINEAR WAY.
