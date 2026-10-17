const loader = document.getElementById('loader');

const P = {
    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/>',
    signal: '<path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
    film: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 3v18M17 3v18M2 8h5M2 16h5M17 8h5M17 16h5"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 0 1 0 9z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    play: '<path d="m6 3 14 9-14 9z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>'
};
const paint = r => (r || document).querySelectorAll('[data-i]').forEach(el => { el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-full w-full">' + P[el.dataset.i] + '</svg>' });

const feats = [
    ['shield', 'BRB automático', 'Quando todas as conexões caem, o OBS troca para a sua cena de BRB e a live continua no ar. Quando você reconecta, ele volta para a cena ao vivo.'],
    ['layers', 'SRTLA bonding', 'O Wi-Fi e a rede móvel do celular viram uma transmissão só. Quando uma conexão falha, as outras seguram a live.'],
    ['globe', 'Ingest perto de você', 'Ingests no Brasil, nos EUA e na Europa. Seu encoder conecta no mais próximo.'],
    ['film', 'H.265', 'Envie H.265 (HEVC) por SRT e gaste menos dados móveis que com H.264 na mesma qualidade.'],
    ['share', 'Multistream', 'Em todos os planos, envie uma transmissão para até 4 destinos ao mesmo tempo, incluindo Twitch, YouTube, Kick e RTMP personalizado.'],
    ['cloud', 'OBS na nuvem', 'No plano Avançado, um OBS Studio completo roda nos nossos servidores e você controla pelo navegador.']
];
document.getElementById('features').innerHTML = feats.map((f, i) => `<div class="reveal" style="--d:${(i % 3) * .12}s"><div class="tilt h-full rounded-3xl border border-ink/5 bg-gradient-to-br from-white to-soft p-6 shadow-sm"><span class="tile3d mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white"><i data-i="${f[0]}" class="h-6 w-6"></i></span><h3 class="text-lg font-bold">${f[1]}</h3><p class="mt-2 text-sm leading-relaxed text-ink/65">${f[2]}</p></div></div>`).join('');

const shared = ['SRTLA bonding e cena de BRB automática', 'Multistream para Twitch, YouTube e Kick', 'Dashboard com estatísticas em tempo real', 'Suporte ao OBS do seu PC'];
const plans = [
    { id: 'basic', name: 'Básico', m: 'R$ 119,90', y: 'R$ 1.199,00', eq: 'R$ 99,92', on: ['1 ingest', ...shared], off: ['OBS na nuvem controlado pelo navegador', 'Biblioteca de mídia para overlays e vídeos'] },
    { id: 'advanced', name: 'Avançado', m: 'R$ 499,90', y: 'R$ 4.999,00', eq: 'R$ 416,58', hot: 1, on: ['2 ingests', ...shared, 'OBS na nuvem controlado pelo navegador', 'Biblioteca de mídia para overlays e vídeos'], off: [] }
];
let year = false;
const renderPlans = () => {
    document.getElementById('plans').innerHTML = plans.map((p, i) => `<div class="reveal in" style="--d:${i * .12}s"><div class="tilt h-full rounded-3xl p-7 ${p.hot ? 'bg-gradient-to-br from-brand to-deep text-white shadow-2xl shadow-brand/30' : 'border border-ink/10 bg-white shadow-sm'}">
<div class="flex items-center justify-between"><h3 class="text-xl font-extrabold">${p.name}</h3>${p.hot ? '<span class="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">Com OBS na nuvem</span>' : ''}</div>
<div class="mt-5 flex items-end gap-1"><span class="text-4xl font-extrabold">${year ? p.y : p.m}</span><span class="pb-1 text-sm opacity-70">${year ? '/ano' : '/mês'}</span></div>
<p class="mt-1 min-h-[1.25rem] text-sm opacity-70">${year ? 'equivale a ' + p.eq + ' por mês' : 'Cobrança mensal'}</p>
<ul class="mt-6 space-y-3 text-sm font-medium">${p.on.map(t => `<li class="flex gap-2.5"><i data-i="check" class="mt-0.5 h-5 w-5 shrink-0 rounded-full p-1 ${p.hot ? 'bg-white text-brand' : 'bg-brand text-white'}"></i>${t}</li>`).join('')}${p.off.map(t => `<li class="flex gap-2.5 opacity-45"><i data-i="x" class="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-ink/10 p-1"></i><span>${t}<br><span class="text-xs">Só no plano Avançado</span></span></li>`).join('')}</ul>
<a href="https://live.streamerkit.net/plans?plan=${p.id}&interval=${year ? 'year' : 'month'}" class="mt-8 block rounded-xl py-3.5 text-center font-bold transition hover:-translate-y-0.5 ${p.hot ? 'bg-white text-brand' : 'bg-ink text-white hover:bg-brand'}">Escolher ${p.name}</a></div></div>`).join('');
    paint(); bindTilt();
    document.getElementById('bMonth').className = 'rounded-full px-5 py-2 transition ' + (year ? '' : 'bg-brand text-white');
    document.getElementById('bYear').className = 'rounded-full px-5 py-2 transition ' + (year ? 'bg-brand text-white' : '');
};

const faqs = [
    ['O que é o StreamerKit?', 'Um servidor de live para IRL. Seu celular envia a transmissão por SRTLA, o StreamerKit mantém tudo estável e entrega ao OBS, no seu PC ou na nuvem, e o OBS envia para Twitch, YouTube, Kick ou qualquer destino RTMP.'],
    ['Qual a diferença entre o Básico e o Avançado?', 'Os dois têm SRTLA bonding, a cena de BRB automática e multistream. O Básico (R$ 119,90/mês) tem 1 ingest e funciona com o OBS do seu PC. O Avançado (R$ 499,90/mês) tem 2 ingests, OBS na nuvem controlado pelo navegador e a biblioteca de mídia. No plano anual você paga o preço de 10 meses.'],
    ['Preciso deixar o PC ligado?', 'No Básico, sim: o OBS roda no seu PC e ele precisa ficar ligado durante toda a live. No Avançado, o OBS roda nos nossos servidores e você liga pelo dashboard, então o PC pode ficar desligado.'],
    ['Quais apps e encoders funcionam?', 'Moblin (iPhone), IRL Pro (Android), Larix Broadcaster (iPhone e Android), OBS Studio e qualquer encoder que envie SRT ou SRTLA. O dashboard mostra um QR code que carrega as configurações no Moblin, no IRL Pro e no Larix.'],
    ['O que acontece se minha internet cair?', 'Se você somar Wi-Fi e rede móvel, perder uma conexão não interrompe a live. Se todas caírem, o OBS troca para a sua cena de BRB e volta para a cena ao vivo quando o celular reconecta. Com o OBS no PC, isso precisa do plugin do StreamerKit (Windows).'],
    ['Funciona com 4G ou 5G fraco?', 'O SRTLA distribui a transmissão entre todas as suas conexões e o SRT reenvia pacotes perdidos, então a live aguenta sinal fraco. O H.265 reduz os dados necessários e o ingest mais próximo encurta a distância.']
];
document.getElementById('faqList').innerHTML = faqs.map((f, i) => `<div class="reveal" style="--d:${i * .06}s"><details class="rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10"><summary class="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold">${f[0]}<span class="plus text-2xl font-light text-brand transition-transform">+</span></summary><p class="px-5 pb-5 text-sm leading-relaxed text-white/70">${f[1]}</p></details></div>`).join('');

const logos = ['Twitch', 'YouTube', 'Kick', 'Moblin', 'IRL Pro', 'Larix', 'OBS Studio', 'RTMP'];
document.getElementById('marq').innerHTML = [...logos, ...logos, ...logos, ...logos].map(l => `<span>${l}</span>`).join('');

function bindTilt() {
    document.querySelectorAll('.tilt:not([data-b])').forEach(el => {
        el.dataset.b = 1;
        el.addEventListener('pointermove', e => {
            if (e.pointerType === 'touch') return;
            const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
            el.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-4px)`;
        });
        el.addEventListener('pointerleave', () => { el.style.transform = '' });
    });
}

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .15 });
const observe = () => document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));

const stage = document.getElementById('stage'), wrap = document.getElementById('stageWrap');
wrap.addEventListener('pointermove', e => {
    const r = wrap.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    stage.style.transform = `rotateY(${x * 22}deg) rotateX(${-y * 16}deg)`;
});
wrap.addEventListener('pointerleave', () => { stage.style.transform = 'rotateY(-12deg) rotateX(4deg)' });
stage.style.transform = 'rotateY(-12deg) rotateX(4deg)';
addEventListener('scroll', () => {
    const y = Math.min(scrollY, 700);
    if (!wrap.matches(':hover')) stage.style.transform = `rotateY(${-12 + y * .03}deg) rotateX(${4 - y * .01}deg)`;
}, { passive: true });

const st = { w: true, m: true };
const demo = () => {
    const scene = document.getElementById('scene'), off = !st.w && !st.m;
    document.getElementById('bW').style.width = st.w ? '92%' : '0%';
    document.getElementById('bM').style.width = st.m ? '70%' : '0%';
    document.getElementById('tW').textContent = st.w ? 'conectado' : 'caiu';
    document.getElementById('tM').textContent = st.m ? 'conectado' : 'caiu';
    document.getElementById('dW').textContent = st.w ? 'Derrubar Wi-Fi' : 'Reconectar Wi-Fi';
    document.getElementById('dM').textContent = st.m ? 'Derrubar rede móvel' : 'Reconectar rede móvel';
    scene.className = 'relative grid h-44 place-items-center overflow-hidden rounded-2xl transition-all duration-500 ' + (off ? 'bg-zinc-800' : 'bg-gradient-to-br from-brand to-deep');
    document.getElementById('sceneLabel').textContent = off ? 'BRB' : 'AO VIVO';
    const ic = document.getElementById('sceneIcon'); ic.dataset.i = off ? 'shield' : 'play'; paint(ic.parentNode);
    document.getElementById('demoMsg').textContent = off ? 'Sem sinal: a cena de BRB entra sozinha e a live segue.' : (st.w && st.m ? 'Wi-Fi e rede móvel somados em uma única transmissão.' : (st.w ? 'A rede móvel caiu. A live continua no ar pelo Wi-Fi.' : 'O Wi-Fi caiu. A live continua no ar pela rede móvel.'));
};
document.getElementById('dW').onclick = () => { st.w = !st.w; demo() };
document.getElementById('dM').onclick = () => { st.m = !st.m; demo() };
document.getElementById('bMonth').onclick = () => { year = false; renderPlans() };
document.getElementById('bYear').onclick = () => { year = true; renderPlans() };

const menu = document.getElementById('menu');
document.getElementById('menuBtn').onclick = () => menu.classList.toggle('hidden');
menu.querySelectorAll('a').forEach(a => a.onclick = () => menu.classList.add('hidden'));

paint(); renderPlans(); bindTilt(); observe();

// loader
(function () {
    const loader = document.getElementById('loader');
    const began = performance.now();
    const MIN_TIME = 700;
    const MAX_TIME = 6000;

    const hide = () => {
        if (!loader || loader.dataset.done) return;

        loader.dataset.done = '1';

        const wait = Math.max(
            0,
            MIN_TIME - (performance.now() - began)
        );

        setTimeout(() => {
            loader.classList.add('is-hidden');

            setTimeout(() => loader.remove(), 700);
        }, wait);
    };

    if (!loader) return;

    if (document.readyState === 'complete') {
        hide();
    } else {
        addEventListener('load', hide);
    }

    setTimeout(hide, MAX_TIME);
})();