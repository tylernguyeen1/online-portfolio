const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelector("#year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const updateScroll = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  document.querySelector(".scroll-progress").style.transform = `scaleX(${progress})`;

};

window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".project-visual").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
    });
  });
}
