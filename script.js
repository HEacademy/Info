const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  document.documentElement.classList.add('js-motion');
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
const levelButtons = document.querySelectorAll('[data-level]');
levelButtons.forEach(button => button.addEventListener('click', () => {
  levelButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const mid = button.dataset.level === 'mid';
  document.getElementById('full-price').textContent = mid ? '80,000' : '120,000';
  document.getElementById('price-caption').textContent = mid ? 'Փաթեթի արժեքը · Միջին մակարդակի համար' : 'Փաթեթի արժեքը · Սկսնակների համար';
}));
let ticking = false;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector('.reading-progress').style.width = (distance > 0 ? window.scrollY / distance * 100 : 0) + '%';
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; } }, {passive:true});
window.addEventListener('resize', updateProgress);
updateProgress();
