// Select all elements with the class
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
