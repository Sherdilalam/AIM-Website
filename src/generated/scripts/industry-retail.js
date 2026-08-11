;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"eb": "Retail & eCommerce", "h1": "Connected commerce for the modern retailer.", "lead": "Technology that unifies channels, personalizes experiences, and streamlines operations, from eCommerce platforms and analytics to AI-driven personalization and integrated systems.", "cta1": "Connect with us", "cta2": "Explore capabilities", "intro.h": "Meeting customers everywhere they shop.", "intro.p1": "Retail is now omnichannel, data-rich, and intensely competitive. Customers expect seamless, personalized experiences across web, mobile, and store, backed by operations that deliver reliably.", "intro.p2": "AIM helps retailers build and modernize commerce platforms, unify customer and inventory data, and apply AI and analytics to personalize experiences and optimize operations.", "cap.eb": "What we do for retail & eCommerce", "cap.h": "From storefront to supply chain.", "band.eb": "Built to scale", "band.h": "Performance and reliability at peak.", "band.p": "Retail traffic spikes without warning, and downtime costs sales directly. We build scalable, resilient platforms with performance engineering and monitoring, ready for peak seasons and flash demand.", "out.eb": "Outcomes", "out.h": "Outcomes for retail and eCommerce.", "end.eb": "Ready to get started?", "end.h": "Ready to connect your commerce?", "end.p": "Partner with AIM to unify your channels, personalize the experience, and build commerce that scales.", "end.b2": "Explore our services"}, "fr": {"eb": "Commerce de détail et cybercommerce", "h1": "Le commerce connecté pour le détaillant moderne.", "lead": "Une technologie qui unifie les canaux, personnalise les expériences et simplifie les opérations.", "cta1": "Contactez-nous", "cta2": "Explorer les capacités", "intro.h": "Rejoindre les clients partout où ils magasinent.", "intro.p1": "Retail is now omnichannel, data-rich, and intensely competitive. Customers expect seamless, personalized experiences across web, mobile, and store, backed by operations that deliver reliably.", "intro.p2": "AIM helps retailers build and modernize commerce platforms, unify customer and inventory data, and apply AI and analytics to personalize experiences and optimize operations.", "cap.eb": "Ce que nous faisons", "cap.h": "De la vitrine à la chaîne d’approvisionnement.", "band.eb": "Built to scale", "band.h": "Performance et fiabilité en période de pointe.", "band.p": "Retail traffic spikes without warning, and downtime costs sales directly. We build scalable, resilient platforms with performance engineering and monitoring, ready for peak seasons and flash demand.", "out.eb": "Résultats", "out.h": "Des résultats pour le commerce de détail.", "end.eb": "Prêt à commencer?", "end.h": "Prêt à connecter votre commerce?", "end.p": "Partner with AIM to unify your channels, personalize the experience, and build commerce that scales.", "end.b2": "Explorer nos services"}};
  var MAP=[['eb','.ind-hero .eyebrow'],['h1','.ind-hero .h1'],['lead','.ind-hero .lead'],['cta1','.ind-hero .btn-primary'],['cta2','.ind-hero .btn-ghost'],['intro.h','#ind-intro-h'],['intro.p1','#ind-intro-p1'],['intro.p2','#ind-intro-p2'],['cap.eb','#ind-cap-head .eyebrow'],['cap.h','#ind-cap-head .heading'],['band.eb','#ind-band-eb'],['band.h','#ind-band-h'],['band.p','#ind-band-p'],['out.eb','#ind-out-head .eyebrow'],['out.h','#ind-out-head .heading'],['end.eb','.ind-cta .eyebrow'],['end.h','.ind-cta .heading'],['end.p','.ind-cta p'],['end.b2','.ind-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});
    tl.from('.ind-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.ind-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.25')
      .from('.ind-hero .lead',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.35')
      .from('.ind-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.3');
    gsap.fromTo('.ind-intro > div',{opacity:0,y:28},{opacity:1,y:0,duration:.7,stagger:.15,ease:'power3.out',scrollTrigger:{trigger:'.ind-intro',start:'top 85%',once:true}});
    d.querySelectorAll('.ind-cap').forEach(function(c,i){gsap.fromTo(c,{opacity:0,y:24},{opacity:1,y:0,duration:.5,delay:(i%3)*.09,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 90%',once:true}});});
    d.querySelectorAll('.ind-chip').forEach(function(c,i){gsap.fromTo(c,{opacity:0,y:16},{opacity:1,y:0,duration:.45,delay:(i%2)*.08,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 92%',once:true}});});
    d.querySelectorAll('.ind-out').forEach(function(o,i){gsap.fromTo(o,{opacity:0,y:20},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 92%',once:true}});});
    gsap.fromTo('.ind-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.ind-cta',start:'top 88%',once:true}});
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
  } else {
    ['.ind-cap','.ind-chip','.ind-out','.ind-cta','.ind-intro > div'].forEach(function(sel){d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});});
  }
  bind(d.querySelectorAll('.ind-cap,.ind-chip,.ind-out,a'));
  mag(d.querySelectorAll('.btn'));
});

})();