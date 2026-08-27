;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  if(!rm) b.classList.add('qa-go');
  var TR={
    en:{'eb':'AIM Services','lead':'Ship with confidence. AIM builds quality into every stage - functional, automation, performance, and continuous testing - so defects surface early, releases stay fast, and your users never feel the bugs.','cta1':'Connect with us','cta2':'Explore services','pyr.eb':'How we structure testing','pyr.h2':'A balanced test strategy.','out.eb':'Service outcomes','out.h2':'What you can expect.','sub.eb':'Explore our QA services','sub.h2':'Dive deeper into specific capabilities.','end.eb':'Ready to raise the bar?','end.h2':'Quality that keeps up with velocity.','end.p':'From a first automation suite to a full continuous-testing practice, AIM builds quality engineering that lets you move fast without breaking things.','end.b2':'See App Development'},
    fr:{'eb':'Services AIM','lead':'Livrez en toute confiance. AIM intègre la qualité à chaque étape - tests fonctionnels, automatisés, de performance et continus.','cta1':'Contactez-nous','cta2':'Explorer les services','pyr.eb':'Comment nous structurons les tests','pyr.h2':'Une stratégie de test équilibrée.','out.eb':'Résultats attendus','out.h2':'Ce que vous pouvez attendre.','sub.eb':'Explorez nos services AQ','sub.h2':'Approfondissez des capacités spécifiques.','end.eb':'Prêt à hausser la barre?','end.h2':'Une qualité au rythme de la vélocité.','end.p':'D\u2019une première suite d\u2019automatisation à une pratique complète de tests continus, AIM bâtit l\u2019ingénierie qualité.','end.b2':'Voir le développement d\u2019applications'}
  };
  var MAP=[['eb','.qa-hero .eyebrow'],['lead','.qa-hero .lead'],['cta1','.qa-hero .btn-primary'],['cta2','.qa-hero .btn-ghost'],['pyr.eb','#qa-pyr-head .eyebrow'],['pyr.h2','#qa-pyr-head .heading'],['out.eb','#qa-out-head .eyebrow'],['out.h2','#qa-out-head .heading'],['sub.eb','#qa-sub-head .eyebrow'],['sub.h2','#qa-sub-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.p','.sa-cta p'],['end.b2','.sa-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var t0=gsap.timeline({delay:.15});
    t0.from('.qa-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.qa-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.25')
      .from('.qa-hero .lead',{opacity:0,y:18,duration:.55,ease:'power3.out'},'-=.3')
      .from('.qa-badges span',{opacity:0,y:12,stagger:.06,duration:.4,ease:'power3.out'},'-=.25')
      .from('.qa-hero .btn-row',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.2')
      .from('.qa-term',{opacity:0,x:40,duration:.8,ease:'power3.out'},'-=.6');
    d.querySelectorAll('.qa-gate').forEach(function(s,i){gsap.fromTo(s,{opacity:0,y:22},{opacity:1,y:0,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 92%',once:true}});});
    d.querySelectorAll('.qa-tier').forEach(function(s,i){gsap.fromTo(s,{opacity:0,scale:.9},{opacity:1,scale:1,duration:.5,delay:i*.12,ease:'back.out(1.4)',scrollTrigger:{trigger:'.qa-pyr',start:'top 85%',once:true}});});
    d.querySelectorAll('.qa-out').forEach(function(o,i){gsap.fromTo(o,{opacity:0,y:20},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 92%',once:true}});});
    d.querySelectorAll('.qa-sub').forEach(function(s,i){gsap.fromTo(s,{opacity:0,y:22},{opacity:1,y:0,duration:.45,delay:(i%2)*.08,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 92%',once:true}});});
    gsap.fromTo('.sa-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 88%',once:true}});
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
  } else {
    ['.qa-gate','.qa-tier','.qa-out','.qa-sub','.sa-cta','.qa-term'].forEach(function(sel){d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});});
  }
  bind(d.querySelectorAll('.qa-gate,.qa-tier,.qa-out,.qa-sub,a,button'));
  mag(d.querySelectorAll('.btn'));
});

})();