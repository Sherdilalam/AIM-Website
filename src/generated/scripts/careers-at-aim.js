;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  /* BambooHR's careers embed (loaded as a page library, before this script
     runs) waits for a native 'readystatechange' event where
     document.readyState==='complete' before it fetches job data. That
     listener only fires if it was registered before the document reached
     'complete' -- readyState only moves forward, so if this page has already
     finished loading by the time BambooHR's script runs, the transition it's
     waiting for has already happened and will never fire again, leaving the
     jobs list empty with no error. Since this script only runs after
     BambooHR's script has already loaded, nudge it with a synthetic event of
     the same type; its own check for readyState==='complete' still applies,
     so this is a no-op unless the page is genuinely already fully loaded. */
  /* Two different failures, so two different remedies, picked by whether the
     embed has already built its container inside #BambooHR on this mount.

     First visit: embed.js has run and appended its #BambooHR-ATS root, but it
     is waiting on a 'readystatechange' to 'complete' that already fired before
     it loaded. Nudge it (below); its own readyState check still gates the
     fetch, so this is a no-op unless the page really is complete.

     Return visit: loadLibs() caches each library per URL for the whole SPA
     session, so embed.js is never evaluated again -- and it resolves and
     stores its container once, at evaluation time. Those nodes died with the
     previous mount's <main>, so the freshly rendered #BambooHR stays empty and
     the captured root is detached. Re-inject the script so it runs against the
     DOM that exists now. */
  var bhEl=d.getElementById('BambooHR');
  function bhNudge(){ if(d.readyState==='complete'){ try{d.dispatchEvent(new Event('readystatechange'));}catch(e){} } }
  if(bhEl && !bhEl.getAttribute('data-aim-embedding')){
    if(bhEl.children.length===0){
      bhEl.setAttribute('data-aim-embedding','1');
      var bhS=d.createElement('script');
      bhS.src='https://iaim.bamboohr.com/js/embed.js';
      bhS.onload=bhNudge;
      d.head.appendChild(bhS);
    } else {
      bhNudge();
    }
  }
  var TR={
    en:{'eb':'Careers at AIM','lead':"We're a senior-led, globally distributed team building AI, cloud, and data solutions for enterprises across North America. No bureaucracy - just meaningful problems and people who care.",'cta1':'See open roles','cta2':'Life at AIM','val.eb':'What we believe','val.h2':'The values that shape every project.','perk.eb':'Why work at AIM','perk.h2':'Built around real life.','step.eb':'How hiring works','step.h2':'Four steps. No games.','end.eb':'Open roles','end.h2':'Find your next chapter at AIM.','end.btn':'Introduce yourself'},
    fr:{'eb':'Carri\u00e8res chez AIM','lead':"Une \u00e9quipe distribu\u00e9e et dirig\u00e9e par des seniors qui construit des solutions IA, cloud et donn\u00e9es pour les entreprises nord-am\u00e9ricaines.",'cta1':'Voir les postes','cta2':'La vie chez AIM','val.eb':'Nos convictions','val.h2':'Les valeurs qui fa\u00e7onnent chaque projet.','perk.eb':'Pourquoi travailler chez AIM','perk.h2':'Con\u00e7u autour de la vraie vie.','step.eb':'Notre processus d\u2019embauche','step.h2':'Quatre \u00e9tapes. Sans jeux.','end.eb':'Postes ouverts','end.h2':'Trouvez votre prochain chapitre chez AIM.','end.btn':'Pr\u00e9sentez-vous'}
  };
  var MAP=[['eb','.cr2-hero .eyebrow'],['lead','.cr2-hero .lead'],['cta1','.cr2-hero .btn-primary'],['cta2','.cr2-hero .btn-ghost'],['val.eb','#cr2-val-head .eyebrow'],['val.h2','#cr2-val-head .heading'],['perk.eb','#cr2-perk-head .eyebrow'],['perk.h2','#cr2-perk-head .heading'],['step.eb','#cr2-step-head .eyebrow'],['step.h2','#cr2-step-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.btn','.sa-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});
    tl.from('.cr2-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.cr2-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.25')
      .from('.cr2-hero .lead',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3')
      .from('.cr2-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.25')
      .from('.cr2-collage .c1',{opacity:0,x:60,duration:.9,ease:'power3.out'},'-=.7')
      .from('.cr2-collage .c2',{opacity:0,y:50,duration:.8,ease:'power3.out'},'-=.6')
      .from('.cr2-collage .badge',{opacity:0,scale:.7,duration:.5,ease:'back.out(1.7)'},'-=.3');
    d.querySelectorAll('.cr2-val').forEach(function(v,i){gsap.from(v,{opacity:0,y:26,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:v,start:'top 88%',once:true}});});
    d.querySelectorAll('.cr2-perk').forEach(function(p){gsap.from(p,{opacity:0,x:-36,duration:.65,ease:'power3.out',scrollTrigger:{trigger:p,start:'top 86%',once:true}});});
    d.querySelectorAll('.cr2-step').forEach(function(s,i){gsap.from(s,{opacity:0,y:26,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 88%',once:true}});});
    var jobsPanel=d.querySelector('.cr2-jobs-panel');
    if(jobsPanel) gsap.from(jobsPanel,{opacity:0,y:26,duration:.6,ease:'power3.out',scrollTrigger:{trigger:jobsPanel,start:'top 88%',once:true}});
    gsap.from('.sa-cta',{opacity:0,y:30,scale:.98,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 85%',once:true}});
  }
  bind(d.querySelectorAll('.cr2-val,.cr2-step,.cr2-perk,a'));
  mag(d.querySelectorAll('.btn'));
});

})();
/*__AIM_BLOCK__*/
;(function(){
// Initialize Lenis
const lenis = new Lenis({
  wheelMultiplier: 1,
});
// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});
/* BambooHR's job listings load in asynchronously (its own script fetches
   and injects them well after this script runs), growing the page's real
   height by a significant amount well after Lenis has already measured it.
   Lenis's autoResize is on by default and does watch for size changes, but
   its ResizeObserver is attached to document.documentElement's own layout
   box, which does not change when content adds scrollable overflow below
   the fold -- confirmed directly: Lenis's internal scroll limit stayed
   frozen at the page's pre-job-list height while the page's real
   scrollHeight kept growing as jobs loaded in, permanently capping how far
   down the page could be scrolled. Recalculate explicitly whenever the jobs
   container's actual content changes, since that's the one thing on this
   page that grows after Lenis's first measurement. */
var bambooEl = document.getElementById('BambooHR');
if (bambooEl && 'MutationObserver' in window) {
  new MutationObserver(function () {
    lenis.resize();
  }).observe(bambooEl, { childList: true, subtree: true });
}
// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

})();