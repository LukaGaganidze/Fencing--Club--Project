"use strict";

// ELEMETS NAV
const navigation = document.querySelector(".main--nav");
const navAboutUs = document.querySelector(".link--history");
const navWeOffer = document.querySelector(".link--navCallendar");
const navTestimonials = document.querySelector(".navTestimonials");
const navGallery = document.querySelector(".link--Gallery");
const navSignup = document.querySelector(".navMembership");

//
// SECTIONS
const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");
const section3 = document.getElementById("section3");
const section4 = document.getElementById("section4");
const section5 = document.getElementById("section5");

//
// BUTTONS
const btnGallery = document.querySelector(".pop--up--gallery");

// BLURS
const galleryBlur = document.querySelector(".blur--gallery");
const secBlurr = document.querySelector(".blur");

//
//
// #FFF NAVIGATION HOVER

const navHover = function (e) {
  if (e.target.classList.contains("nav--link")) {
    const link = e.target;
    const siblings = e.target.closest("nav").querySelectorAll(".nav--link");

    siblings.forEach((sib) => {
      if (sib !== link) {
        sib.style.opacity = this;
      }
    });
    navigation.querySelector("img").style.opacity = this;
  }
};

navigation.addEventListener("mouseover", navHover.bind(0.5));

//
navigation.addEventListener("mouseout", navHover.bind(1));

// #fff STEAKY NAV
const sec1Coords = section1.getBoundingClientRect().top;

const headerSec = document
  .querySelector(".nav--header--pad")
  .getBoundingClientRect().bottom;

// window.addEventListener("scroll", function () {
//   if (window.scrollY > headerSec) {
//     navigation.classList.add("steaky");
//   } else navigation.classList.remove("steaky");
// });

const header = document.querySelector("header");

const navHeight = navigation.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navigation.classList.add("steaky");
  } else navigation.classList.remove("steaky");
};
const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

navObserver.observe(header);

//
// #FFF SECTION 2 TABS
const btnsBox = document.querySelector(".sec2--button--box");

const sec2buttons = document.querySelectorAll(".button--sec2");

const sec2texts = document.querySelectorAll(".sec2--text--box");

btnsBox.addEventListener("click", function (e) {
  // guard claus
  const target = e.target.closest("button");
  if (!target) return;

  sec2buttons.forEach((b) => b.classList.remove("active"));
  target.classList.add("active");

  sec2texts.forEach((t) => t.classList.remove("sec2--display"));

  document
    .querySelector(`.content--${target.dataset.tab}`)
    .classList.add("sec2--display");
});

// #fff NAVIGATION SCROLLING
// SECTION 4

const scrollImplement = function () {
  navAboutUs.addEventListener("click", function () {
    section1.scrollIntoView({ behavior: "smooth" });
  });
  navWeOffer.addEventListener("click", function () {
    section2.scrollIntoView({ behavior: "smooth" });
  });
  navTestimonials.addEventListener("click", function () {
    section3.scrollIntoView({ behavior: "smooth" });
  });
  navGallery.addEventListener("click", function () {
    section4.scrollIntoView({ behavior: "smooth" });
  });
  navSignup.addEventListener("click", function () {
    section5.scrollIntoView({ behavior: "smooth" });
  });
};
scrollImplement();

// #fff GALLERY TRACKER
const observerFun = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting === true) {
    const track = document.getElementById("image-track");

    const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
    };

    const handleOnMove = (e) => {
      if (track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
          parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(
          Math.min(nextPercentageUnconstrained, 0),
          -100
        );

      track.dataset.percentage = nextPercentage;
      track.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      ) === false;

      for (const image of track.getElementsByClassName("image")) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };

    window.onmousedown = (e) => handleOnDown(e);

    window.ontouchstart = (e) => handleOnDown(e.touches[0]);

    window.onmouseup = (e) => handleOnUp(e);

    window.ontouchend = (e) => handleOnUp(e.touches[0]);

    window.onmousemove = (e) => handleOnMove(e);

    window.ontouchmove = (e) => handleOnMove(e.touches[0]);
  } else return;
};

const options = {
  root: null,
  threshhold: 0,
};

const observer = new IntersectionObserver(observerFun, options);

observer.observe(section4);

// when its on gallery

const gallerFun = function (entries) {
  const [entry2] = entries;

  if (entry2.isIntersecting === true) {
    const gallNav = document.querySelector(".link--Gallery");

    gallNav.addEventListener("click", function () {
      location.reload();
    });
  }
};

const options2 = {
  root: null,
  threshhold: 1,
};
const obs2 = new IntersectionObserver(gallerFun, options2);
obs2.observe(section4);

// #fff OPEN MODAL

const modal = document.querySelector(".modal");
const joinClub = document.querySelector(".link--Openacc");

joinClub.addEventListener("click", function () {
  modal.classList.remove("display--none");
  secBlurr.style.display = "block";
});

const joinClubBottom = document.querySelector(".bottom--signt-btn");

joinClubBottom.addEventListener("click", function () {
  modal.classList.remove("display--none");
  secBlurr.style.display = "block";
});

// #fff CLOSE MODAL

secBlurr.addEventListener("click", function () {
  modal.classList.add("display--none");
  secBlurr.style.display = "none";
});

document.querySelector(".join--btn").addEventListener("click", function () {
  location.reload();
  modal.classList.add("display--none");
  secBlurr.style.display = "none";
});

//
// #fff  SLIDER TESTIMONIALS
const testimonialas = document.querySelectorAll(".testimonial--box");

const btnLeft = document.querySelector(".testimonials--left");
const btnRight = document.querySelector(".testimonials--right");

const maxWidthTestimonislas = testimonialas.length;

let curslide = 0;

// CUR SLIDE
testimonialas.forEach((el, i) => {
  el.style.transform = `translateX(${i * 100}%)`;
  console.log(i);
});

// RIGHT SLIDE
btnRight.addEventListener("click", function () {
  if (curslide === maxWidthTestimonislas - 1) {
    curslide = 0;
  } else {
    curslide++;
  }

  testimonialas.forEach((el, i) => {
    el.style.transform = `translateX(${(i - curslide) * 100}%)`;
  });
});

// LEFT SLIDE
btnLeft.addEventListener("click", function () {
  if (curslide === 0) {
    curslide = maxWidthTestimonislas - 1;
  } else {
    curslide--;
  }

  testimonialas.forEach((el, i) => {
    el.style.transform = `translateX(${(i - curslide) * 100}%)`;
  });
});
