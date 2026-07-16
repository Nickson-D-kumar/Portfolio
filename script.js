// ── CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  
  requestAnimationFrame(animRing);
})();

// grow ring on hover
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '60px'; ring.style.height = '60px';
    ring.style.borderColor = 'rgba(200,255,0,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '40px'; ring.style.height = '40px';
    ring.style.borderColor = 'rgba(200,255,0,0.5)';
  });
});

// ── TYPING
const words = ['Frontend Developer', 'UI/UX Designer', 'Backend Developer'];
let wi = 0, ci = 0, del = false;
const el = document.getElementById('typing-text');
function type() {
  const w = words[wi];
  if (!del) {
    el.textContent = w.substring(0, ++ci);
    if (ci === w.length) setTimeout(() => del = true, 1800);
  } else {
    el.textContent = w.substring(0, --ci);
    if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, del ? 55 : 95);
}
type();

// ── SCROLL REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

// ── PARALLAX BLOBS on mouse
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelectorAll('.hero-blob').forEach((b, i) => {
    const f = (i + 1) * 0.4;
    b.style.transform = `translate(${x * f}px, ${y * f}px)`;
  });
});

// ── NAV active highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-hire)');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(l => {
    l.style.color = l.getAttribute('href') === '#' + cur ? '#f2ede6' : '';
  });
}, { passive: true });
