//POP-UP ANIMATION ON SCROLL USING INTERSECTION OBSERVER
const popupAniElements = document.querySelectorAll(".pop-up-ani");

// Create a new observer
const popupAniObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const visibleRatio = entry.intersectionRatio;
      if (visibleRatio >= 0.2) {
        // required visible fraction (20%)
        entry.target.classList.add("show");
        // popupAniObserver.unobserve(entry.target);
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    root: null,
    threshold: [0, 0.05, 0.1, 0.2, 0.5], // multiple steps for better ratio updates
  }
);

// Observe each element
popupAniElements.forEach((el) => popupAniObserver.observe(el));

// ================================

// SLIDER ANIMATION WITH GSAP

const slides = document.querySelectorAll(".slide");
let current = 0;
let animating = false;

function animateSlide(index) {
  if (animating) return;
  animating = true;

  const slide = slides[index];
  const left = slide.querySelector(".left");
  const middle = slide.querySelector(".middle");
  const right = slide.querySelector(".right");

  slides.forEach((s) => gsap.set(s, { opacity: 0, pointerEvents: "none" }));
  gsap.set(slide, { opacity: 1, pointerEvents: "auto" });

  const tl = gsap.timeline({
    onComplete: () => (animating = false),
  });

  tl.from(left, {
    x: -200,
    rotation: -15,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  })
    .from(
      middle,
      { y: -200, rotation: 0, opacity: 0, duration: 1, ease: "power3.out" },
      "-=0.7"
    )
    .from(
      right,
      { x: 200, rotation: 15, opacity: 0, duration: 1, ease: "power3.out" },
      "-=0.7"
    );
}

if (slides.length) {
  animateSlide(0);

  setInterval(() => {
    current = (current + 1) % slides.length;
    animateSlide(current);
  }, 4000);

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (nextBtn)
    nextBtn.onclick = () => {
      current = (current + 1) % slides.length;
      animateSlide(current);
    };
  if (prevBtn)
    prevBtn.onclick = () => {
      current = (current - 1 + slides.length) % slides.length;
      animateSlide(current);
    };
}
