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
courseButtons.forEach(btn =>{
  btn.onclick = () => {
      let activeCourse = btn.closest(".course_card")
      const allCards = [...document.querySelectorAll(".course_card")]
      allCards.forEach(card => card.classList.remove("active"))
      activeCourse.classList.add("active")
  }
    
})