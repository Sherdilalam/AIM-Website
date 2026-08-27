;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={
    en:{'bread':'Managed IT & Application Services','eb':'Application Maintenance & Enhancements','h1':'Keep running. Keep evolving.','lead':'Extend the value of your applications with proactive maintenance and responsive support. AIM ensures your systems stay stable, secure, and aligned to evolving business needs through ongoing enhancements and issue resolution.','s1':'Faster issue resolution','s2':'SLA compliance','s3':'First call resolution','cta1':'Connect with us','cta2':'See our approach','pill.eb':'Our capability pillars','pill.h2':'Structured for maximum business impact.','p1':'Full-Lifecycle Maintenance','p2':'Tailored Operating Models','p3':'Cloud & SaaS-Aware Support','why.eb':'Why AIM','why.h2':'Your ideal managed services partner.','del.eb':'Our delivery approach','del.h2':'A proven engagement model.','end.eb':'Get started','end.h2':'Let\'s future-proof your applications.','end.p':'Whether you\'re looking to outsource support, modernize legacy systems, or add new capabilities, our AMS team is ready to deliver value.','end.btn1':'Connect with us','end.btn2':'Back to Managed Services'},
    fr:{'bread':'Services TI & Applications g\u00e9r\u00e9s','eb':'Maintenance et am\u00e9liorations d\'applications','h1':'Continuez d\u2019\u00e9voluer.','lead':'Prolongez la valeur de vos applications avec une maintenance proactive et un soutien r\u00e9actif.','s1':'R\u00e9solution plus rapide','s2':'Garantie de disponibilit\u00e9','s3':'Optimisation des co\u00fbts','cta1':'Contactez-nous','cta2':'Notre approche','pill.eb':'Nos piliers de capacit\u00e9','pill.h2':'Structur\u00e9s pour un impact maximal.','p1':'Maintenance \u00e0 cycle complet','p2':'Mod\u00e8les op\u00e9rationnels adapt\u00e9s','p3':'Soutien conscient du cloud et SaaS','why.eb':'Pourquoi AIM','why.h2':'Votre partenaire id\u00e9al en services g\u00e9r\u00e9s.','del.eb':'Notre approche de livraison','del.h2':'Un mod\u00e8le d\'engagement \u00e9prouv\u00e9.','end.eb':'Commencer','end.h2':'Simplifions votre complexit\u00e9.','end.p':'Que vous ayez besoin d\'un partenaire complet ou d\'un soutien cibl\u00e9, AIM offre la tranquillit\u00e9 op\u00e9rationnelle.','end.btn1':'Contactez-nous','end.btn2':'Retour aux services g\u00e9r\u00e9s'}
  };
  var MAP=[['eb','.sp-hero .eyebrow'],['h1','.sp-hero .h1'],['lead','.sp-hero .lead'],['s1','.sp-hero-stat:nth-child(1) .l'],['s2','.sp-hero-stat:nth-child(2) .l'],['s3','.sp-hero-stat:nth-child(3) .l'],['cta1','.sp-hero .btn-primary'],['cta2','.sp-hero .btn-ghost'],['pill.eb','#sp-pill-head .eyebrow'],['pill.h2','#sp-pill-head .heading'],['p1','.sp-pillar:nth-child(1) h3'],['p2','.sp-pillar:nth-child(2) h3'],['p3','.sp-pillar:nth-child(3) h3'],['why.eb','#sp-why-head .eyebrow'],['why.h2','#sp-why-head .heading'],['del.eb','#sp-del-head .eyebrow'],['del.h2','#sp-del-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.p','.sa-cta p'],['end.btn1','.sa-cta .btn-primary'],['end.btn2','.sa-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});
  }
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});tl.from('.sp-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.15').from('.sp-hero .h1',{opacity:0,y:28,duration:.8,ease:'power3.out'},'-=.25').from('.sp-hero .lead',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3').from('.sp-hero-stats',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.2').from('.sp-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.2').from('.sa-visual',{opacity:0,x:50,scale:.96,duration:1,ease:'power3.out'},'-=.7');
    d.querySelectorAll('.sp-pillar').forEach(function(p,i){gsap.from(p,{opacity:0,y:32,duration:.6,delay:i*.12,ease:'power3.out',scrollTrigger:{trigger:p,start:'top 88%',once:true}});});
    d.querySelectorAll('.sp-why-card').forEach(function(c,i){gsap.from(c,{opacity:0,y:28,duration:.5,delay:(i%2)*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
    d.querySelectorAll('.sp-step').forEach(function(s,i){gsap.from(s,{opacity:0,y:24,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 88%',once:true}});});
    d.querySelectorAll('.sv-cert-group').forEach(function(c,i){gsap.from(c,{opacity:0,y:28,duration:.5,delay:(i%2)*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
        gsap.from('.sa-cta',{opacity:0,y:28,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 85%',once:true}});
  }
  bind(d.querySelectorAll('.sp-pillar,.sp-why-card,.sp-step,.sp-bread a,a'));
  mag(d.querySelectorAll('.btn'));
});

})();