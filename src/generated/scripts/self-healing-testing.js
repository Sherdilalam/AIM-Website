;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"eb": "Self-Healing Test Automation Frameworks", "h1": "Automation that fixes itself.", "lead": "Traditional automation breaks the moment the UI changes - and maintenance eats the savings. AIM builds self-healing frameworks that detect and adapt to change automatically, keeping suites green and maintenance low.", "cta1": "Connect with us", "cta2": "See our approach", "s1": "Locator strategies", "s2": "Maintenance cost", "s3": "To UI change", "pill.eb": "What we deliver", "pill.h2": "Resilient automation by design.", "p1": "Self-Healing Architecture", "p2": "Framework Engineering", "p3": "Sustainability", "why.eb": "Why AIM", "why.h2": "Automation that survives change.", "step.eb": "Our approach", "step.h2": "Design. Build. Stabilize. Sustain.", "end.eb": "Get started", "end.h2": "Stop rebuilding broken tests.", "end.p": "If test maintenance is eating your automation ROI, AIM builds self-healing frameworks that keep suites reliable and your team focused on shipping.", "end.b2": "Back to Quality Engineering"}, "fr": {"eb": "Cadres d’automatisation auto-réparateurs", "h1": "Une automatisation qui se répare seule.", "lead": "Nous bâtissons des cadres auto-réparateurs qui s’adaptent aux changements d’interface automatiquement.", "cta1": "Contactez-nous", "cta2": "Notre approche", "pill.eb": "Ce que nous livrons", "pill.h2": "Resilient automation by design.", "p1": "Architecture auto-réparatrice", "p2": "Ingénierie de cadre", "p3": "Durabilité", "why.eb": "Pourquoi AIM", "why.h2": "Une automatisation qui survit au changement.", "step.eb": "Notre approche", "step.h2": "Design. Build. Stabilize. Sustain.", "end.eb": "Commencer", "end.h2": "Cessez de reconstruire des tests brisés.", "end.p": "If test maintenance is eating your automation ROI, AIM builds self-healing frameworks that keep suites reliable and your team focused on shipping.", "end.b2": "Retour à l’ingénierie qualité"}};
  var MAP=[['eb','.sa-hero .eyebrow'],['h1','.sa-hero .h1'],['lead','.sa-hero .lead'],['cta1','.sa-hero .btn-primary'],['cta2','.sa-hero .btn-ghost'],['s1','.sa-stat:nth-child(1) .l'],['s2','.sa-stat:nth-child(2) .l'],['s3','.sa-stat:nth-child(3) .l'],['pill.eb','#sa-pill-head .eyebrow'],['pill.h2','#sa-pill-head .heading'],['p1','.sa-pillar:nth-child(1) h3'],['p2','.sa-pillar:nth-child(2) h3'],['p3','.sa-pillar:nth-child(3) h3'],['why.eb','#sa-why-head .eyebrow'],['why.h2','#sa-why-head .heading'],['step.eb','#sa-step-head .eyebrow'],['step.h2','#sa-step-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.p','.sa-cta p'],['end.b2','.sa-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});
    tl.from('.sa-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.sa-hero .h1',{opacity:0,y:28,duration:.75,ease:'power3.out'},'-=.25')
      .from('.sa-hero .lead',{opacity:0,y:18,duration:.55,ease:'power3.out'},'-=.3')
      .from('.sa-stat',{opacity:0,y:16,stagger:.1,duration:.45,ease:'power3.out'},'-=.25')
      .from('.sa-hero .btn-row',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.2')
      .from('.sa-visual',{opacity:0,x:50,duration:.85,ease:'power3.out'},'-=.7');
    d.querySelectorAll('.sa-pillar').forEach(function(p,i){gsap.from(p,{opacity:0,y:26,duration:.5,delay:(i%3)*.1,ease:'power3.out',scrollTrigger:{trigger:p,start:'top 88%',once:true}});});
    d.querySelectorAll('.sa-why-card').forEach(function(c,i){gsap.from(c,{opacity:0,y:22,duration:.5,delay:(i%2)*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
    d.querySelectorAll('.sa-step').forEach(function(s,i){gsap.from(s,{opacity:0,y:24,duration:.5,delay:(i%4)*.09,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 90%',once:true}});});
    gsap.from('.sa-cta',{opacity:0,y:28,scale:.985,duration:.65,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 85%',once:true}});
  }
  bind(d.querySelectorAll('.sa-pillar,.sa-why-card,.sa-step,a'));
  mag(d.querySelectorAll('.btn'));
});

})();