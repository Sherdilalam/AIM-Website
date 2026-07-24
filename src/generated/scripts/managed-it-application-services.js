;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={
    en:{'eb':'AIM Services','h1':'Managed IT & Application Services','sub':'Always-on support. Intelligent operations. Scalable results.','lead':'Proactive, end-to-end support across your infrastructure, cloud environments, and business-critical applications, ensuring your operations run smoothly while your teams stay focused on innovation and growth.','cta1':'Connect with us','cta2':'Explore services','off.eb':'Our managed services coverage','off.h2':'Five pillars of operational excellence.','out.eb':'Service outcomes','out.h2':'What you can expect.','why.eb':'Why organizations choose AIM','why.h2':'Built different. Managed better.','sub.eb':'Explore our managed services','sub.h2':'Dive deeper into specific capabilities.','end.eb':'Ready to modernize?','end.h2':'Modernize your IT operations.','end.p':'Stay secure, innovative, and operationally excellent - every day, around the clock.','end.btn1':'Connect with us','end.btn2':'Contact support'},
    fr:{'eb':'Services AIM','h1':'Services TI & Applications g\u00e9r\u00e9s','sub':'Soutien permanent. Op\u00e9rations intelligentes. R\u00e9sultats \u00e9volutifs.','lead':'Soutien proactif de bout en bout pour votre infrastructure, environnements cloud et applications critiques - pour que vos \u00e9quipes se concentrent sur l\'innovation.','cta1':'Contactez-nous','cta2':'Explorer les services','off.eb':'Notre couverture de services g\u00e9r\u00e9s','off.h2':'Cinq piliers d\'excellence op\u00e9rationnelle.','out.eb':'R\u00e9sultats attendus','out.h2':'Ce que vous pouvez attendre.','why.eb':'Pourquoi les organisations choisissent AIM','why.h2':'Con\u00e7u diff\u00e9remment. G\u00e9r\u00e9 mieux.','sub.eb':'Explorer nos services g\u00e9r\u00e9s','sub.h2':'Approfondissez les capacit\u00e9s sp\u00e9cifiques.','end.eb':'Pr\u00eat \u00e0 moderniser?','end.h2':'Modernisez vos op\u00e9rations TI.','end.p':'Restez s\u00e9curis\u00e9, innovant et op\u00e9rationnellement excellent - chaque jour.','end.btn1':'Contactez-nous','end.btn2':'Contacter le soutien'}
  };
  var MAP=[['eb','.sv-hero .eyebrow'],['h1','.sv-hero .h1'],['sub','.sv-hero .sub-h'],['lead','.sv-hero .lead'],['cta1','.sv-hero .btn-primary'],['cta2','.sv-hero .btn-ghost'],['off.eb','#sv-off-head .eyebrow'],['off.h2','#sv-off-head .heading'],['out.eb','#sv-out-head .eyebrow'],['out.h2','#sv-out-head .heading'],['why.eb','#sv-why-head .eyebrow'],['why.h2','#sv-why-head .heading'],['sub.eb','#sv-sub-head .eyebrow'],['sub.h2','#sv-sub-head .heading'],['end.eb','.sv-cta .eyebrow'],['end.h2','.sv-cta .heading'],['end.p','.sv-cta p'],['end.btn1','.sv-cta .btn-primary'],['end.btn2','.sv-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});
    tl.from('.sv-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.sv-hero .h1',{opacity:0,y:28,duration:.8,ease:'power3.out'},'-=.25')
      .from('.sv-hero .sub-h',{opacity:0,y:14,duration:.4,ease:'power3.out'},'-=.2')
      .from('.sv-hero .lead',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3')
      .from('.sv-hero-badges',{opacity:0,y:12,duration:.4,ease:'power3.out'},'-=.2')
      .from('.sv-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.2')
      .from('.sv-hero-visual',{opacity:0,x:50,scale:.96,duration:1,ease:'power3.out'},'-=.7');
    d.querySelectorAll('.sv-intro > div').forEach(function(d2,i){gsap.from(d2,{opacity:0,y:28,duration:.7,delay:i*.15,ease:'power3.out',scrollTrigger:{trigger:d2,start:'top 85%',once:true}});});
    d.querySelectorAll('.sv-offer').forEach(function(o,i){gsap.from(o,{opacity:0,x:-30,duration:.7,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 85%',once:true}});});
    d.querySelectorAll('.sv-out').forEach(function(o,i){gsap.from(o,{opacity:0,y:20,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 90%',once:true}});});
    d.querySelectorAll('.sv-why-card').forEach(function(c,i){gsap.from(c,{opacity:0,y:28,duration:.5,delay:i*.08,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
    d.querySelectorAll('.sv-sub').forEach(function(s,i){gsap.from(s,{opacity:0,x:-16,duration:.4,delay:i*.06,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 92%',once:true}});});
  }
  bind(d.querySelectorAll('.sv-out,.sv-why-card,.sv-sub,.sv-offer,a'));
  mag(d.querySelectorAll('.btn'));
});

})();