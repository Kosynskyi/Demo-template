/*Header menu*/
const menuBtn = $(".mobile-btn");
const headerContainer = $(".header__container");

// menuBtn.on("click", function () {
//   if (!$(this).hasClass("mobile-btn_active")) {
//     $(this).addClass("mobile-btn_active");
//     headerContainer.addClass("mobile-menu-open");
//     $("#menu").animate({
//       height: "toggle",
//     });
//   } else {
//     $(this).removeClass("mobile-btn_active");
//     headerContainer.removeClass("mobile-menu-open");
//     $("#menu").animate({
//       height: "toggle",
//     });
//   }
// });

$(document).ready(function () {
  $(".burger").click(function () {
    $(this).toggleClass("active");
    $(".menu").toggleClass("active");
  });
});

/*Scroll*/
$(document).ready(function () {
  $(".links").on("click", "a", function (event) {
    event.preventDefault();
    let id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top - 25 }, 500);
  });
});

/*Accordion*/
$(function () {
  $("#faq-accordion")
    .accordion({
      header: "> div > h3",
      heightStyle: "content",
    })
    .sortable({
      axis: "y",
      handle: "h3",
      stop: function (event, ui) {
        ui.item.children("h3").triggerHandler("focusout");
        $(this).accordion("refresh");
      },
    });
});

/*Current year*/
let currentYear = $("#current-year");
currentYear.html(new Date().getFullYear());

/*Set cookie message*/
$.cookieMessage({
  mainMessage:
    'This website uses cookies. By using this website you consent to our use of these cookies. <br>For more information visit our <a href="privacy-policy.html" target="_blank">Privacy Policy</a> and <a href="user-consent.html" target="_blank">User Consent</a><br><br>',
  acceptButton: "I Agree!",
  expirationDays: 365,
  cookieName: "cookie",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  fontSize: "14px",
  fontColor: "white",
  btnBackgroundColor: "#3D65CB",
  btnFontSize: "14px",
  btnFontColor: "white",
  linkFontColor: "#60c679",
});

/*Show services details*/
$(document).ready(function () {
  const servicesNavItemEl = $(".services__item");
  const servicesDetailsEl = $(".services-details__container");

  servicesNavItemEl.on("click", function () {
    const index = $(this).index();
    servicesNavItemEl.removeClass("active");
    $(this).addClass("active");
    servicesDetailsEl.removeClass("active");
    servicesDetailsEl.eq(index).addClass("active");
  });
});

/*Close prev element in advantages container*/
$(".advantages__item-title").on("click", function () {
  const $clickedItem = $(this).closest(".advantages__item");
  const $clickedContent = $clickedItem.find(".advantages__description-wrapper");

  if ($clickedItem.hasClass("open")) {
    $clickedItem.removeClass("open");
    $clickedContent.stop(true, true).slideUp(300);
  } else {
    $(".advantages__item").removeClass("open");
    $(".advantages__description-wrapper").stop(true, true).slideUp(300);

    $clickedItem.addClass("open");
    $clickedContent
      .stop(true, true)
      .css("display", "flex")
      .hide()
      .slideDown(300);
  }
});

/*Close prev element in faq container*/
$(".faq__item-title").on("click", function () {
  const $clickedItem = $(this).closest(".faq__item");
  const $clickedContent = $clickedItem.find(".faq__description-wrapper");

  if ($clickedItem.hasClass("open")) {
    $clickedItem.removeClass("open");
    $clickedContent.stop(true, true).slideUp(300);
  } else {
    $(".faq__item").removeClass("open");
    $(".faq__description-wrapper").stop(true, true).slideUp(300);

    $clickedItem.addClass("open");
    $clickedContent
      .stop(true, true)
      .css("display", "flex")
      .hide()
      .slideDown(300);
  }
});

/*sticky header*/
$(document).ready(function () {
  $(window).on("scroll", function () {
    console.log(123);
    const $header = $(".header");
    const $backToTop = $(".back-to-top");
    if ($(this).scrollTop() > 50) {
      $header.addClass("fixed");
      $backToTop.addClass("visible");
    } else {
      $header.removeClass("fixed");
      $backToTop.removeClass("visible");
    }
  });
});

// my
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
            animateCounter(counter, target, 3000); // 4 секунди
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
  const menuNavEl = document.querySelector(".menu__navigation");
  const menuItemsContainerEl = document.querySelector(".menu__items-container");
  const menuButtonsEl = document.querySelectorAll(".menu-btn");
  let dataArr = null;
  let activeNavEl = "burgers";
  async function loadMenu() {
    try {
      const response = await fetch("../demo-data/menu.json");
      if (!response.ok) throw new Error("Не вдалося завантажити menu.json");

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Помилка при завантаженні JSON:", error);
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
