/* Azomakhanye — vanilla JS interactions */
(function () {
  'use strict';

  // Year
  document.getElementById('yr').textContent = new Date().getFullYear();

  // Sticky nav
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    links.classList.remove('open');
  }));

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Animated counters
  const animate = (el) => {
    const to = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const dur = 1800, start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const v = Math.floor(to * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); counterIO.unobserve(e.target); } });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const activeIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => activeIO.observe(s));

  // Form handlers (front-end only)
  const handleForm = (id, msg) => {
    const f = document.getElementById(id);
    if (!f) return;
    f.addEventListener('submit', (ev) => {
      ev.preventDefault();
      alert(msg);
      f.reset();
    });
  };
  handleForm('contactForm', 'Thanks — your enquiry has been received. Our planners will be in touch within one business day.');
  handleForm('cvForm', 'Thanks for applying. We have received your CV and will review it shortly.');
})();
