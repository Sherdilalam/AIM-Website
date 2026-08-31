;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"eb": "Financial Services", "h1": "Future-ready fintech software that drives growth.", "lead": "We align with your business goals to deliver secure, user-focused fintech software that amplifies your strengths and supports growth, from strategy and design through development and deployment.", "cta1": "Connect with us", "cta2": "Explore capabilities", "intro.h": "Driving growth with future-ready fintech software.", "intro.p1": "As an end-to-end development partner, we support you through every stage of the software development life cycle, delivering scalable systems that drive measurable business value in an evolving financial industry.", "intro.p2": "AIM has been assisting fintechs with their software needs for decades. Our experience, expertise, and development approach have made us a trusted partner of leading financial innovators.", "cap.eb": "What we do for fintech", "cap.h": "Secure, compliant, innovation-driven delivery.", "band.eb": "Regulatory peace of mind", "band.h": "Compliance without compromise.", "band.p": "Our comprehensive regulatory understanding, spanning industry, privacy, and technology domains, lets us embed compliance and controls at every layer. The result is maximum regulatory safety, strong performance, and adaptability for a shifting compliance landscape.", "out.eb": "Outcomes", "out.h": "Outcomes for financial organizations.", "end.eb": "Ready to get started?", "end.h": "Still have questions about fintech software?", "end.p": "Reach out to discuss your business and digital needs and learn how our fintech software development can help.", "end.b2": "Explore our services"}, "fr": {"eb": "Services financiers", "h1": "Des logiciels fintech prêts pour l’avenir.", "lead": "Nous livrons des logiciels fintech sécurisés et centrés sur l’utilisateur qui soutiennent votre croissance.", "cta1": "Contactez-nous", "cta2": "Explorer les capacités", "intro.h": "La croissance grâce à des logiciels fintech prêts pour l’avenir.", "intro.p1": "As an end-to-end development partner, we support you through every stage of the software development life cycle, delivering scalable systems that drive measurable business value in an evolving financial industry.", "intro.p2": "AIM has been assisting fintechs with their software needs for decades. Our experience, expertise, and development approach have made us a trusted partner of leading financial innovators.", "cap.eb": "Ce que nous faisons", "cap.h": "Livraison sécurisée, conforme et axée sur l’innovation.", "band.eb": "Regulatory peace of mind", "band.h": "La conformité sans compromis.", "band.p": "Our comprehensive regulatory understanding, spanning industry, privacy, and technology domains, lets us embed compliance and controls at every layer. The result is maximum regulatory safety, strong performance, and adaptability for a shifting compliance landscape.", "out.eb": "Résultats", "out.h": "Des résultats pour les organisations financières.", "end.eb": "Prêt à commencer?", "end.h": "Des questions sur le développement fintech?", "end.p": "Reach out to discuss your business and digital needs and learn how our fintech software development can help.", "end.b2": "Explorer nos services"}};
  var MAP=[['eb','.ind-hero .eyebrow'],['h1','.ind-hero .h1'],['lead','.ind-hero .lead'],['cta1','.ind-hero .btn-primary'],['cta2','.ind-hero .btn-ghost'],['intro.h','#ind-intro-h'],['intro.p1','#ind-intro-p1'],['intro.p2','#ind-intro-p2'],['cap.eb','#ind-cap-head .eyebrow'],['cap.h','#ind-cap-head .heading'],['band.eb','#ind-band-eb'],['band.h','#ind-band-h'],['band.p','#ind-band-p'],['out.eb','#ind-out-head .eyebrow'],['out.h','#ind-out-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h','.sa-cta .heading'],['end.p','.sa-cta p'],['end.b2','.sa-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});
    tl.from('.ind-hero .tag',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.ind-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.3')
      .from('.ind-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.25')
      .from('.ind-hero .lead',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.35')
      .from('.ind-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.3')
      .from('.ind-hero-img',{opacity:0,x:40,duration:.9,ease:'power3.out'},'-=.6');
    gsap.fromTo('.ind-intro > div',{opacity:0,y:28},{opacity:1,y:0,duration:.7,stagger:.15,ease:'power3.out',scrollTrigger:{trigger:'.ind-intro',start:'top 85%',once:true}});
    d.querySelectorAll('.ind-cap').forEach(function(c,i){gsap.fromTo(c,{opacity:0,y:24},{opacity:1,y:0,duration:.5,delay:(i%3)*.09,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 90%',once:true}});});
    d.querySelectorAll('.ind-chip').forEach(function(c,i){gsap.fromTo(c,{opacity:0,y:16},{opacity:1,y:0,duration:.45,delay:(i%2)*.08,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 92%',once:true}});});
    d.querySelectorAll('.ind-out').forEach(function(o,i){gsap.fromTo(o,{opacity:0,y:20},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 92%',once:true}});});
    gsap.fromTo('.sa-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 88%',once:true}});
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
  } else {
    ['.ind-cap','.ind-chip','.ind-out','.sa-cta','.ind-intro > div'].forEach(function(sel){d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});});
  }
  bind(d.querySelectorAll('.ind-cap,.ind-chip,.ind-out,a'));
  mag(d.querySelectorAll('.btn'));
});

})();