// script.js
(function() {
  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const links = Array.from(document.querySelectorAll('[data-tab-link]'));
  const sections = Array.from(document.querySelectorAll('.tab-section'));

  function setActiveTab(tabId) {
    if (!tabId) tabId = 'home';

    links.forEach(link => {
      link.classList.toggle('active', link.dataset.tabLink === tabId);
    });

    sections.forEach(section => {
      const isActive = section.id === tabId;
      section.classList.toggle('is-active', isActive);
      if (isActive) {
        setTimeout(() => section.focus({ preventScroll: true }), 0);
      }
    });
  }

  function handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    setActiveTab(hash);
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').replace('#', '');
      if (window.location.hash === `#${id}`) {
        e.preventDefault();
        setActiveTab(id);
        nav?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  window.addEventListener('hashchange', handleHashChange);
  document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    const initial = window.location.hash.replace('#', '') || 'home';
    setActiveTab(initial);
  });
})();