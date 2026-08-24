;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={"en": {"eb": "Technology", "h1": "Engineering muscle for technology companies.", "lead": "From startups to scale-ups and established software firms, AIM provides the architecture, engineering, and delivery capacity to build, modernize, and scale technology products with confidence.", "cta1": "Connect with us", "cta2": "Explore capabilities", "intro.h": "A partner that scales with your product.", "intro.p1": "Technology companies live and die by velocity and quality. Whether you are racing to a first release, modernizing a legacy platform, or scaling to meet demand, the right engineering partner is a force multiplier.", "intro.p2": "AIM brings senior architects, developers, and delivery leaders across multiple stacks, plus deep AI, cloud, and data expertise, to help you ship faster without compromising on quality or security.", "cap.eb": "What we do for tech companies", "cap.h": "Build, modernize, and scale your platform.", "band.eb": "How we engage", "band.h": "Talent and delivery, your way.", "band.p": "Scale your team with senior, vetted talent, or hand us a product to build and run end to end. We flex between staff augmentation and full delivery pods across onshore, nearshore, and offshore models, with knowledge transfer built in.", "out.eb": "Outcomes", "out.h": "Outcomes for technology companies.", "end.eb": "Ready to get started?", "end.h": "Ready to accelerate your roadmap?", "end.p": "Partner with AIM for the engineering and delivery muscle to build, modernize, and scale your technology product.", "end.b2": "Explore our services"}, "fr": {"eb": "Technologie", "h1": "La force d’ingénierie pour les entreprises technologiques.", "lead": "AIM fournit l’architecture, l’ingénierie et la capacité de livraison pour bâtir, moderniser et faire évoluer vos produits.", "cta1": "Contactez-nous", "cta2": "Explorer les capacités", "intro.h": "Un partenaire qui évolue avec votre produit.", "intro.p1": "Technology companies live and die by velocity and quality. Whether you are racing to a first release, modernizing a legacy platform, or scaling to meet demand, the right engineering partner is a force multiplier.", "intro.p2": "AIM brings senior architects, developers, and delivery leaders across multiple stacks, plus deep AI, cloud, and data expertise, to help you ship faster without compromising on quality or security.", "cap.eb": "Ce que nous faisons", "cap.h": "Bâtir, moderniser et faire évoluer votre plateforme.", "band.eb": "How we engage", "band.h": "Talent et livraison, à votre façon.", "band.p": "Scale your team with senior, vetted talent, or hand us a product to build and run end to end. We flex between staff augmentation and full delivery pods across onshore, nearshore, and offshore models, with knowledge transfer built in.", "out.eb": "Résultats", "out.h": "Des résultats pour les entreprises technologiques.", "end.eb": "Prêt à commencer?", "end.h": "Prêt à accélérer votre feuille de route?", "end.p": "Partner with AIM for the engineering and delivery muscle to build, modernize, and scale your technology product.", "end.b2": "Explorer nos services"}};
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