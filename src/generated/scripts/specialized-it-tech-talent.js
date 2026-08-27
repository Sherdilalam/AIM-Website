;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"eb": "Specialized IT & Tech Talent On-Demand", "h1": "Specialized IT and tech talent, on-demand", "lead": "Solve complex technical work with seasoned professionals in cybersecurity, DevOps, data engineering, and other niche roles. AIM matches you with experts who contribute from day one and raise the ceiling on what your team can ship.", "cta1": "Connect with us", "s1": "Specialized expertise areas", "s2": "Flexible engagement options", "s3": "Onshore, nearshore, offshore", "pill.eb": "What we deliver", "pill.h2": "Deep expertise, matched beyond the resume.", "p1": "Technical & Cloud Specialists", "p2": "Platform & Integration Specialists", "p3": "Engagement Flexibility", "why.eb": "Why AIM", "why.h2": "Talent strategy, not just headcount.", "step.eb": "Our approach", "step.h2": "Define. Source. Match. Govern.", "end.eb": "Get started", "end.h2": "Let's build your next-gen workforce.", "end.p": "AIM delivers strategic capability, not just talent. Whether you're staffing a mission-critical build or extending your innovation bench, our specialized IT and tech talent helps you deliver in complex conditions.", "end.b2": "Back to Talent Augmentation"}, "fr": {"eb": "Talents TI spécialisés à la demande", "h1": "Des talents TI spécialisés, à la demande", "lead": "Résolvez des enjeux techniques complexes avec des professionnels chevronnés en cybersécurité, DevOps, ingénierie des données et autres rôles spécialisés.", "cta1": "Contactez-nous", "pill.eb": "Ce que nous livrons", "pill.h2": "Une expertise approfondie, au-delà du CV.", "p1": "Spécialistes techniques et infonuagiques", "p2": "Spécialistes plateformes et intégration", "p3": "Flexibilité d'engagement", "why.eb": "Pourquoi AIM", "why.h2": "Une stratégie de talent, pas seulement des effectifs.", "step.eb": "Notre approche", "step.h2": "Définir. Trouver. Jumeler. Gérer.", "end.eb": "Commencer", "end.h2": "Bâtissons votre main-d'oeuvre de nouvelle génération.", "end.p": "AIM fournit une capacité stratégique, pas seulement des talents.", "end.b2": "Retour à l'augmentation de talents"}};
  var MAP=[['eb','.sa-hero .eyebrow'],['h1','.sa-hero .h1'],['lead','.sa-hero .lead'],['cta1','.sa-hero .btn-primary'],['s1','.sa-stat:nth-child(1) .l'],['s2','.sa-stat:nth-child(2) .l'],['s3','.sa-stat:nth-child(3) .l'],['pill.eb','#sa-pill-head .eyebrow'],['pill.h2','#sa-pill-head .heading'],['p1','.sa-pillar:nth-child(1) h3'],['p2','.sa-pillar:nth-child(2) h3'],['p3','.sa-pillar:nth-child(3) h3'],['why.eb','#sa-why-head .eyebrow'],['why.h2','#sa-why-head .heading'],['step.eb','#sa-step-head .eyebrow'],['step.h2','#sa-step-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.p','.sa-cta p'],['end.b2','.sa-cta .btn-ghost']];
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