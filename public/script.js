// Menu, reveal, and contact alert (placeholders)
(() => {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  // reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Contact form (alert demo)
  const form = document.querySelector('form[name="contact"]');
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      alert(`Thanks ${data.name}! Message received — I'll reply to ${data.email}.`);
      form.reset();
    });
  }
})();
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});