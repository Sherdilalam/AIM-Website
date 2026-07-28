;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"eb": "Application Migration Services", "h1": "Move your apps forward, safely.", "lead": "Aging applications hold the business back. AIM migrates and modernizes applications - to the cloud, to new platforms, or off end-of-life technology - with dependency-mapped plans and rollback-ready execution.", "cta1": "Connect with us", "cta2": "See our approach", "s1": "Migration plans", "s2": "Every move", "s3": "Business disruption", "pill.eb": "What we deliver", "pill.h2": "Assess, plan, migrate.", "p1": "Migration Assessment", "p2": "Platform & Framework Migration", "p3": "Safe Execution", "why.eb": "Why AIM", "why.h2": "Migrations without the drama.", "step.eb": "Our approach", "step.h2": "Assess. Plan. Migrate. Stabilize.", "end.eb": "Get started", "end.h2": "Modernize without the risk.", "end.p": "Whether escaping end-of-life tech, moving to the cloud, or consolidating platforms, AIM migrates your applications safely and predictably.", "end.b2": "Back to Application Development"}, "fr": {"eb": "Services de migration d’applications", "h1": "Faites évoluer vos applications, en toute sécurité.", "lead": "Nous migrons et modernisons vos applications avec des plans cartographiés et une exécution réversible.", "cta1": "Contactez-nous", "cta2": "Notre approche", "pill.eb": "Ce que nous livrons", "pill.h2": "Assess, plan, migrate.", "p1": "Évaluation de la migration", "p2": "Migration de plateforme et de cadre", "p3": "Exécution sécurisée", "why.eb": "Pourquoi AIM", "why.h2": "Des migrations sans drame.", "step.eb": "Notre approche", "step.h2": "Assess. Plan. Migrate. Stabilize.", "end.eb": "Commencer", "end.h2": "Modernisez sans le risque.", "end.p": "Whether escaping end-of-life tech, moving to the cloud, or consolidating platforms, AIM migrates your applications safely and predictably.", "end.b2": "Retour au développement d’applications"}};
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