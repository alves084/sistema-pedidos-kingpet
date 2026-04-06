document.addEventListener("DOMContentLoaded", () => {
  // --- ELEMENTOS GERAIS ---
  const sliderContainer = document.querySelector(".banner .sliders");
  const slides = document.querySelectorAll(".banner .slide");
  const pointers = document.querySelectorAll(".banner .pointers");
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");
  const header = document.querySelector(".header");

  let currentSlide = 0;
  let slideInterval;

  // --- SLIDER PRINCIPAL ---
  const setSliderWidth = () => {
    sliderContainer.style.width = `${100 * slides.length}vw`;
  }

  const showSlide = (index) => {
    const slideWidth = window.innerWidth;
    sliderContainer.style.marginLeft = `-${slideWidth * index}px`;

    pointers.forEach((pointer, i) =>
      pointer.classList.toggle("active", i === index)
    );
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  /* Inicialização do slider
  setSliderWidth();
  showSlide(currentSlide);
  slideInterval = setInterval(nextSlide, 5000);

  // Pausar ao passar o mouse
  sliderContainer.addEventListener("mouseenter", () => clearInterval(slideInterval));
  sliderContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });*/

  // Navegação por setas
  leftArrow?.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  });

  rightArrow?.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  });


  // Pontos de navegação
  pointers.forEach((pointer, i) => {
    pointer.addEventListener("click", () => {
      currentSlide = i;
      showSlide(currentSlide);
    });
  });

  // --- SWIPE (Mobile) ---
  let startX = 0, startY = 0, endX = 0, endY = 0;

  sliderContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  sliderContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    handleSwipe();
  });

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < -swipeThreshold) {
        nextSlide();
      } else if (diffX > swipeThreshold) {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      }
    }
  };


 // --- HEADER SCROLL ---
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

})