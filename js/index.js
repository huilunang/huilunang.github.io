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

// Markdown Post
const createElement = (tag, classL = null) => {
  const element = document.createElement(tag);

  if (classL !== null) element.classList.add(...classL);

  return element;
};

const aTag = (link, classL = null) => {
  const a = createElement("a", classL);

  if (link.charAt(0) !== "#") a.setAttribute("target", "_blank");
  a.href = link;

  return a;
};

const imgTag = (file) => {
  const imgE = createElement("img");
  imgE.src = `img/${file}`;

  return imgE;
};

const appendChildE = (parent, children) => {
  children.forEach((child) => parent.appendChild(child));
};

const addProperty = (element, value, property) => {
  switch (property) {
    case "textContent":
      element.textContent = value;
      break;
    case "innerHTML":
      element.innerHTML = value;
      break;
    case "alt":
      element.alt = value;
      break;
  }
};

function generate_meta(type, value = null) {
  let e = null;
  let img = null;

  switch (type) {
    case "date":
      e = createElement("div");
      addProperty(e, value, "textContent");
      break;
    case "title":
      e = createElement("h1");
      addProperty(e, value, "textContent");
      break;
    case "estReadTime":
      e = createElement("h4");
      addProperty(e, value, "textContent");
      break;
    case "summary":
      e = createElement("div", ["desc-proj"]);
      addProperty(e, value, "innerHTML");
      break;
    case "githubLink":
      e = aTag(value);
      img = imgTag("github-mark.svg");
      addProperty(img, "github-logo", "alt");
      appendChildE(e, [img]);
      break;
    case "liveDemoLink":
      e = aTag(value);
      img = imgTag("live-demo.svg");
      addProperty(img, "live-demo-logo", "alt");
      appendChildE(e, [img]);
      break;
  }

  return e;
}

function generate_projlinks(meta) {
  const links = createElement("div", ["link-proj"]);

  if (meta.githubLink) {
    const gitlink = generate_meta("githubLink", meta.githubLink);
    appendChildE(links, [gitlink]);
  }

  if (meta.liveDemoLink) {
    const demolink = generate_meta("liveDemoLink", meta.liveDemoLink);
    appendChildE(links, [demolink]);
  }

  return links;
}

// function generate_modalcontainer(file) {
function generate_modalcontainer(file) {
  fetch(`../post/${file}`)
    .then((response) => response.text())
    .then((markdown) => {
      const { meta, content } = generatePostHTML(markdown);
      const modal_container = document.querySelector(".modal-container");
      const modal_content = createElement("div", ["modal-content"]);

      const modal_heading = createElement("div", ["modal-heading"]);
      const reading_time = generate_meta("estReadTime", meta.estReadTime);
      const links = generate_projlinks(meta);
      appendChildE(modal_heading, [reading_time, links]);

      const modal_body = createElement("div", ["modal-body"]);
      addProperty(modal_body, content, "innerHTML");

      appendChildE(modal_content, [modal_heading, modal_body]);

      modal_container.innerHTML = "";
      appendChildE(modal_container, [modal_content]);
      modal_container.style.display = "block";
      document.body.style.overflow = "hidden";
    });
}

function generate_gridcardproj(file, meta) {
  const grid_card_proj = createElement("li", ["grid-card-proj"]);
  const header_proj = createElement("div", ["header-proj"]);
  const body_proj = createElement("div", ["body-proj"]);
  const footer_proj = createElement("div", ["footer-proj"]);

  const date = generate_meta("date", meta.date);
  const links = generate_projlinks(meta);
  appendChildE(header_proj, [date, links]);

  const title = generate_meta("title", meta.title);
  const summary = generate_meta("summary", meta.summary);
  appendChildE(body_proj, [title, summary]);

  const modal = aTag("#oprojModal", ["modal-btn"]);
  addProperty(modal, "Details", "textContent");
  modal.setAttribute("id", file);
  appendChildE(footer_proj, [modal]);

  appendChildE(grid_card_proj, [header_proj, body_proj, footer_proj]);

  return grid_card_proj;
}

// Function to generate HTML from Markdown content
function generatePostHTML(markdown) {
  const match = markdown.match(/---([\s\S]*?)---/);

  let meta = {};
  let content = markdown;

  if (match) {
    meta = jsyaml.load(match[1].trim());
    content = markdown.replace(match[1], "").trim();
  }
  // console.log(DOMPurify.sanitize(htmlContent))
  return {
    meta: meta,
    content: marked.parse(content),
  };
}

// Function to fetch and render Markdown content
function fetchAndRenderMarkdown(file) {
  const postsContainer = document.querySelector(".grid-proj");

  fetch(`../post/${file}`)
    .then((response) => response.text())
    .then((markdown) => {
      const { meta, content } = generatePostHTML(markdown);

      postsContainer.appendChild(generate_gridcardproj(file, meta));
    });
}

fetch("../post/_all.md")
  .then((response) => response.text())
  .then((files) => {
    files.split(" ").forEach((file) => {
      fetchAndRenderMarkdown(file);
    });
  });

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
    modalId = e.target.id;
    generate_modalcontainer(modalId);
    modal = document.getElementById(modalId);
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
  if (e.target.classList.contains("modal-container")) {
    modalId = e.target.id;
    modal = document.getElementById(modalId);
    if (typeof modal.style !== "undefined") {
      modal.style.display = "none";
      document.body.style.overflow = "visible";
    }
  }
});
