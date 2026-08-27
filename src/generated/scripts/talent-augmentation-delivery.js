;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  if(!rm) b.classList.add('tl-go');
  var TR={
    en:{'eb':'AIM Services','lead':'Scale your team with senior, vetted technology talent - fast. AIM provides specialized engineers, architects, and delivery leaders who integrate seamlessly and ship from day one, through flexible onshore, nearshore, and offshore models.','cta1':'Connect with us','cta2':'Explore roles','sub.eb':'Talent we provide','sub.h2':'Senior specialists, ready to ship.','flow.eb':'How it works','flow.h2':'From request to ramped-up in days.','out.eb':'Service outcomes','out.h2':'What you can expect.','end.eb':'Need talent fast?','end.h2':'Scale your team with confidence.','end.p':'Whether you need one specialist or a full delivery pod, AIM connects you with senior technology talent that ships - and stands behind them.','end.b2':'Join our talent network'},
    fr:{'eb':'Services AIM','lead':'Renforcez votre équipe avec des talents technologiques seniors et vérifiés, rapidement, via des modèles flexibles sur place, en proximité et à l\u2019étranger.','cta1':'Contactez-nous','cta2':'Explorer les rôles','sub.eb':'Les talents que nous offrons','sub.h2':'Des spécialistes seniors, prêts à livrer.','flow.eb':'Comment ça marche','flow.h2':'De la demande à l\u2019intégration en quelques jours.','out.eb':'Résultats attendus','out.h2':'Ce que vous pouvez attendre.','end.eb':'Besoin de talents rapidement?','end.h2':'Renforcez votre équipe en confiance.','end.p':'Un spécialiste ou une équipe complète, AIM vous connecte à des talents technologiques seniors qui livrent.','end.b2':'Rejoindre notre réseau de talents'}
  };
  var MAP=[['eb','.tl-hero .eyebrow'],['lead','.tl-hero .lead'],['cta1','.tl-hero .btn-primary'],['cta2','.tl-hero .btn-ghost'],['sub.eb','#tl-sub-head .eyebrow'],['sub.h2','#tl-sub-head .heading'],['flow.eb','#tl-flow-head .eyebrow'],['flow.h2','#tl-flow-head .heading'],['out.eb','#tl-out-head .eyebrow'],['out.h2','#tl-out-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.p','.sa-cta p'],['end.b2','.sa-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  /* flow line + steps light on scroll */
  var fl=d.getElementById('tlFlow'),ff=d.getElementById('tlFf');
  if('IntersectionObserver' in window&&fl){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
      if(ff)ff.style.width='100%';
      fl.querySelectorAll('.tl-fstep').forEach(function(s,i){setTimeout(function(){s.classList.add('lit');},250+i*320);});
      io.disconnect();
    }});},{threshold:.3});
    io.observe(fl);
  }
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var t0=gsap.timeline({delay:.15});
    t0.from('.tl-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.tl-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.25')
      .from('.tl-hero .lead',{opacity:0,y:18,duration:.55,ease:'power3.out'},'-=.3')
      .from('.tl-badges span',{opacity:0,y:12,stagger:.06,duration:.4,ease:'power3.out'},'-=.25')
      .from('.tl-hero .btn-row',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.2');
    d.querySelectorAll('.tl-model').forEach(function(s,i){gsap.fromTo(s,{opacity:0,y:22},{opacity:1,y:0,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 92%',once:true}});});
    d.querySelectorAll('.tl-sub').forEach(function(s,i){gsap.fromTo(s,{opacity:0,y:22},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 92%',once:true}});});
    d.querySelectorAll('.tl-out').forEach(function(o,i){gsap.fromTo(o,{opacity:0,y:20},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 92%',once:true}});});
    gsap.fromTo('.sa-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 88%',once:true}});
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
  } else {
    ['.tl-model','.tl-sub','.tl-out','.sa-cta','.tl-card'].forEach(function(sel){d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});});
  }
  bind(d.querySelectorAll('.tl-model,.tl-sub,.tl-out,.tl-fstep,.tl-card,a,button'));
  mag(d.querySelectorAll('.btn'));
});

})();