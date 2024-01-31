// Menu
var curScroll = 0;
var navBlock = document.getElementById("nav-open");

var menu = document.getElementById("nav-items");
var closeMenu = document.getElementById("nav-close-icon");
var openMenu = document.getElementById("nav-open-icon");
var clickLinks = document.getElementById("nav-links");

function navDis() {
  menu.style.top = "-100vh";
  document.body.style.overflow = "visible";
}

closeMenu.onclick = navDis;
clickLinks.onclick = navDis;
openMenu.onclick = function () {
  menu.style.top = "0";
  document.body.style.overflow = "hidden";
};

// Typed JS
const typeTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".moving-cursor");
const article = document.querySelector(".article");

const textArr = ["aspiring techie.", "software developer."];
const vowels = ["a", "e", "i", "o", "u"];
const typeDelayed = 140; // ms, delay before typing the next char
const erasingDealyed = 60; //ms, erasing will be faster
const nextTextDelayed = 2000; //ms, delay between current and next string

let textArrIdx = 0;
let charIdx = 0;

function type() {
  if (charIdx < textArr[textArrIdx].length) {
    if (!cursorSpan.classList.contains("typing")) {
      cursorSpan.classList.add("typing");

      if (vowels.includes(textArr[textArrIdx].charAt(0).toLowerCase()))
        article.textContent = "An";
      else article.textContent = "A";
    }
    typeTextSpan.textContent += textArr[textArrIdx].charAt(charIdx);
    charIdx++;
    setTimeout(type, typeDelayed);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, nextTextDelayed);
  }
}

function erase() {
  if (charIdx > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typeTextSpan.textContent = textArr[textArrIdx].substring(0, charIdx - 1);
    charIdx--;
    setTimeout(erase, erasingDealyed);
  } else {
    cursorSpan.classList.remove("typing");
    textArrIdx++;
    if (textArrIdx >= textArr.length) textArrIdx = 0;
    setTimeout(type, typeDelayed + 1100);
  }
}

// Carousel
var owl = $(".carousel");
owl.owlCarousel({
  items: 1,
  margin: 10,
  loop: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  mouseDrag: true,
  touchDrag: true,
  center: true,
  navText: [
    "<i class='fa fa-angle-left'></i>",
    "<i class='fa fa-angle-right'></i>",
  ],
  // stagePadding: 0,
  responsiveClass: true,
  responsive: {
    0: {
      nav: false,
    },
    769: {
      nav: true,
    },
  },
});

// ** Event Listeners ** //
window.addEventListener("scroll", function () {
  // Menu
  var scrolled = window.scrollY || document.documentElement.scrollTop;

  if (scrolled > curScroll) {
    navBlock.style.top = "-82px";
  } else {
    navBlock.style.top = "0";
  }
  curScroll = scrolled;
});

document.addEventListener("DOMContentLoaded", function () {
  // Typed JS
  if (textArr.length) setTimeout(type, nextTextDelayed + 250);
});

document.addEventListener("click", function (e) {
  // Modal
  if (e.target.classList.contains("modal-btn")) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
  if (e.target.classList.contains("modal-container")) {
    modalId = e.target.id;
    modal = document.getElementById(modalId);
    var iframeTag = document.querySelector("#" + modalId + " iframe");
    iframeTag.src = iframeTag.src;
    if (typeof modal.style !== "undefined") {
      modal.style.display = "none";
      document.body.style.overflow = "visible";
    }
  }
});
