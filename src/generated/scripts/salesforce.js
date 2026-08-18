;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"lead": "Salesforce is only as powerful as its implementation. AIM configures, customizes, and integrates Salesforce so your teams work from one customer view and your CRM drives real growth.", "cta1": "Talk to our team", "cta2": "See what we do", "cap.eb": "What Salesforce unlocks", "cap.h2": "One platform, end to end.", "off.h2": "How AIM delivers Salesforce", "end.eb": "Let's talk", "end.h2": "Get more from Salesforce.", "end.p": "From setup to deep customization, AIM turns Salesforce into a growth engine your teams actually use.", "end.b2": "Explore App Development"}, "fr": {"lead": "Salesforce ne vaut que par son implémentation. AIM configure, personnalise et intègre Salesforce pour une vue client unique.", "cta1": "Parler à notre équipe", "cta2": "Voir nos services", "cap.eb": "Ce que Salesforce permet", "cap.h2": "Une plateforme, de bout en bout.", "off.h2": "How AIM delivers Salesforce", "end.eb": "Parlons-en", "end.h2": "Tirez plus de Salesforce.", "end.p": "From setup to deep customization, AIM turns Salesforce into a growth engine your teams actually use.", "end.b2": "Explore App Development"}};
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