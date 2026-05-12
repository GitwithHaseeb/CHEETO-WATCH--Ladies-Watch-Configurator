const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((el) => observer.observe(el));

const parallaxCards = document.querySelectorAll("[data-parallax]");
let parallaxTicking = false;
const updateParallax = () => {
  const y = window.scrollY;
  parallaxCards.forEach((card, index) => {
    card.style.transform = `translateY(${(y * 0.008) * ((index % 2) + 1)}px)`;
  });
  parallaxTicking = false;
};
window.addEventListener("scroll", () => {
  if (parallaxCards.length === 0) return;
  if (!parallaxTicking) {
    parallaxTicking = true;
    window.requestAnimationFrame(updateParallax);
  }
});

const particlesRoot = document.getElementById("particles");
if (particlesRoot) {
  for (let i = 0; i < 26; i += 1) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `${Math.random() * 20}%`;
    p.style.animationDuration = `${8 + Math.random() * 10}s`;
    p.style.animationDelay = `${Math.random() * 6}s`;
    particlesRoot.appendChild(p);
  }
}
