/* ── Sticky header ── */
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    /* ── Hamburger menu ── */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    function closeMobileNav() {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    /* Click outside to close mobile nav */
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) closeMobileNav();
    });

    /* ── Scroll reveal ── */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));

    /* ── Form submission ── */
    const form = document.getElementById('booking-form');
    const formWrapper = document.getElementById('form-wrapper');
    const successMsg = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const phone   = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;

      if (!name || !phone || !service) {
        /* Simple visual shake for required fields */
        [document.getElementById('name'), document.getElementById('phone'), document.getElementById('service')]
          .forEach(el => {
            if (!el.value.trim()) {
              el.style.borderColor = '#e07070';
              el.addEventListener('input', () => el.style.borderColor = '', { once: true });
            }
          });
        return;
      }

      /* Send via WhatsApp */
      const message = `Olá! Gostaria de agendar um horário no "Nome da sua empresa".%0A%0ANome: ${encodeURIComponent(name)}%0AWhatsApp: ${encodeURIComponent(phone)}%0AServiço: ${encodeURIComponent(service)}`;
      window.open(`https://wa.me/5547999128650?text=${message}`, '_blank', 'noopener,noreferrer');

      /* Show success */
      formWrapper.style.display = 'none';
      successMsg.classList.add('show');
    });

    /* ── Phone mask ── */
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) {
        v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      } else if (v.length > 2) {
        v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      }
      e.target.value = v;
    });