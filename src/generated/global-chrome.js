/* Auto-generated: global chrome scripts shared across pages (run once). */
;(function(){

/* apply body classes + language immediately (no flash) */
(function(){
  var b=document.body;
  if(!b) return;
  b.classList.add('aim');
  if(!b.classList.contains('t-light') && !b.classList.contains('t-dark')) b.classList.add('t-light');
  /* language: check saved pref */
  var saved=null;
  try{ saved=localStorage.getItem('aim-lang'); }catch(e){}
  if(saved==='fr'||saved==='en'){
    b.setAttribute('data-lang',saved);
  }
})();
/* everything else waits for full page load */
window.addEventListener('load',function(){
  var d=document, b=d.body;
  if(!b) return;
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse=window.matchMedia('(pointer: coarse)').matches||window.matchMedia('(hover: none)').matches;
  /* ===== LANGUAGE ENGINE ===== */
  var currentLang=b.getAttribute('data-lang')||'en';
  function setLang(lang){
    currentLang=lang;
    b.setAttribute('data-lang',lang);
    try{localStorage.setItem('aim-lang',lang);}catch(e){}
    /* update toggle label (shows the OTHER language) */
    var lbl=d.getElementById('langLabel');
    if(lbl) lbl.textContent=lang==='en'?'FR':'EN';
    /* translate all [data-i18n] elements */
    d.querySelectorAll('[data-i18n]').forEach(function(el){
      var key=el.getAttribute('data-i18n');
      var dict=window.aimI18n;
      if(dict && dict[key] && dict[key][lang]){
        if(el.hasAttribute('data-i18n-html')){
          el.innerHTML=dict[key][lang];
        } else {
          el.textContent=dict[key][lang];
        }
      }
    });
    /* notify page scripts to re-render JS-generated content */
    window.dispatchEvent(new CustomEvent('aim-lang-change',{detail:{lang:lang}}));
  }
  window.aimSetLang=setLang;
  window.aimGetLang=function(){return currentLang;};
  /* geo-detection (first visit only) */
  var hasSaved=false;
  try{hasSaved=!!localStorage.getItem('aim-lang');}catch(e){}
  if(!hasSaved){
    fetch('https://ipapi.co/json/',{signal:AbortSignal.timeout(3000)})
      .then(function(r){return r.json();})
      .then(function(d){
        if(d.country_code==='CA' && d.region_code==='QC'){
          setLang('fr');
        } else {
          setLang('en');
        }
      })
      .catch(function(){ setLang('en'); });
  } else {
    setLang(currentLang);
  }
    /* nav + footer translations */
    var navT={
      'nav.home':{en:'Home',fr:'Accueil'},
      'nav.about':{en:'About Us',fr:'À propos'},
      'nav.products':{en:'Products',fr:'Produits'},
      'nav.services':{en:'Services',fr:'Services'},
      'nav.industries':{en:'Industries',fr:'Industries'},
      'nav.platforms':{en:'Platforms',fr:'Plateformes'},
      'nav.support':{en:'Support',fr:'Soutien'},
      'nav.careers':{en:'Careers',fr:'Carrières'},
      'nav.cta':{en:'Connect with Us',fr:'Contactez-nous'}
    };
    window.aimI18n=window.aimI18n||{};
    Object.assign(window.aimI18n,navT);
  /* language toggle click */
  var lt=d.getElementById('langToggle');
  if(lt) lt.addEventListener('click',function(){
    setLang(currentLang==='en'?'fr':'en');
  });
  /* ===== CUSTOM CURSOR (no GSAP dependency) ===== */
  var cur=null;
  if(!coarse){
    cur=d.createElement('div'); cur.className='aim-cursor'; cur.style.opacity='0'; b.appendChild(cur);
    var cx=0,cy=0,tx=0,ty=0,raf=null;
    function lerp(a,b,t){return a+(b-a)*t;}
    function tick(){cx=lerp(cx,tx,rm?1:0.18);cy=lerp(cy,ty,rm?1:0.18);cur.style.transform='translate('+(cx-18)+'px,'+(cy-18)+'px)';raf=requestAnimationFrame(tick);}
    window.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!raf){cx=tx;cy=ty;cur.style.transform='translate('+(cx-cur.offsetWidth/2)+'px,'+(cy-cur.offsetHeight/2)+'px)';cur.style.opacity='';raf=requestAnimationFrame(tick);}});
    d.addEventListener('mouseleave',function(){cur.classList.add('hide');});
    d.addEventListener('mouseenter',function(){cur.classList.remove('hide');});
    d.addEventListener('mousedown',function(){cur.classList.add('down');});
    d.addEventListener('mouseup',function(){cur.classList.remove('down');});
  }
  /* Hide cursor over iframes and maps */
  d.querySelectorAll('iframe,.ct-map,[data-nocursor]').forEach(function(el){
    el.addEventListener('mouseenter',function(){if(cur)cur.classList.add('hide');});
    el.addEventListener('mouseleave',function(){if(cur)cur.classList.remove('hide');});
  });
  window.aimBindCursor=function(els){ if(coarse||!cur) return; els.forEach(function(el){ el.addEventListener('mouseenter',function(){cur.classList.add('hover');}); el.addEventListener('mouseleave',function(){cur.classList.remove('hover');}); }); };
  /* Magnetic snap for buttons and key interactive elements */
  window.aimBindMagnetic=function(els){ if(coarse||!cur) return; els.forEach(function(el){
    el.setAttribute('data-magnetic','');
    el.addEventListener('mouseenter',function(){magEl=el;magRect=el.getBoundingClientRect();cur.classList.add('magnetic');cur.classList.remove('hover');});
    el.addEventListener('mousemove',function(){magRect=el.getBoundingClientRect();});
    el.addEventListener('mouseleave',function(){magEl=null;magRect=null;el.style.transform='';cur.classList.remove('magnetic');});
  }); };
  window.aimBindCursor(d.querySelectorAll('a, .cap-tab, .ind, .val, .lg, .cs-btn'));
  window.aimBindMagnetic(d.querySelectorAll('.btn, .burger, .navcta'));
  /* ===== NAV ===== */
  var nav=d.getElementById('nav');
  if(nav){
    window.addEventListener('scroll',function(){ nav.classList.toggle('scrolled', window.scrollY>30); },{passive:true});
    var burger=d.getElementById('burger');
    if(burger) burger.addEventListener('click',function(){ nav.classList.toggle('open'); });
    d.querySelectorAll('.has-dd > a').forEach(function(a){ a.addEventListener('click',function(e){ if(window.matchMedia('(max-width:1080px)').matches){ e.preventDefault(); a.parentElement.classList.toggle('open'); } }); });
    nav.querySelectorAll('a[href="#"]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); }); });
  }
  /* ===== THEME TOGGLE ===== */
  var tg=d.getElementById('themeToggle');
  if(tg) tg.addEventListener('click',function(){
    if(b.classList.contains('t-dark')){ b.classList.remove('t-dark'); b.classList.add('t-light'); try{sessionStorage.setItem('aim-theme','light');}catch(e){} }
    else { b.classList.remove('t-light'); b.classList.add('t-dark'); try{sessionStorage.setItem('aim-theme','dark');}catch(e){} }
  });
  /* ===== SCROLL REVEALS ===== */
  var revels=d.querySelectorAll('.reveal');
  if(window.gsap && window.ScrollTrigger && !rm && revels.length){
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(revels,{opacity:0,y:48});
    revels.forEach(function(el){ gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}}); });
  } else { revels.forEach(function(el){ el.style.opacity='1'; }); }
  /* ===== STAT COUNTERS ===== */
  var dn=false; function run(){ if(dn)return; dn=true; d.querySelectorAll('.count').forEach(function(el){ var to=+el.dataset.to,st=null,du=1500; function step(t){ if(!st)st=t; var p=Math.min((t-st)/du,1); el.textContent=Math.floor(p*to); if(p<1)requestAnimationFrame(step); else el.textContent=to; } requestAnimationFrame(step); }); }
  var sg=d.querySelector('.stat-grid');
  if(sg && 'IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) run(); }); },{threshold:.4}); io.observe(sg); } else if(sg){ run(); }
  /* ===== MAGNETIC BUTTONS ===== */
  /* Magnetic buttons handled by aimBindMagnetic */
});

})();