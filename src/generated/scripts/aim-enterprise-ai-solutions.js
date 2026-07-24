;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var TR={
    en:{'eb':'Enterprise AI Solutions','h1':'Intelligent systems that drive real business outcomes.','lead':'Your competitors are already using AI to cut costs by 30-40% and accelerate decision-making 3x. The question isn\u2019t whether to adopt AI  - it\u2019s who you trust to get it right.','s1':'Years enterprise delivery','s2':'Client re-engagement rate','s3':'Tolerance for AI hype','cta1':'Book a consultation \u2192','cta2':'See capabilities','ch.eb':'The enterprise AI challenge','ch.h2':'70% of enterprise AI projects never reach production.','f1.h':'Why most AI initiatives fail','f2.h':'The business impact','ap.eb':'Our approach','ap.h2':'Enterprise AI done right.','ap.lead':'We don\u2019t sell AI tools. We solve business problems using AI as the enabler.','p1.h':'Grounded in your reality','p2.h':'Integrated, not bolted on','p3.h':'Measured by outcomes','cap.eb':'Enterprise AI capabilities','cap.h2':'Six capability domains. One integrated platform.','gov.eb':'Responsible AI & governance','gov.h2':'AI you can trust.','ind.eb':'Industry solutions','ind.h2':'AI expertise across sectors.','end.eb':'Ready to start?','end.h2':'Transform your enterprise with AI that delivers.','end.p':'19+ years of proven delivery. 100% client re-engagement. Production-grade AI grounded in your data.','end.btn1':'Book a consultation \u2192','end.btn2':'Learn about AIM'},
    fr:{'eb':'Solutions IA d\u2019entreprise','h1':'Des syst\u00e8mes intelligents qui g\u00e9n\u00e8rent de vrais r\u00e9sultats.','lead':'Vos concurrents utilisent d\u00e9j\u00e0 l\u2019IA pour r\u00e9duire les co\u00fbts de 30-40% et acc\u00e9l\u00e9rer la prise de d\u00e9cision 3x. La question n\u2019est pas d\u2019adopter l\u2019IA  - mais \u00e0 qui faire confiance.','s1':'Ann\u00e9es de livraison','s2':'Taux de r\u00e9-engagement','s3':'Tol\u00e9rance au battage IA','cta1':'R\u00e9server une consultation \u2192','cta2':'Voir les capacit\u00e9s','ch.eb':'Le d\u00e9fi de l\u2019IA d\u2019entreprise','ch.h2':'70% des projets IA n\u2019atteignent jamais la production.','f1.h':'Pourquoi la plupart des initiatives \u00e9chouent','f2.h':'L\u2019impact commercial','ap.eb':'Notre approche','ap.h2':'L\u2019IA d\u2019entreprise bien faite.','ap.lead':'Nous ne vendons pas d\u2019outils IA. Nous r\u00e9solvons des probl\u00e8mes avec l\u2019IA comme levier.','p1.h':'Ancr\u00e9 dans votre r\u00e9alit\u00e9','p2.h':'Int\u00e9gr\u00e9, pas greff\u00e9','p3.h':'Mesur\u00e9 par les r\u00e9sultats','cap.eb':'Capacit\u00e9s IA d\u2019entreprise','cap.h2':'Six domaines. Une plateforme int\u00e9gr\u00e9e.','gov.eb':'IA responsable et gouvernance','gov.h2':'Une IA de confiance.','ind.eb':'Solutions par industrie','ind.h2':'Expertise IA dans tous les secteurs.','end.eb':'Pr\u00eat \u00e0 commencer?','end.h2':'Transformez votre entreprise avec une IA qui livre.','end.p':'19+ ann\u00e9es de livraison. 100% de r\u00e9-engagement. IA de production ancr\u00e9e dans vos donn\u00e9es.','end.btn1':'R\u00e9server une consultation \u2192','end.btn2':'En savoir plus sur AIM'}
  };
  var MAP=[['eb','.ea-hero .eyebrow'],['h1','.ea-hero .h1'],['lead','.ea-hero .lead'],['cta1','.ea-hero .btn-primary'],['cta2','.ea-hero .btn-ghost'],['s1','.ea-stat:nth-child(1) .l'],['s2','.ea-stat:nth-child(2) .l'],['s3','.ea-stat:nth-child(3) .l'],['ch.eb','#ea-challenge .eyebrow'],['ch.h2','#ea-challenge .heading'],['f1.h','.ea-fail-card:nth-child(1) h3'],['f2.h','.ea-fail-card:nth-child(2) h3'],['ap.eb','#ea-approach .eyebrow'],['ap.h2','#ea-approach .heading'],['ap.lead','#ea-approach .lead'],['p1.h','.ea-pillar:nth-child(1) h3'],['p2.h','.ea-pillar:nth-child(2) h3'],['p3.h','.ea-pillar:nth-child(3) h3'],['cap.eb','#ea-caps .eyebrow'],['cap.h2','#ea-caps .heading'],['gov.eb','#ea-gov .eyebrow'],['gov.h2','#ea-gov .heading'],['ind.eb','#ea-ind .eyebrow'],['ind.h2','#ea-ind .heading'],['end.eb','.ea-cta .eyebrow'],['end.h2','.ea-cta .heading'],['end.p','.ea-cta p'],['end.btn1','.ea-cta .btn-primary'],['end.btn2','.ea-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});
    tl.from('.ea-hero .eyebrow',{opacity:0,y:16,duration:.5,ease:'power3.out'})
      .from('.ea-hero .h1',{opacity:0,y:28,duration:.8,ease:'power3.out'},'-=.3')
      .from('.ea-hero .lead',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3')
      .from('.ea-stats',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3')
      .from('.ea-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.2')
      .from('.ea-hero-visual',{opacity:0,x:50,duration:1,ease:'power3.out'},'-=.7');
    d.querySelectorAll('.ea-fail-card').forEach(function(c,i){gsap.from(c,{opacity:0,y:32,duration:.6,delay:i*.12,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
    d.querySelectorAll('.ea-pillar').forEach(function(c,i){gsap.from(c,{opacity:0,y:36,duration:.6,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
    d.querySelectorAll('.ea-cap').forEach(function(c){gsap.from(c.children,{opacity:0,y:30,stagger:.15,duration:.7,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 82%',once:true}});});
    d.querySelectorAll('.ea-gov-card').forEach(function(c,i){gsap.from(c,{opacity:0,y:24,duration:.5,delay:i*.08,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 95%',once:true}});});
    d.querySelectorAll('.ea-ind-card').forEach(function(c,i){gsap.from(c,{opacity:0,y:20,duration:.4,delay:i*.06,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 90%',once:true}});});
  }
  bind(d.querySelectorAll('.ea-pillar,.ea-fail-card,.ea-gov-card,.ea-ind-card,.btn,a'));
  /* Safety: if GSAP fails, show all content after 2s */
  if(!window.gsap){
    setTimeout(function(){
      d.querySelectorAll('.ea-fail-card,.ea-pillar,.ea-cap,.ea-gov-card,.ea-ind-card').forEach(function(el){el.style.opacity='1';el.style.transform='none';});
    },100);
  }
});

})();