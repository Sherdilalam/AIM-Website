;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"eb": "Automation & Performance Testing", "h1": "Test everything, every time, fast.", "lead": "Manual testing cannot keep pace with modern delivery. AIM builds automated test suites that run on every change, and performance tests that prove your systems hold up under real-world load before your users do.", "cta1": "Connect with us", "cta2": "See our approach", "s1": "Regression suites", "s2": "Real-world scale", "s3": "Every commit", "pill.eb": "What we deliver", "pill.h2": "Automate quality and prove performance.", "p1": "Test Automation", "p2": "Performance Testing", "p3": "Reporting & Insight", "why.eb": "Why AIM", "why.h2": "Speed and scale, proven.", "step.eb": "Our approach", "step.h2": "Assess. Automate. Load-test. Optimize.", "end.eb": "Get started", "end.h2": "Move fast, stay reliable.", "end.p": "From your first automation framework to enterprise performance engineering, AIM builds the testing speed and confidence modern delivery demands.", "end.b2": "Back to Quality Engineering"}, "fr": {"eb": "Tests d’automatisation et de performance", "h1": "Tout tester, à chaque fois, rapidement.", "lead": "Nous bâtissons des suites automatisées et des tests de performance qui prouvent la tenue sous charge réelle.", "cta1": "Contactez-nous", "cta2": "Notre approche", "pill.eb": "Ce que nous livrons", "pill.h2": "Automate quality and prove performance.", "p1": "Automatisation des tests", "p2": "Tests de performance", "p3": "Rapports et analyses", "why.eb": "Pourquoi AIM", "why.h2": "Vitesse et échelle, prouvées.", "step.eb": "Notre approche", "step.h2": "Assess. Automate. Load-test. Optimize.", "end.eb": "Commencer", "end.h2": "Avancez vite, restez fiable.", "end.p": "From your first automation framework to enterprise performance engineering, AIM builds the testing speed and confidence modern delivery demands.", "end.b2": "Retour à l’ingénierie qualité"}};
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