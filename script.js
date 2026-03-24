(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  const drawer = $('.nav-drawer');
  const toggle = $('.nav-toggle');
  if (drawer && toggle) {
    const setOpen = (open) => {
      drawer.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!drawer.classList.contains('open')));
    document.addEventListener('click', (e) => {
      if (!drawer.classList.contains('open')) return;
      if (drawer.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('a[data-nav]').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  const form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const subject = encodeURIComponent('Avocados Always Fresh website inquiry');
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const to = 'info@avocadosalwaysfresh.example';
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();
