;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  if(!rm) b.classList.add('da-go');
  var TR={
    en:{'eb':'AIM Services','lead':'Turn scattered data into decisions. AIM builds the full analytics stack - governed data foundations, self-serve BI, and production machine learning - so every team acts on trusted, timely insight.','cta1':'Connect with us','cta2':'Explore services','tab.eb':'What we deliver','tab.h2':'The full journey from data to decision.','out.eb':'Service outcomes','out.h2':'What you can expect.','sub.eb':'Explore our data & AI services','sub.h2':'Dive deeper into specific capabilities.','end.eb':'Ready to unlock your data?','end.h2':'Turn data into your advantage.','end.p':'From first pipeline to production AI, AIM builds the analytics capability that makes your organization decisively data-driven.','end.b2':'See Knowledge AI'},
    fr:{'eb':'Services AIM','lead':'Transformez des données éparses en décisions. AIM bâtit toute la chaîne analytique - fondations gouvernées, BI en libre-service et apprentissage automatique en production.','cta1':'Contactez-nous','cta2':'Explorer les services','tab.eb':'Ce que nous livrons','tab.h2':'Le parcours complet de la donnée à la décision.','out.eb':'Résultats attendus','out.h2':'Ce que vous pouvez attendre.','sub.eb':'Explorez nos services données et IA','sub.h2':'Approfondissez des capacités spécifiques.','end.eb':'Prêt à exploiter vos données?','end.h2':'Faites de vos données un avantage.','end.p':'Du premier pipeline à l\u2019IA en production, AIM bâtit la capacité analytique qui rend votre organisation résolument axée sur les données.','end.b2':'Voir Knowledge AI'}
  };
  var MAP=[['eb','.da-hero .eyebrow'],['lead','.da-hero .lead'],['cta1','.da-hero .btn-primary'],['cta2','.da-hero .btn-ghost'],['tab.eb','#da-tab-head .eyebrow'],['tab.h2','#da-tab-head .heading'],['out.eb','#da-out-head .eyebrow'],['out.h2','#da-out-head .heading'],['sub.eb','#da-sub-head .eyebrow'],['sub.h2','#da-sub-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.p','.sa-cta p'],['end.b2','.sa-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  var tabs=[].slice.call(d.querySelectorAll('.da-tab')), panes=[].slice.call(d.querySelectorAll('.da-pane'));
  tabs.forEach(function(tb){tb.addEventListener('click',function(){
    tabs.forEach(function(x){x.classList.remove('on');});panes.forEach(function(x){x.classList.remove('on');});
    tb.classList.add('on');var p=panes[parseInt(tb.getAttribute('data-pane'),10)];if(p)p.classList.add('on');
  });});
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var t0=gsap.timeline({delay:.15});
    t0.from('.da-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.da-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.25')
      .from('.da-hero .lead',{opacity:0,y:18,duration:.55,ease:'power3.out'},'-=.3')
      .from('.da-badges span',{opacity:0,y:12,stagger:.06,duration:.4,ease:'power3.out'},'-=.25')
      .from('.da-hero .btn-row',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.2');
    d.querySelectorAll('.da-mstep').forEach(function(s,i){gsap.fromTo(s,{opacity:0,y:22},{opacity:1,y:0,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 92%',once:true}});});
    d.querySelectorAll('.da-out').forEach(function(o,i){gsap.fromTo(o,{opacity:0,y:20},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 92%',once:true}});});
    d.querySelectorAll('.da-sub').forEach(function(s,i){gsap.fromTo(s,{opacity:0,y:22},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 92%',once:true}});});
    gsap.fromTo('.da-cap',{opacity:0,y:26},{opacity:1,y:0,duration:.6,ease:'power3.out',scrollTrigger:{trigger:'.da-cap',start:'top 88%',once:true}});
    gsap.fromTo('.sa-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 88%',once:true}});
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
  } else {
    ['.da-mstep','.da-out','.da-sub','.da-cap','.sa-cta'].forEach(function(sel){d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});});
  }
  bind(d.querySelectorAll('.da-tab,.da-out,.da-sub,.da-mstep,.da-viz .row,a,button'));
  mag(d.querySelectorAll('.btn'));
});

})();