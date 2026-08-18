;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={
    en:{'lead':'Azure gives you enterprise-grade compute, data, and AI - but the value is in how it is architected and run. AIM designs, migrates, and manages Azure environments that are secure, cost-optimized, and built to scale with your business.','cta1':'Talk to our Azure team','cta2':'See what we do','cap.eb':'What Azure unlocks','cap.h2':'One platform, end to end.','off.h2':'How AIM delivers on Azure','end.eb':"Let's build on Azure",'end.h2':'Get more from your Azure investment.','end.p':'Whether you are migrating, modernizing, or optimizing, AIM\u2019s certified Azure team helps you build securely, run reliably, and spend wisely.','end.b2':'Explore Cloud services'},
    fr:{'lead':'Azure offre calcul, données et IA de niveau entreprise - mais la valeur réside dans l\u2019architecture et l\u2019exploitation. AIM conçoit, migre et gère des environnements Azure sécurisés et optimisés.','cta1':'Parler à notre équipe Azure','cta2':'Voir nos services','cap.eb':'Ce qu\u2019Azure permet','cap.h2':'Une plateforme, de bout en bout.','off.h2':'Comment AIM livre sur Azure','end.eb':'Bâtissons sur Azure','end.h2':'Tirez plus de votre investissement Azure.','end.p':'Migration, modernisation ou optimisation : l\u2019équipe Azure certifiée d\u2019AIM vous aide à bâtir en sécurité et à dépenser intelligemment.','end.b2':'Explorer les services infonuagiques'}
  };
  var MAP=[['lead','.pf-hero .lead'],['cta1','.pf-hero .btn-primary'],['cta2','.pf-hero .btn-ghost'],['cap.eb','#pf-cap-head .eyebrow'],['cap.h2','#pf-cap-head .heading'],['off.h2','.pf-off h2'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.p','.sa-cta p'],['end.b2','.sa-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var t0=gsap.timeline({delay:.15});
    t0.from('.pf-logo-chip',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.pf-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.2')
      .from('.pf-hero .lead',{opacity:0,y:18,duration:.55,ease:'power3.out'},'-=.35')
      .from('.pf-partner',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.3')
      .from('.pf-hero .btn-row',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.25')
      .from('.pf-tile',{opacity:0,y:24,stagger:.12,duration:.6,ease:'power3.out'},'-=.5');
    d.querySelectorAll('.pf-cap').forEach(function(c,i){gsap.fromTo(c,{opacity:0,y:24},{opacity:1,y:0,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 92%',once:true}});});
    gsap.fromTo('.pf-off',{opacity:0,y:26},{opacity:1,y:0,duration:.6,ease:'power3.out',scrollTrigger:{trigger:'.pf-off',start:'top 85%',once:true}});
    d.querySelectorAll('.pf-m').forEach(function(m,i){gsap.fromTo(m,{opacity:0,y:18},{opacity:1,y:0,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:m,start:'top 92%',once:true}});});
    gsap.fromTo('.sa-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 88%',once:true}});
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
  } else {
    ['.pf-cap','.pf-off','.pf-m','.sa-cta','.pf-tile'].forEach(function(sel){d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});});
  }
  bind(d.querySelectorAll('.pf-cap,.pf-off-media,.pf-m,.pf-tile,a'));
  mag(d.querySelectorAll('.btn'));
});

})();