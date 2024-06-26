b'use strict';

///////////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

// PASSING ARGUMENTS TO EVENT HANDLERS:

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// MENU FADE ANIMATION:
nav.addEventListener('mouseover', handleHover.bind(0.5));

// IT WILL UNDO THE OPACITY TO 1
nav.addEventListener('mouseout', handleHover.bind(1));

// DAY 3
// STICKY NAVIGATION:
// IT'S NOT A GOOD PRACTICE, BECAUSE THE WINDOW OBJECT WILL FIRE AGAIN AGAIN WHEN WE SCROLL.
// IT'S NOT GOOD FOR PERFORMANCE.
// THIS EVENT OCCUR IN WINDOW SO WE ATTACED THE EVENT TO WINDOW.
// const initialCoords = section1.getBoundingClientRect();
// VALUE OF AT TOP OF THE VIEWPORT WILL BE HIGHER.
// console.log(initialCoords.top);
window.addEventListener('scroll', function () {
  // WHEN IT REACHES THE POINT WHERE HE VALUE OF TOP BECOME LESS THAN Y
  // if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  // REMOVE IT IF HE VALUE BECOMES HIGHER, SO WHEN WE SCROLL BACK IT WILL BE REMOVED.
  // else nav.classList.remove('sticky');
});
// WE HAVE A BETTER WAY TO APPLY SCROLL SICKY EFFECT.

// STICKY NAVIGATION (A BETTER WAY): THE INTERSECTION OBSERVER API
// WHAT IS AN OBSERVER API?
// THIS API ALLOWS OUR CODE TO OBSERVE CHANGES TO THE WAY THAT A CERTAIN TARGET ELEMENT INTERSECTS ANOTHER ELEMENT, OR THE WAY IT INTERSECTS THE VIEWPORT.
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.2,
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

// LET'S IMPLEMENT IT ON SCROLLING
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// REVEAL SECTIONS
// REVEALING ELEMENTS ON SCROLL
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hiddden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // REPLACE SRC WITH DATA-SRC
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// SLIDER ON PICTURES:
const slider = function(){
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


let curSlide = 0;
const maxSlide = slides.length;

// FUNCTIONS
const createDots = function()
{
  slides.forEach(function(_,i)
{
  dotContainer.insertAdjacentHTML(
    'beforeend',
    `<button class = "dots__dot" data-slide= "${i}></button>`
  )
})
}

const activateDot = function(slide)
{
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

  document.querySelector(`.dots__dot[data-slide= "${slide}"]`).classList.add('dots__dot--active')
}

const goToSlide = function(slide)
{
  slides.forEach(
    (s,i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  )
}

// NEXT SLIDE:
const nextSlide = function()
{
  if(curSlide === maxSlide - 1)
    {
      curSlide = 0;
    }else
    {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide)
}

const prevSlide = function()
{
  if (curSlide === 0)
    {
      curSlide = maxSlide - 1;
    }else
    {
      curSlide--
    }
    goToSlide(curSlide)
    activateDot(curSlide)
}

const init = function()
{
  goToSlide(0)
  createDots()

  activateDot(0)
}
init();

// EVENT HANDLERS
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click' , prevSlide)

document.addEventListener('keydown',function(e)
{
  if(e.key === 'ArrowLeft') prevSlide()
    e.key === 'ArrowRight' && nextSlide()
})

dotContainer.addEventListener('click' , function(e)
{
  if(e.target.classList.contains('dots__dot'))
    {
      const {slide} = e.target.dataset;
      goToSlide(slide)
      activateDot(slide)
    }
})
}
slider()
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


// LIFECYCLE DOM EVENTS

document.addEventListener('DOMContentLoaded', function(e)
{
  console.log('HTML parsed and DOM tree built!' , e);
})

window.addEventListener('load' , function(e)
{
  console.log('Page fully loaded' , e);
})

// window.addEventListener('beforeunload', function(e)
// {
//   e.preventDefault()
//   console.log(e);
//   e.returnValue = ' '
// })