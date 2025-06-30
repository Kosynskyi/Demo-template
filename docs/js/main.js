$(document).ready(function () {
  $("#hero-slider").sliderPro({
    width: "100%",
    height: 500,
    slideDistance: 0,
    arrows: true,
    buttons: false,
    waitForLayers: true,
    autoplay: false,
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("fixed");
      backToTop.classList.add("visible");
    } else {
      header.classList.remove("fixed");
      backToTop.classList.remove("visible");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuEl = document.querySelector(".burger");
  const mobileNavEl = document.querySelector(".nav-menu.links");
  mobileMenuEl.addEventListener("click", () => {
    mobileMenuEl.classList.toggle("active");
    mobileNavEl.classList.toggle("active");
  });
});

/*Scroll*/
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtnEl = document.querySelector(".back-to-top");
  backToTopBtnEl.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

/*Current year*/
document.addEventListener("DOMContentLoaded", () => {
  const currentYear = document.getElementById("current-year");
  currentYear.textContent = new Date().getFullYear();
});

// counter
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter__number span");
  let started = false;

  function animateCounter(el, target, duration = 3000) {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const value = Math.min(
        Math.floor((progress / duration) * target),
        target
      );
      el.textContent = value;

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          counters.forEach((counter) => {
            const target = +counter.getAttribute("data-count");
            animateCounter(counter, target, 3000);
          });
          started = true;
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  const counterSection = document.querySelector(".counter__container");
  if (counterSection) {
    observer.observe(counterSection);
  }
});

// swiper
new Swiper(".swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 1000,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    450: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 4,
    },
  },
  on: {
    init() {
      this.el.addEventListener("mouseenter", () => {
        this.autoplay.stop();
      });

      this.el.addEventListener("mouseleave", () => {
        this.autoplay.start();
      });
    },
  },
});

//menu section
document.addEventListener("DOMContentLoaded", function () {
  const menuItemsContainerEl = document.querySelector(".menu__items-container");
  const menuButtonsEl = document.querySelectorAll(".menu-btn");
  let dataArr = null;
  let activeNavEl = "burgers";

  async function loadMenu() {
    try {
      const response = await fetch("./demo-data/menu.json");
      if (!response.ok) throw new Error("Can not load json file");

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error load JSON:", error);
    }
  }

  loadMenu().then((data) => {
    if (data) {
      dataArr = data;

      showItems(data, activeNavEl);
    }
  });

  function showItems(data, category) {
    let markup = "";
    data[category].forEach(({ id, name, price, description, image }) => {
      markup += `<div class="menu__item-element" id=${id}>
      <div class="menu__image-wrapper">
        <img class="menu__item-img" src="./img/menu/${image}.webp" alt="${name}"/>
        <div class="menu__item-price">$${price}</div>
      </div>
      <h3 class="menu__item-name">${name}</h3>
      <div class="menu__item-description">${description}</div>
    </div>`;
    });

    menuItemsContainerEl.innerHTML = markup;
  }

  menuButtonsEl.forEach((item) =>
    item.addEventListener("click", () => {
      const btnName = item.dataset.name;
      menuButtonsEl.forEach((btn) => btn.classList.remove("active"));
      item.classList.add("active");

      showItems(dataArr, btnName);
    })
  );
});

document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true
  });

  if (ScrollTrigger.isTouch !== 1) {
    gsap.fromTo(".chefs",
      { y: 100, opacity: 0.1 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".chefs",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
          scrub: true
        }
      });

    gsap.fromTo(".about-us__text-wrapper",
      { x: -50, y: 100, opacity: 0.8 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-us__text-wrapper",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
          scrub: true
        }
      });

    gsap.fromTo(".about-us__image-container",
      { x: 50, y: 100, opacity: 0.8 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-us__image-container",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
          scrub: true
        }
      });

    // menu start
    const buttons = gsap.utils.toArray(".menu__navigation .menu-btn");

    gsap.fromTo(buttons,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".menu__navigation",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      });

    const menuElements = gsap.utils.toArray(".menu__items-container");
    gsap.fromTo(menuElements,
      { y: 40, opacity: 0.4 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: menuElements,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
          scrub: true
        }
      });
    // menu finish
    //   contacts
    gsap.fromTo(".contacts__content",
      { x: -40, y: 100, opacity: 0.5 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".contacts__content",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
          scrub: true
        }
      });

    gsap.fromTo(".contacts__working-hours",
      { x: 40, y: 100, opacity: 0.5 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".contacts__working-hours",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
          scrub: true
        }
      });
    gsap.fromTo(".contacts__map",
      { y: 100, opacity: 0.4 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".contacts__map",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
          scrub: true
        }
      });
  //   contacts finish
  }
});