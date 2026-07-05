/**
 * Barrie Workflow Automation — interactions
 * Navbar scroll state, mobile menu, smooth scroll, reveal animations,
 * and PocketBase form submission.
 */

const PB_URL = 'https://pocketbase-production-84ab.up.railway.app';
document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Navbar scroll state ---------------- */
    const nav = document.getElementById('nav');
    const onScroll = () => {
        if (window.scrollY > 40) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------------- Mobile menu ---------------- */
    const toggle = document.getElementById('navToggle');
    const mobile = document.getElementById('navMobile');
    const icon = document.getElementById('navIcon');
    const OPEN = 'M6 18L18 6M6 6l12 12';
    const CLOSED = 'M4 6h16M4 12h16M4 18h16';
    let open = false;

    const setMenu = (state) => {
        open = state;
        mobile.classList.toggle('open', open);
        icon.querySelector('path').setAttribute('d', open ? OPEN : CLOSED);
        toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => setMenu(!open));
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

    /* ---------------- Smooth scroll with fixed-nav offset ---------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id.length <= 1) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 84;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ---------------- Reveal on scroll ---------------- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('in'), (i % 3) * 90);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => obs.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('in'));
    }

    /* ---------------- Pricing plan → pre-select form + highlight card ---------------- */
    const priceCards = document.querySelectorAll('.price-card');
    document.querySelectorAll('.plan-select').forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.getAttribute('data-plan');
            const select = document.getElementById('service');
            if (select && plan) select.value = plan;
            // Highlight selected card, remove from others
            priceCards.forEach(card => card.classList.remove('selected'));
            btn.closest('.price-card').classList.add('selected');
        });
    });

    /* ---------------- Contact form (PocketBase) ---------------- */
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const success = document.getElementById('successMsg');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const original = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner"></span><span>Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.75';
            submitBtn.style.cursor = 'not-allowed';

            const data = new FormData(form);
            const subscribed = document.getElementById('subscribe').checked;
            const name = data.get('name') || '';
            const email = data.get('email') || '';

            try {
                // Save contact record
                const contactRes = await fetch(`${PB_URL}/api/collections/contacts/records`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        phone: data.get('phone') || '',
                        service: `${data.get('service') || ''} ${data.get('addon') || ''}`.trim(),
                        message: data.get('message') || '',
                        subscribed
                    })
                });
                if (!contactRes.ok) throw new Error('Contact save failed');

                // If opted in, save to subscribers
                if (subscribed) {
                    await fetch(`${PB_URL}/api/collections/subscribers/records`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email,
                            name,
                            source: 'contact-form',
                            unsubscribed: false
                        })
                    });
                }

                form.style.display = 'none';
                success.classList.add('show');
                form.reset();

            } catch (err) {
                submitBtn.innerHTML = '<span>Failed to send — please try again.</span>';
                setTimeout(() => {
                    submitBtn.innerHTML = original;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '';
                    submitBtn.style.cursor = '';
                }, 3000);
            }
        });
    }
});
