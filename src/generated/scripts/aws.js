;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"lead": "AWS offers the broadest cloud platform in the world - the challenge is using it well. AIM architects, migrates, and manages AWS environments that are secure, resilient, and cost-optimized for how your business actually runs.", "cta1": "Talk to our team", "cta2": "See what we do", "cap.eb": "What AWS unlocks", "cap.h2": "One platform, end to end.", "off.h2": "How AIM delivers on AWS", "end.eb": "Let's talk", "end.h2": "Get more from AWS.", "end.p": "Migrating, modernizing, or optimizing - AIM helps you build securely and spend wisely on AWS.", "end.b2": "Explore Cloud services"}, "fr": {"lead": "AWS offre la plateforme infonuagique la plus vaste au monde. AIM conçoit, migre et gère des environnements AWS sécurisés et optimisés.", "cta1": "Parler à notre équipe", "cta2": "Voir nos services", "cap.eb": "Ce que AWS permet", "cap.h2": "Une plateforme, de bout en bout.", "off.h2": "How AIM delivers on AWS", "end.eb": "Parlons-en", "end.h2": "Tirez plus d’AWS.", "end.p": "Migrating, modernizing, or optimizing - AIM helps you build securely and spend wisely on AWS.", "end.b2": "Explore Cloud services"}};
  var MAP=[['lead','.pf-hero .lead'],['cta1','.pf-hero .btn-primary'],['cta2','.pf-hero .btn-ghost'],['cap.eb','#pf-cap-head .eyebrow'],['cap.h2','#pf-cap-head .heading'],['off.h2','.pf-off h2'],['end.eb','.pf-cta .eyebrow'],['end.h2','.pf-cta .heading'],['end.p','.pf-cta p'],['end.b2','.pf-cta .btn-ghost']];
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
    gsap.fromTo('.pf-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.pf-cta',start:'top 88%',once:true}});
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
  } else {
    ['.pf-cap','.pf-off','.pf-m','.pf-cta','.pf-tile'].forEach(function(sel){d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});});
  }
  bind(d.querySelectorAll('.pf-cap,.pf-off-media,.pf-m,.pf-tile,a'));
  mag(d.querySelectorAll('.btn'));
});

})();
/*__AIM_BLOCK__*/
;(function(){

$(".tab-button").click(function(e) { 
  e.preventDefault();
  $(".tab-button").removeClass("tab-button-active");
  $(".w-tab-link:contains(" + e.target.innerText + ")").click();
  $(e.target).addClass("tab-button-active");
})

})();