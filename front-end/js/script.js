/* =====================
MOBILE MENU
===================== */

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-links");

if(menuBtn && navMenu){

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}

/* =====================
STICKY NAVBAR
===================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(navbar){

        if(window.scrollY > 100){

            navbar.classList.add("scrolled");

        }else{

            navbar.classList.remove("scrolled");

        }

    }

});

/* =====================
ACTIVE PAGE LINK
===================== */

const currentPage =
window.location.pathname.split("/").pop();

const pageLinks =
document.querySelectorAll(".nav-links a");

pageLinks.forEach(link => {

    const href = link.getAttribute("href");

    if(href === currentPage){

        link.classList.add("active");

    }

});

/* =====================
BACK TO TOP
===================== */

const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(backToTop){

        if(window.scrollY > 500){

            backToTop.style.display = "flex";

        }else{

            backToTop.style.display = "none";

        }

    }

});

if(backToTop){

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}

/* =====================
FAQ ACCORDION
===================== */

const faqQuestions =
document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer =
        question.nextElementSibling;

        if(answer){

            answer.style.display =
            answer.style.display === "block"
            ? "none"
            : "block";

        }

    });

});


/* =====================
SCROLL REVEAL
===================== */

const revealElements =
document.querySelectorAll("section");

function revealOnScroll(){

    revealElements.forEach(element => {

        const top =
        element.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            element.classList.add("reveal");
            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        document
        .querySelector(".nav-links")
        .classList.remove("active");

    });

});
