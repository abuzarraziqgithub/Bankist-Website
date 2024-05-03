'use strict';

///////////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////
// Modal window
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

///////////////////////////////////////
// DAY 2ND

// EVENT-DELEGATION: IMPLEMENTING PAGE NAVIGATION:

// APPLYING SIMPLE EVENT-LISTENER TO THE ELEMENTS:
// ATTACHING THE SAME EVENT LISTENER TO MULTIPLE ELEMENTS.
// THIS EVENT WILL WORK PERFECTLY, BUT WHAT IF, WE HAVE MUCH MORE ELEMENTS WITH A CLASS NAME , IT WILL BECOME VERY HEAVY AND WILL LOAD TOO MUCH , WE HAVE A CONCEPT HERE , WHICH IS THE EVENT-DELEGATION
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     // IT WILL GET THE HREF ATTRIBUTE OUT OF THE NAV_LINK ELEMENT, SO WE CAN USE IT FOR SCROLLING.
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. ADD EVENT LISTENER TO COMMON PARENT ELEMENT
// 2. DETERMINE WHAT ELEMENT ORIGINATED THE EVENT

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // MATCHING STRATEGY:
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/*
// DOM TRAVERSING:
// DOM TRAVERSING IS BASICALLY WALKING THROUGH THE DOM, IT MEANS WE CAN SELECT AN ELEMENT BASED ON ANOTHER ELEMENT.
// SOMETIMES, WE NEED TO SELECT ELEMENTS RELATIVE TO A CERTAIN OTHER ELEMENT SUCH AS DIRECT CHILD OR DIRECT PARENT ELEMENT

const h1 = document.querySelector('h1');
// GOING DOWNWARDS: CHILD
// THE QUERYSELECTOR WILL FIND ALL THE CHILDS EVEN THEY ARE SO FAR.
console.log(h1.querySelectorAll('.highlight'));
// THE CHILDNODES WILL RETURN A NODELIST OF ALL THE ELEMENTS INCLUDING THIER TEXT.
console.log(h1.childNodes);
//  THE CHILDREN WILL DIRECTLY TARGET EACH CHILDREN ELEMENT OF ELEMENT.
console.log(h1.children);
// THE FIRST-ELEMENT-CHILD RETURNS THE FIRST CHILD OF H1.
console.log(h1.firstElementChild);
// ADDING STYLE:
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// GOING UPWARDS : PARENTS
// THE PARENT NODE RETURNS THE PARENT OF H1.
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('h1').style.backgroundColor = 'var (--gradient-secondary)'


h1.closest('h1').style.backgroundColor = 'var (--gradient-primary)'

// SELECTING SIBLINGS:
// THE PREVIOUSELEMENT SIBLING WILL RETURN THE SIBLING BEFORE H1, IF NOT, THEN IT RETURNS NULL
console.log(h1.previousElementSibling);
// THE NEXT SIBLING WILL RETURN THE NEXT SIBLING CLOSEST TO H1.
console.log(h1.nextSibling);

// IT WILL RETURN THE COLLECTION OF ALL THE CHILDREN OF PARENT INCLUDING H1 AS WELL AND SIBLINGS OF H1
console.log(h1.parentElement.children);
// IT'S AN ITERABLE , SO WE CAN CONVERT IT ARRAY AND THEN USE ARRAY METHODS AS WELL.
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
// SO THAT'S ALL ABOUT DOM TRAVERSING.
*/

// BUILDING A TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// APPLYING EVENT DELEGATION CONCEPT:
// HOW DELEGATION CONCEPT WORK HERE ?
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // GUARD CLAUSE
  // IF NOT NULL (TRUE) RETURN TRUE.
  // WHAT THE RETURN TRUE MEAN HERE ?
  if (!clicked) return;

  // HOW THE FOREACH METHOD WORKS HERE ?
  // REMOVE THE ACTIVE CLASSES OF BOTH THE TABS AND THE TAB CONTENT
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // ACTIVE TAB
  clicked.classList.add('operations__tab--active');

  // ACTIVATE CONTENT AREA
  // WHEN THE USER CLICKS ON EACH BUTTON, IT WILL SHOW THE REVELANT TAB CONTENT.
  // HOW THE DATASET WORKS AND WHAT IS IT ?
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

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
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// // FUNCTION FOR RANDOM COLOR:
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// // ADDED EVENT LISTENER TO THE NAV LINK (CHILD OF THE NAV AND NAV-LINKS DIVS)
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // WE SAID THAT , THE this IN EVENTLISTENER IS POINTING THE DOCUMENT ELEMENT ITSELF THAT IS CALLING THE EVENT
//   this.style.backgroundColor = randomColor();
//   // IT TARGETS THE ACUALL ELEMENT ON WHICH THE EVENT IS TARGETTED TOWARDS. THE OTHER ARE PARENTS SO THEY WILL ASLO BE TARGETTED BY THIS ONE EVENT , BECAUSE WE SAID THAT BEFORE OF BUBBLING
//   console.log('LINK ', e.target);

//   // IT TARGETS THE CURRENT ELEMENT , IT IS LIKE AS THIS KEYWORD , WHICH TARGETS THE ELEMENT IN WHICH IT IS CALLED.
//   console.log(e.currentTarget);

//   // WE CAN ALSO STOP PROPAGATION AT CHILD DIV.
//   // IT WILL THEN ONLY TARGET THE ACTUAL CHILD DIV AND THE BUBBLING WILL STOP.
//   // BUT THAT'S NOT A GOOD IDEA TO STOP PROPAGATION.
//   e.stopPropagation();
// });

// // THE PARENT DIV OF THE NAV_LINK
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER ', e.target);

//   console.log(e.currentTarget);
// });

// // THE PARENT DIV OF THE NAV_LINKS
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV ', e.target);

//     console.log(e.currentTarget);
//   }
// true
// THIS TRUE HERE MEANS THAT , WE CAN KNOW ALSO HANDLE THE EVENT IN CAPTURE PHASE , AND IT WILL START FROM THE CAPTURE PHASE AS WELL(FROM THE ROOT OF THE DOCUMENT TO THE TARGET ELEMENT).
// BUT CAPTURE PHASE HANDLING IS NOT ANYMORE USED NOW A DAYS.
// AND THE REASON IS WHY THESE TWO PHASES STILL EXIST(CAPTURING & BUBBLING) IS SOME OF SOME HISTORICAL REASON , WHEN EVERY BROWSER USE DIFFERENT VERSION OF JAVASCRIPT.
// );
// WHEN THE USER CLICKS ON A CHILD DIV , THE COLOR OF THIER PARENT DIVS ALSO CHANGES , BUT WHEN THE USER CLICKS ON ONE THE PARENT DIVS , IT WILL CHANGED ITSELF.
// THIS IS THE REAL EXAMPLE OF HOW BUUBLING IN EVENT PROPAGATION WORKS, BECAUSE  BUBBLING IS THE CONCEPT IN WHICH THE TARGET EVENT(CHILD DIV EVENT) MAY HAVE THE EVENT OF THIER PARENT DIV AS WELL, MEANS THE EVENT ON CHILD DIV IS ALSO THE EVENT OF THIER PARENT DIV , AND IT WORKS IN THE LINEAR WAY.
