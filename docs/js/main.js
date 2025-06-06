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
        <img class="menu__item-img" src="../img/menu/${image}.webp" alt="${name}"/>
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
