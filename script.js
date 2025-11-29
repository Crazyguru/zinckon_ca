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


// SMOKE TEXT ANIMATION

function applySmokeText(el) {
  let delay = 0;

  function wrapNode(node) {
    // TEXT NODE
    if (node.nodeType === Node.TEXT_NODE) {
      return [...node.textContent].map((char) => {
        if (char === " ") return document.createTextNode(" ");

        const span = document.createElement("span");
        span.className = "smoke-char";
        span.style.setProperty("--delay", `${delay}ms`);
        span.textContent = char;

        delay += 25;
        return span;
      });
    }

    // ELEMENT NODE (H1, P, SPAN…)
    if (node.nodeType === Node.ELEMENT_NODE) {
      const wrapper = node.cloneNode(false);
      node.childNodes.forEach((child) => {
        wrapNode(child).forEach((c) => wrapper.appendChild(c));
      });
      return [wrapper];
    }

    // OTHER NODE TYPES (rare)
    return [node.cloneNode()];
  }

  const newChildren = [];
  el.childNodes.forEach((child) => {
    newChildren.push(...wrapNode(child));
  });

  el.innerHTML = "";
  newChildren.forEach((child) => el.appendChild(child));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".smoke-text").forEach(applySmokeText);
});
// SLIDE IN ANIMATION ON SCROLL



function handleSlideInOnScroll() {
  const elements = document.querySelectorAll(
    ".slide-in-left, .slide-in-right, .slide-in-top, .slide-in-bottom"
  );

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 1.75;

    if (rect.top < triggerPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleSlideInOnScroll);
window.addEventListener("load", handleSlideInOnScroll);