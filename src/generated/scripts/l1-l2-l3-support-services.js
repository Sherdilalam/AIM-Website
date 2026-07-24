;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={
    en:{'bread':'Managed IT & Application Services','eb':'Asset & Configuration Management','h1':'Know what you have. Control what happens to it.','lead':'Gain visibility and control over your IT environment with structured asset and configuration management. AIM helps you track, govern, and optimize hardware, software, and dependencies to improve service reliability and lifecycle performance.','s1':'Asset lifecycle visibility','s2':'Availability and monitoring','s3':'Aligned CMDB and change tracking','cta1':'Connect with us','cta2':'See our approach','pill.eb':'Our capability pillars','pill.h2':'Structured for maximum business impact.','p1':'Holistic Asset Management','p2':'Intelligent CMDB','p3':'Integrated ITSM Enablement','why.eb':'Why AIM','why.h2':'Your ideal managed services partner.','del.eb':'Our delivery approach','del.h2':'A proven engagement model.','end.eb':'Ready to eliminate silos?','end.h2':'Build your next-generation asset capability.','end.p':'Reduce operational friction and build a unified source of IT truth.','end.btn1':'Connect with us','end.btn2':'Back to Managed Services'},
    fr:{'bread':'Services TI & Applications g\u00e9r\u00e9s','eb':'Gestion des actifs et de la configuration','h1':'Sachez ce que vous avez. Contr\u00f4lez ce qui lui arrive.','lead':'Obtenez une visibilit\u00e9 et un contr\u00f4le complets sur votre environnement TI.','s1':'Visibilit\u00e9 du cycle de vie des actifs','s2':'Disponibilit\u00e9 et surveillance','s3':'CMDB align\u00e9e ITIL 4','cta1':'Contactez-nous','cta2':'Notre approche','pill.eb':'Nos piliers de capacit\u00e9','pill.h2':'Structur\u00e9s pour un impact maximal.','p1':'Gestion holistique des actifs','p2':'CMDB intelligente','p3':'Int\u00e9gration ITSM','why.eb':'Pourquoi AIM','why.h2':'Votre partenaire id\u00e9al en services g\u00e9r\u00e9s.','del.eb':'Notre approche de livraison','del.h2':'Un mod\u00e8le d\'engagement \u00e9prouv\u00e9.','end.eb':'Choisissez AIM pour une fiabilit\u00e9 \u00e9volutive','end.h2':'Simplifions votre complexit\u00e9.','end.p':'Que vous ayez besoin d\'un partenaire complet ou d\'un soutien cibl\u00e9, AIM offre la tranquillit\u00e9 op\u00e9rationnelle.','end.btn1':'Contactez-nous','end.btn2':'Retour aux services g\u00e9r\u00e9s'}
  };
  var MAP=[['eb','.sp-hero .eyebrow'],['h1','.sp-hero .h1'],['lead','.sp-hero .lead'],['s1','.sp-hero-stat:nth-child(1) .l'],['s2','.sp-hero-stat:nth-child(2) .l'],['s3','.sp-hero-stat:nth-child(3) .l'],['cta1','.sp-hero .btn-primary'],['cta2','.sp-hero .btn-ghost'],['pill.eb','#sp-pill-head .eyebrow'],['pill.h2','#sp-pill-head .heading'],['p1','.sp-pillar:nth-child(1) h3'],['p2','.sp-pillar:nth-child(2) h3'],['p3','.sp-pillar:nth-child(3) h3'],['why.eb','#sp-why-head .eyebrow'],['why.h2','#sp-why-head .heading'],['del.eb','#sp-del-head .eyebrow'],['del.h2','#sp-del-head .heading'],['end.eb','.sp-cta .eyebrow'],['end.h2','.sp-cta .heading'],['end.p','.sp-cta p'],['end.btn1','.sp-cta .btn-primary'],['end.btn2','.sp-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});
  }
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});tl.from('.sp-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.15').from('.sp-hero .h1',{opacity:0,y:28,duration:.8,ease:'power3.out'},'-=.25').from('.sp-hero .lead',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3').from('.sp-hero-stats',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.2').from('.sp-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.2').from('.sp-hero-img',{opacity:0,x:50,scale:.96,duration:1,ease:'power3.out'},'-=.7');
    d.querySelectorAll('.sp-pillar').forEach(function(p,i){gsap.from(p,{opacity:0,y:32,duration:.6,delay:i*.12,ease:'power3.out',scrollTrigger:{trigger:p,start:'top 88%',once:true}});});
    d.querySelectorAll('.sp-why-card').forEach(function(c,i){gsap.from(c,{opacity:0,y:28,duration:.5,delay:(i%2)*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
    d.querySelectorAll('.sp-step').forEach(function(s,i){gsap.from(s,{opacity:0,y:24,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 88%',once:true}});});
    d.querySelectorAll('.sv-cert-group').forEach(function(c,i){gsap.from(c,{opacity:0,y:28,duration:.5,delay:(i%2)*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
        gsap.from('.sp-cta',{opacity:0,y:28,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sp-cta',start:'top 85%',once:true}});
  }
  bind(d.querySelectorAll('.sp-pillar,.sp-why-card,.sp-step,.sp-bread a,a'));
  mag(d.querySelectorAll('.btn'));
});

})();