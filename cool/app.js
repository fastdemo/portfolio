import * as THREE from 'three';

/* ============ DATA (from github @fastdemo) ============ */
const PROJECTS = [
  { name:'aeri', lang:'TypeScript', color:'#8b7bff', desc:'Quiet, minimal web app to consume anime & manga. The flagship — clean reading/watching experience, no noise.', topics:['anime','manga','streaming','web-app'], stars:4, url:'https://github.com/fastdemo/aeri', pinned:true },
  { name:'curfew', lang:'TypeScript', color:'#57e6ff', desc:'Blocks distracting websites and keeps you locked in. Pomodoro-powered focus enforcement for Chrome.', topics:['focus','pomodoro','productivity','chrome'], stars:2, url:'https://github.com/fastdemo/curfew', pinned:true },
  { name:'kyoku', lang:'Swift', color:'#ff9a3d', desc:'macOS Spotify music manager. Native, fast, lives in your menu bar and minds its business.', topics:['macos','spotify','swift'], stars:1, url:'https://github.com/fastdemo/kyoku', pinned:false },
  { name:'persona', lang:'TypeScript', color:'#ff6ad5', desc:'SMT Persona-styled dialogue maker. Craft those iconic sharp-cut dialogue boxes — try the live mini-demo below.', topics:['games','maker','persona'], stars:1, url:'https://github.com/fastdemo/persona', pinned:true },
  { name:'autobing', lang:'JavaScript', color:'#d4ff3f', desc:'Rewards automation extension for Edge. Set it, forget it, collect. The grind, automated.', topics:['automation','bing','edge'], stars:1, url:'https://github.com/fastdemo/autobing', pinned:true },
  { name:'themeify', lang:'JavaScript', color:'#7dff6a', desc:'Color the web! Fresh-out-the-oven theming experiment — paint any page your color.', topics:['theming','fresh'], stars:0, url:'https://github.com/fastdemo/themeify', pinned:false, fresh:true },
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const toast = m => { const t=$('#toast'); t.textContent=m; t.classList.add('show'); clearTimeout(t._x); t._x=setTimeout(()=>t.classList.remove('show'),2600); };

/* ============ HERO INTRO (runs on load) ============ */
heroIntro();

/* ============ LENIS SMOOTH SCROLL ============ */
let lenis = null;
try { if (window.Lenis) { lenis = new Lenis({ lerp:.09 }); const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); } } catch(e){}
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const el = document.querySelector(a.getAttribute('href')); if (!el) return;
  e.preventDefault(); $('#mobile-menu').classList.remove('open');
  lenis ? lenis.scrollTo(el, {offset:-80}) : el.scrollIntoView({behavior:'smooth'});
}));

/* ============ THREE.JS HERO — particle torus knot + orbs ============ */
(() => {
  const canvas = $('#webgl');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(60, 1, .1, 100); cam.position.set(0, 0, 9);
  const resize = () => { const w=canvas.clientWidth||innerWidth, h=canvas.clientHeight||innerHeight; renderer.setSize(w,h,false); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); cam.aspect=w/h; cam.updateProjectionMatrix(); };
  resize(); addEventListener('resize', resize);

  // particle knot
  const geo = new THREE.TorusKnotGeometry(2.4, .62, 220, 28);
  const pos = geo.attributes.position;
  const N = pos.count;
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos.array.slice(), 3));
  const pMat = new THREE.PointsMaterial({ color:0xd4ff3f, size:.035, transparent:true, opacity:.75 });
  const pts = new THREE.Points(pGeo, pMat); pts.position.x = 2.6; scene.add(pts);
  // wire ghost
  const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color:0x8b7bff, wireframe:true, transparent:true, opacity:.10 }));
  wire.position.x = 2.6; scene.add(wire);
  // orbs
  const orbs = [];
  [[0xff6ad5,-3.4,1.4],[0x57e6ff,-4.4,-1.2],[0xd4ff3f,5.2,-1.6,.5]].forEach(([c,x,y,s=.9])=>{
    const m = new THREE.Mesh(new THREE.SphereGeometry(s,32,32), new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.85}));
    m.position.set(x,y,-2); scene.add(m); orbs.push(m);
  });
  scene.add(new THREE.AmbientLight(0xffffff, .6));
  let mx=0,my=0,t=0,frames=0,last=performance.now();
  addEventListener('mousemove', e => { mx=(e.clientX/innerWidth-.5); my=(e.clientY/innerHeight-.5); });
  const isMobile = matchMedia('(max-width:1020px)').matches;
  if (isMobile) { pts.position.x = 0; pts.position.y = 1.2; wire.position.x=0; wire.position.y=1.2; pts.scale.setScalar(.8); wire.scale.setScalar(.8); cam.position.z = 11; }
  (function loop(){
    requestAnimationFrame(loop); t += .004;
    pts.rotation.x = t*.7 + my*.6; pts.rotation.y = t + mx*.8;
    wire.rotation.copy(pts.rotation);
    pMat.color.set(document.documentElement.dataset.mode==='gamer' ? 0xff6ad5 : 0xd4ff3f);
    orbs.forEach((o,i)=>{ o.position.y += Math.sin(t*3+i*2)*.004; });
    cam.position.x += ((mx*1.4)-cam.position.x)*.04;
    cam.position.y += ((-my*1.0)-cam.position.y)*.04;
    cam.lookAt(isMobile?0:.6,0,0);
    renderer.render(scene,cam);
    frames++; const now=performance.now();
    if (now-last>1000){ $('#fps').textContent = frames+' FPS'; frames=0; last=now; }
  })();
})();

/* ============ HERO INTRO + REVEALS ============ */
gsap.registerPlugin(ScrollTrigger);
function heroIntro(){
  gsap.to('.hero .reveal', { opacity:1, y:0, duration:1, stagger:.1, ease:'power3.out' });
  // counters
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count; let s = null;
    const step = ts => { if(!s)s=ts; const k=Math.min(1,(ts-s)/1200); el.textContent=Math.floor(end*(1-Math.pow(1-k,3))); if(k<1)requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}
$$('[data-reveal]').forEach(el => {
  gsap.to(el, { opacity:1, y:0, duration:.9, ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 88%' } });
});
// progress bar
addEventListener('scroll', () => {
  const h = document.documentElement;
  $('#progress').style.width = (h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
}, {passive:true});

/* ============ CLOCK ============ */
setInterval(()=>{ $('#clock').textContent = new Date().toLocaleTimeString('en-GB'); },1000);

/* ============ MODE TOGGLE: coder / gamer ============ */
$('#mode-toggle').addEventListener('click', () => {
  const html = document.documentElement;
  const gamer = html.dataset.mode !== 'gamer';
  html.dataset.mode = gamer ? 'gamer' : 'coder';
  $('#mode-label').textContent = gamer ? 'GAMER / DAY' : 'CODER / NIGHT';
  $('#status-text').textContent = gamer ? 'gamer by day' : 'sleep deprived';
  toast(gamer ? '🎮 GAMER MODE ENGAGED — rgb everything' : '💻 CODER MODE — back to the void');
});

/* ============ CUSTOM CURSOR + MAGNETIC ============ */
(() => {
  const dot=$('#cursor-dot'), ring=$('#cursor-ring'), label=$('#cursor-label');
  let x=0,y=0,rx=0,ry=0;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px';});
  (function f(){ rx+=(x-rx)*.16; ry+=(y-ry)*.16; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(f); })();
  document.addEventListener('mouseover',e=>{
    const t=e.target.closest('[data-hover]');
    if(t){ ring.classList.add('hovering'); label.textContent=t.dataset.hover; }
    else{ ring.classList.remove('hovering'); label.textContent=''; }
  });
  $$('.magnetic').forEach(el=>{
    el.addEventListener('mousemove',e=>{ const r=el.getBoundingClientRect();
      el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`; });
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
  // tilt cards
  $$('.tilt').forEach(el=>{
    el.addEventListener('mousemove',e=>{ const r=el.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(900px) rotateY(${px*10}deg) rotateX(${-py*10}deg)`; });
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
})();

/* ============ HERO TERMINAL TYPING ============ */
(() => {
  const el = $('#term-typing');
  const script = [
    ['c','$ whoami',''],
    ['w','fastdemo — fastcode',''],
    ['c','# gamer by day, coder by night :3',''],
    ['c','$ cat stack.json',''],
    ['y','{ langs: [python, lua, c, ts, js, swift],',''],
    ['y','  ships: [apps, sites, extensions, games] }',''],
    ['c','$ ./build_break_fix --repeat ∞',''],
    ['p','✓ 6 repos shipped · 0 sleep acquired',''],
  ];
  let li=0, ci=0, html='';
  function tick(){
    if(li>=script.length){ el.innerHTML=html+'<span class="caret"></span>'; return; }
    const [cls,full] = [script[li][0], script[li][1]];
    ci++;
    el.innerHTML = html + `<span class="${cls}">${full.slice(0,ci)}</span><span class="caret"></span>`;
    if(ci>=full.length){ html+=`<span class="${cls}">${full}</span>\n`; li++; ci=0; setTimeout(tick, 320); }
    else setTimeout(tick, 18+Math.random()*30);
  }
  setTimeout(tick, 600);
})();
$('#terminal-btn').addEventListener('click',()=>{ $('#cli-in').focus(); $('#lab').scrollIntoView({behavior:'smooth'}); toast('terminal online — try "help"'); });

/* ============ PROJECTS ============ */
async function liveStars(){
  try{
    const r = await fetch('https://api.github.com/users/fastdemo/repos?per_page=100');
    if(!r.ok) throw 0;
    const data = await r.json();
    const map = {}; data.forEach(x=>map[x.name]=x.stargazers_count);
    PROJECTS.forEach(p=>{ if(map[p.name]!=null) p.stars=map[p.name]; });
    renderProjects($('#projects').dataset.f||'all');
    $('#foot-stars').textContent = data.length;
  }catch(e){ /* offline: keep fallback */ }
}
function renderProjects(filter='all'){
  const box = $('#projects'); box.dataset.f = filter;
  box.innerHTML = PROJECTS.filter(p=>filter==='all'||p.lang===filter).map((p,i)=>`
    <article class="proj" style="--pc:${p.color}">
      <div class="proj-num">0${i+1}</div>
      <div>
        <h3>${p.name} ${p.pinned?'<span class="pin">★ pinned</span>':''} ${p.fresh?'<span class="pin" style="color:#7dff6a;border-color:#2c4a22">● fresh</span>':''}</h3>
        <p class="desc">${p.desc}</p>
        <div class="proj-meta">
          <span class="pill lang">${p.lang}</span>
          <span class="pill stars">★ ${p.stars}</span>
          ${p.topics.map(t=>`<span class="pill">#${t}</span>`).join('')}
        </div>
      </div>
      <div class="proj-links">
        <a class="go" href="${p.url}" target="_blank" rel="noopener">OPEN ↗</a>
        <a href="${p.url}/stargazers" target="_blank" rel="noopener">STAR ★</a>
      </div>
      <div class="proj-bar"></div>
    </article>`).join('');
  gsap.fromTo('.proj',{opacity:0,x:-30},{opacity:1,x:0,duration:.5,stagger:.08,ease:'power2.out'});
}
$$('.filters button').forEach(b=>b.addEventListener('click',()=>{
  $$('.filters button').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  renderProjects(b.dataset.filter);
}));
renderProjects(); liveStars();

/* ============ FAKE CLI ============ */
(() => {
  const out = $('#cli-out'), inp = $('#cli-in');
  const print = (h,cls='') => { const d=document.createElement('div'); if(cls)d.className=cls; d.innerHTML=h; out.appendChild(d); out.scrollTop=out.scrollHeight; };
  print('fastdemo.os v3.0 — type <b>help</b> to begin.','inf');
  const cmds = {
    help:()=>print('commands: whoami · ls · stack · open [repo] · stars · sleep · sudo fix-sleep · cat rain · gamer · hire','ok'),
    whoami:()=>print('fastdemo (fastcode) — gamer by day, coder by night 😴 :3'),
    ls:()=>print(PROJECTS.map(p=>`<span class="ok">${p.name}/</span>`).join('  ')),
    stack:()=>print('python · lua · c · typescript · javascript · swift · html · css'),
    stars:()=>print('total flex: ★ '+PROJECTS.reduce((a,p)=>a+p.stars,0)+' across '+PROJECTS.length+' repos — <a style="color:var(--lime)" href="https://github.com/fastdemo?tab=repositories" target="_blank">verify ↗</a>'),
    sleep:()=>print('error: sleep not found. did you mean <b>ship</b>?','err'),
    hire:()=>print('📬 transmission open — scroll to contact or press <b>g</b> for github.','ok'),
    gamer:()=>{ $('#mode-toggle').click(); },
  };
  const names = ()=>PROJECTS.map(p=>p.name).join(', ');
  inp.addEventListener('keydown',e=>{
    if(e.key!=='Enter')return;
    const raw=inp.value.trim(); inp.value='';
    print(`<span style="color:var(--dim)">$</span> ${raw}`);
    if(!raw)return;
    const [c,...rest]=raw.toLowerCase().split(/\s+/);
    if(c==='clear'){out.innerHTML='';return;}
    if(c==='open'){ const p=PROJECTS.find(x=>x.name===rest.join('')); p?(print(`opening ${p.name}... ↗`,'ok'),open(p.url,'_blank')):print(`repo not found. try: ${names()}`,'err'); return; }
    if(c==='sudo'&&rest.join(' ').includes('fix-sleep')){ print('installing 8h of sleep... ██████ 100% — just kidding. ship something instead 😴','ok'); return; }
    if(c==='cat'&&rest[0]==='rain'){ catRain(); print('cats deployed. you\'re welcome.','ok'); return; }
    if(c==='rm'&&rest.join(' ').includes('-rf')){ print('nice try. the void protects itself.','err'); return; }
    (cmds[c]||(()=>print(`command not found: ${c} — try help`,'err')))();
  });
})();

/* ============ PERSONA MINI DEMO ============ */
(() => {
  const lines = {
    morgana:['MORGANA','Looks like we\'ve got a visitor! This whole portfolio... it\'s another Palace of productivity! I\'m Mona, by the way!'],
    joker:['JOKER','... Quiet. Minimal. Dangerous. This developer ships extensions like Personas — collect them all.'],
    fastdemo:['FASTDEMO','heyhey! i made this dialogue box generator. now go star the repo, for real. :3'],
    random:null,
  };
  const faces={morgana:'🐱',joker:'🎭',fastdemo:'😴'};
  const box=$('#persona-box'),line=$('#persona-line'),nm=$('#persona-name'),fc=$('#persona-face');
  let ci=0,full='',tm=null;
  function say(k){
    if(k==='random'){ const ks=['morgana','joker','fastdemo']; k=ks[Math.floor(Math.random()*3)]; }
    const [n,t]=lines[k]; nm.textContent=n; fc.textContent=faces[k];
    clearInterval(tm); ci=0; full=t;
    gsap.fromTo(box,{x:-4},{x:0,duration:.3,ease:'elastic.out(1,.4)'});
    tm=setInterval(()=>{ line.textContent=full.slice(0,++ci); if(ci>=full.length)clearInterval(tm); },22);
  }
  $$('.persona-controls button').forEach(b=>b.addEventListener('click',()=>say(b.dataset.say)));
  box.addEventListener('click',()=>{ line.textContent=full; clearInterval(tm); });
  say('morgana');
})();

/* ============ COMMAND PALETTE (⌘K) ============ */
(() => {
  const bg=$('#palette-bg'),pal=$('#palette'),inp=$('#palette-in'),list=$('#palette-list');
  const items=[
    ...PROJECTS.map(p=>({t:'open '+p.name,s:'repo → github',fn:()=>open(p.url,'_blank')})),
    {t:'go to work',s:'section',fn:()=>go('#work')},{t:'go to about',s:'section',fn:()=>go('#about')},
    {t:'go to arsenal',s:'section',fn:()=>go('#stack')},{t:'go to lab',s:'section',fn:()=>go('#lab')},
    {t:'go to contact',s:'section',fn:()=>go('#contact')},
    {t:'toggle gamer mode',s:'easter egg',fn:()=>$('#mode-toggle').click()},
    {t:'cat rain',s:'easter egg',fn:catRain},
    {t:'visit github @fastdemo',s:'external',fn:()=>open('https://github.com/fastdemo','_blank')},
    {t:'copy email',s:'action',fn:copyEmail},
  ];
  let sel=0,shown=items;
  const go=s=>{const el=$(s); lenis?lenis.scrollTo(el,{offset:-80}):el.scrollIntoView({behavior:'smooth'});};
  function draw(){
    list.innerHTML=shown.map((x,i)=>`<div class="pal-item ${i===sel?'sel':''}"><span>${x.t}</span><small>${x.s}</small></div>`).join('')||'<div class="pal-item"><span>no match. the void stares back.</span></div>';
    [...list.children].forEach((el,i)=>el.onclick=()=>{close();shown[i]&&shown[i].fn();});
  }
  function openPal(){bg.classList.add('open');pal.classList.add('open');inp.value='';shown=items;sel=0;draw();setTimeout(()=>inp.focus(),50);}
  function close(){bg.classList.remove('open');pal.classList.remove('open');}
  addEventListener('keydown',e=>{
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();pal.classList.contains('open')?close():openPal();}
    if(e.key==='Escape')close();
    if(pal.classList.contains('open')){
      if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(shown.length-1,sel+1);draw();}
      if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,sel-1);draw();}
      if(e.key==='Enter'&&shown[sel]){close();shown[sel].fn();}
    }
  });
  inp.addEventListener('input',()=>{const q=inp.value.toLowerCase();shown=items.filter(x=>x.t.includes(q));sel=0;draw();});
  bg.addEventListener('click',close); draw();
})();

/* ============ CAT RAIN + COPY EMAIL + MENU ============ */
function catRain(n=24){
  const layer=$('#cat-layer'); const cats=['🐱','😻','🙀','🐈','🐈‍⬛',':3'];
  for(let i=0;i<n;i++){ const s=document.createElement('span'); s.className='cat';
    s.textContent=cats[Math.floor(Math.random()*cats.length)];
    s.style.left=Math.random()*100+'vw'; s.style.animationDuration=(2+Math.random()*2.5)+'s';
    s.style.fontSize=(1+Math.random()*2)+'rem'; layer.appendChild(s);
    setTimeout(()=>s.remove(),5500); }
}
function copyEmail(){ navigator.clipboard?.writeText('hello@fastdemo.dev').then(()=>toast('📋 hello@fastdemo.dev copied — say heyhey!')).catch(()=>toast('📋 hello@fastdemo.dev — say heyhey!')); }
$('#copy-email').addEventListener('click',copyEmail);
$('#menu-btn').addEventListener('click',()=>$('#mobile-menu').classList.toggle('open'));
addEventListener('keydown',e=>{ if(e.key.toLowerCase()==='g'&&document.activeElement.tagName!=='INPUT')open('https://github.com/fastdemo','_blank'); });
setTimeout(()=>{ if(!sessionStorage.seen){ toast('psst — press ⌘K. trust me.'); sessionStorage.seen=1; } },7000);
