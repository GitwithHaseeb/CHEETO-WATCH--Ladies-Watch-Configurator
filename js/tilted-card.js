/**
 * Vanilla TiltedCard: 3D tilt from pointer (no cursor tooltip).
 */
(function () {
  const root = document.getElementById("heroTiltedCard");
  if (!root) return;

  const inner = root.querySelector(".tilted-card__inner");
  if (!inner) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rotateAmp = Number(root.dataset.rotateAmplitude || 12);
  const scaleHover = Number(root.dataset.scaleHover || 1.08);
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;

  let targetRx = 0;
  let targetRy = 0;
  let curRx = 0;
  let curRy = 0;
  let curScale = 1;
  let targetScale = 1;
  let raf = 0;
  let active = false;

  function tick() {
    const ease = 0.14;
    curRx += (targetRx - curRx) * ease;
    curRy += (targetRy - curRy) * ease;
    curScale += (targetScale - curScale) * ease;
    inner.style.transform = `rotateX(${curRx}deg) rotateY(${curRy}deg) scale3d(${curScale}, ${curScale}, 1)`;

    const moving =
      active ||
      Math.abs(targetRx - curRx) > 0.02 ||
      Math.abs(targetRy - curRy) > 0.02 ||
      Math.abs(targetScale - curScale) > 0.004;

    if (moving) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  }

  function ensureLoop() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function onMove(e) {
    if (reduceMotion || isCoarse) return;
    const rect = root.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    if (px < 0 || py < 0 || px > rect.width || py > rect.height) return;
    const nx = (px / rect.width - 0.5) * 2;
    const ny = (py / rect.height - 0.5) * 2;
    targetRy = nx * rotateAmp;
    targetRx = -ny * rotateAmp;
    ensureLoop();
  }

  function onEnter() {
    if (reduceMotion) return;
    active = true;
    targetScale = scaleHover;
    ensureLoop();
  }

  function onLeave() {
    active = false;
    targetRx = 0;
    targetRy = 0;
    targetScale = 1;
    ensureLoop();
  }

  root.addEventListener("mousemove", onMove, { passive: true });
  root.addEventListener("mouseenter", onEnter, { passive: true });
  root.addEventListener("mouseleave", onLeave, { passive: true });

  if (reduceMotion) {
    inner.style.transform = "none";
  }
})();
