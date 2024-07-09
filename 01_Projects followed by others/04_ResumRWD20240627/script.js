// ========================Show menu======================//
const navMenu = document.querySelector(".nav-menu");
const navToggle = document.querySelector(".nav-toggle");
const navClose = document.querySelector(".nav-close");

//menu show
navToggle.addEventListener("click", () => {
 navMenu.classList.add("show-menu");
});

//menu hidden
navClose.addEventListener("click", () => {
 navMenu.classList.remove("show-menu");
});

// ================Remove menu when click <a></a>>================//
const navLinks = document.querySelectorAll(".nav-link");

// arrow function語法
const linkAction = () => {
 navMenu.classList.remove("show-menu");
};

navLinks.forEach((link) => {
 link.addEventListener("click", linkAction);
});

// ================Add blur header================//
const blurHeader = () => {
 const header = document.querySelector("header");
 if (scrollY >= 50) {
  header.classList.add("blur-header");
 } else {
  header.classList.remove("blur-header");
 }
};
window.addEventListener("scroll", blurHeader);

// ================EmailJS================//

// ================Show scroll up================//

// ================Scroll section active link================//

// ================Scroll reveal animation================//
