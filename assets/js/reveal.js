(function () {
    const force = /[?&]reveal=force/.test(location.search);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches && !force) {
        console.info('[reveal] desativado: o sistema pede "reduzir movimento". Abra a página com ?reveal=force para ignorar isso.');
        return;
    }
    console.info('[reveal] iniciado' + (force ? ' (forçado)' : ''));

    const EASE = 'cubic-bezier(.2,.7,.2,1)';
    const SHOWN = { opacity: 1, translate: '0 0', scale: 1, rotate: '0deg', filter: 'blur(0px)' };
    const KINDS = {
        base: { from: { opacity: 0, translate: '0 24px', scale: 0.96, rotate: '0deg', filter: 'blur(6px)' }, dur: 800 },
        left: { from: { opacity: 0, translate: '-28px 0', scale: 1, rotate: '0deg', filter: 'blur(4px)' }, dur: 700 },
        phone: { from: { opacity: 0, translate: '0 70px', scale: 0.8, rotate: '-6deg', filter: 'blur(8px)' }, dur: 1000 },
        card: { from: { opacity: 0, translate: '0 56px', scale: 0.93, rotate: '0deg', filter: 'blur(6px)' }, dur: 900 },
        pop: { from: { opacity: 0, scale: 0.4, filter: 'blur(6px)' }, to: { opacity: 1, scale: 1, filter: 'blur(0px)' }, dur: 700 }
    };
    const STEP = 90;

    function flat(el) {
        const out = [];
        [...el.children].forEach(c => {
            if (c.matches('.space-y-3, .space-y-4, ul, .grid-cols-2')) out.push(...c.children);
            else out.push(c);
        });
        return out;
    }

    function group(name, root, items, extra) {
        console.info('[reveal] ' + name + ': ' + items.length + ' itens preparados');
        items.forEach(i => { i.el.style.opacity = '0'; });
        const io = new IntersectionObserver(entries => {
            if (!entries.some(e => e.isIntersecting)) return;
            io.disconnect();
            console.info('[reveal] ' + name + ': animando');
            items.forEach(({ el, delay, kind }) => {
                const k = KINDS[kind || 'base'];
                el.style.opacity = '';
                el.animate([k.from, k.to || SHOWN], { duration: k.dur, delay, easing: EASE, fill: 'backwards' });
            });
            if (extra) extra();
        }, { threshold: 0.15 });
        io.observe(root);
    }

    function each(name, cards, build) {
        cards.forEach((card, i) => group(name + ' ' + (i + 1), card, build(card, i)));
    }

    function safe(name, fn) {
        try { fn(); } catch (e) { console.warn('reveal:', name, e); }
    }

    safe('hero', () => {
        const wrap = document.getElementById('stageWrap');
        const phone = document.querySelector('#stage > div');
        if (!wrap || !phone) return console.warn('reveal: hero não encontrado');
        const items = [{ el: phone, delay: 0, kind: 'phone' }];
        flat(phone.firstElementChild).forEach((el, i) => items.push({ el, delay: 300 + i * STEP }));
        document.querySelectorAll('#stage .chip').forEach((el, i) => items.push({ el, delay: 800 + i * 170, kind: 'pop' }));
        group('hero', wrap, items);
    });

    safe('hero-lista', () => {
        const ul = document.querySelector('.hero-bg ul');
        if (!ul) return;
        group('hero-lista', ul, [...ul.children].map((el, i) => ({ el, delay: 500 + i * 140, kind: 'left' })));
    });

    safe('passos', () => {
        const cards = [...document.querySelectorAll('#como-funciona .tilt')];
        each('passo', cards, (card, ci) => {
            const base = ci * 120;
            const items = [];
            [...card.children].forEach(c => {
                if (c.tagName === 'SPAN') items.push({ el: c, delay: base + 200, kind: 'pop' });
                else[...c.children].forEach((el, i) => items.push({ el, delay: base + 340 + i * 110 }));
            });
            return items;
        });
    });

    safe('recursos', () => {
        const cards = [...document.querySelectorAll('#features .tilt')];
        if (!cards.length) return console.warn('reveal: recursos não encontrados');
        each('recurso', cards, (card, ci) => {
            const base = (ci % 3) * 120;
            return [...card.children].map((el, i) => (
                i === 0 ? { el, delay: base + 250, kind: 'pop' } : { el, delay: base + 380 + (i - 1) * 110 }
            ));
        });
    });

    safe('demo-lista', () => {
        const scene = document.getElementById('scene');
        const section = scene && scene.closest('section');
        const ul = section && section.querySelector('ul');
        if (!ul) return;
        group('demo-lista', ul, [...ul.children].map((el, i) => ({ el, delay: 200 + i * 130, kind: 'left' })));
    });

    safe('demo', () => {
        const scene = document.getElementById('scene');
        const card = scene && scene.closest('.tilt');
        if (!card) return console.warn('reveal: demo não encontrado');
        const items = flat(card).map((el, i) => ({ el, delay: 150 + i * STEP }));
        const bars = ['bW', 'bM'].map(id => document.getElementById(id)).filter(Boolean);
        group('demo', card, items, () => bars.forEach(b => {
            const w = b.style.width;
            b.animate([{ width: '0%' }, { width: w }], { duration: 900, delay: 700, easing: EASE, fill: 'backwards' });
        }));
    });

    safe('planos', () => {
        const cards = [...document.querySelectorAll('#plans .tilt')];
        if (!cards.length) return console.warn('reveal: planos não encontrados');
        each('plano', cards, (card, ci) => {
            const base = (ci % 2) * 200;
            const items = [{ el: card, delay: base, kind: 'card' }];
            flat(card).forEach((el, i) => items.push({ el, delay: base + 220 + i * 70 }));
            return items;
        });
    });

    safe('faq-cta', () => {
        const card = document.querySelector('#faq .tilt');
        if (!card) return;
        group('faq-cta', card, [...card.children].map((el, i) => (
            i === 0 ? { el, delay: 150, kind: 'pop' } : { el, delay: 300 + (i - 1) * 110 }
        )));
    });

    safe('rodape', () => {
        const wrap = document.querySelector('footer > div');
        if (!wrap) return;
        group('rodape', wrap, [...wrap.querySelectorAll(':scope > .grid > div'), ...wrap.querySelectorAll(':scope > div:last-child')]
            .map((el, i) => ({ el, delay: i * 130 })));
    });
})();