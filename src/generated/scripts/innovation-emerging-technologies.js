;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={
    en:{'eb':'AIM Services','lead':'Explore what is next - without betting the business on it. AIM helps you evaluate, pilot, and productionize emerging technologies (generative AI, RPA, IoT, blockchain, AR/VR) with a pragmatic, outcome-first approach.','cta1':'Connect with us','cta2':'Explore technologies','sub.eb':'Emerging technologies we deliver','sub.h2':"Tomorrow's tech, made practical today.",'flow.eb':'Our approach','flow.h2':'Innovate without the gamble.','out.eb':'Service outcomes','out.h2':'What you can expect.','end.eb':"Ready to explore what's next?",'end.h2':'Turn emerging tech into advantage.','end.p':'AIM helps you cut through the hype and put emerging technology to work - pragmatically, responsibly, and with outcomes you can measure.','end.b2':'See Enterprise AI'},
    fr:{'eb':'Services AIM','lead':'Explorez l\u2019avenir sans miser toute l\u2019entreprise. AIM vous aide à évaluer, piloter et industrialiser les technologies émergentes (IA générative, RPA, IoT, chaîne de blocs, RA/RV).','cta1':'Contactez-nous','cta2':'Explorer les technologies','sub.eb':'Les technologies émergentes que nous livrons','sub.h2':'La tech de demain, rendue pratique aujourd\u2019hui.','flow.eb':'Notre approche','flow.h2':'Innover sans le pari risqué.','out.eb':'Résultats attendus','out.h2':'Ce que vous pouvez attendre.','end.eb':'Prêt à explorer l\u2019avenir?','end.h2':'Faites des technologies émergentes un avantage.','end.p':'AIM vous aide à dépasser le battage et à mettre les technologies émergentes au travail, de façon pragmatique et responsable.','end.b2':'Voir Enterprise AI'}
  };
  var MAP=[['eb','.in-hero .eyebrow'],['lead','.in-hero .lead'],['cta1','.in-hero .btn-primary'],['cta2','.in-hero .btn-ghost'],['sub.eb','#in-sub-head .eyebrow'],['sub.h2','#in-sub-head .heading'],['flow.eb','#in-flow-head .eyebrow'],['flow.h2','#in-flow-head .heading'],['out.eb','#in-out-head .eyebrow'],['out.h2','#in-out-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.p','.sa-cta p'],['end.b2','.sa-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  var fl=d.getElementById('inFlow'),ff=d.getElementById('inFf');
  if('IntersectionObserver' in window&&fl){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
      if(ff)ff.style.width='100%';
      fl.querySelectorAll('.in-fstep').forEach(function(s,i){setTimeout(function(){s.classList.add('lit');},250+i*320);});
      io.disconnect();
    }});},{threshold:.3});
    io.observe(fl);
  }
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var t0=gsap.timeline({delay:.15});
    t0.from('.in-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.in-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.25')
      .from('.in-hero .lead',{opacity:0,y:18,duration:.55,ease:'power3.out'},'-=.3')
      .from('.in-badges span',{opacity:0,y:12,stagger:.06,duration:.4,ease:'power3.out'},'-=.25')
      .from('.in-hero .btn-row',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.2')
      .from('.in-node',{opacity:0,scale:.6,stagger:.1,duration:.5,ease:'back.out(1.5)'},'-=.4');
    d.querySelectorAll('.in-sub').forEach(function(s,i){gsap.fromTo(s,{opacity:0,y:22},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 92%',once:true}});});
    d.querySelectorAll('.in-out').forEach(function(o,i){gsap.fromTo(o,{opacity:0,y:20},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 92%',once:true}});});
    gsap.fromTo('.sa-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 88%',once:true}});
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
  } else {
    ['.in-sub','.in-out','.sa-cta','.in-node'].forEach(function(sel){d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});});
  }
  bind(d.querySelectorAll('.in-sub,.in-out,.in-fstep,.in-node,a'));
  mag(d.querySelectorAll('.btn'));
});

})();