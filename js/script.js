// burger menu
const burgerBtn = document.querySelector(".burger_menu")
const menu = document.querySelector(".nav")
burgerBtn.onclick = () => {
    menu.classList.toggle("show")
    document.querySelectorAll(".burger_line").forEach(i => i.classList.toggle("active"))
}
const navLinks = [...document.querySelectorAll(".nav_link")]
navLinks.forEach(link => {
    link.onclick = () => {
        menu.classList.remove("show")
        document.querySelectorAll(".burger_line").forEach(i => i.classList.toggle("active"))
    }
})

// header fix
const headerEleement = document.querySelector(".header")

window.addEventListener("scroll", function () {
    let scrolValue = scrollY
    scrolValue > 380 ? headerEleement.classList.add("fixed") : headerEleement.classList.remove("fixed")
})


// Slider
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});



let countersAnimated = false;
function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const counters = document.querySelectorAll('.count');
    const duration = 1000;
    const startTime = performance.now();

    function updateCounters(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const value = Math.floor(progress * target);
            counter.textContent = value;
        });

        if (progress < 1) {
            requestAnimationFrame(updateCounters);
        }
    }
    requestAnimationFrame(updateCounters);
}


function initCounterAnimation() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;


    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(aboutSection);
    } else {

        animateCounters();
    }
}

document.addEventListener('DOMContentLoaded', initCounterAnimation);


// cours cards
const courseButtons = [...document.querySelectorAll(".course_btn")]
courseButtons.forEach(btn => {
    btn.onclick = () => {
        let activeCourse = btn.closest(".course_card")
        const allCards = [...document.querySelectorAll(".course_card")]
        allCards.forEach(card => card.classList.remove("active"))
        activeCourse.classList.add("active")
    }

})

const backBtns = [...document.querySelectorAll(".back_btn")]
backBtns.forEach(btn => {
    btn.onclick = () => {
        const parent = btn.closest(".course_card")
        parent.classList.remove("active")
    }
})

// form

const contactForm = document.querySelector(".contact_form")
const userName = document.getElementById('name');
const phone = document.getElementById('phone');
userName.addEventListener('input', () => {
    userName.value = userName.value.replace(/[^A-Za-zА-Яа-яЁё\s\-]/g, '');
});

phone.addEventListener('input', () => {
    phone.value = phone.value.replace(/\D/g, '');
});
contactForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data);
    contactForm.reset()
})
