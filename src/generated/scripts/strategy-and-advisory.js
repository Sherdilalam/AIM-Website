;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  if(!rm){b.classList.add('st-go');}
  /* infinite ribbon: fill to >=2.2x viewport in identical-pair copies (seamless -50% loop), constant speed */
  (function(){
    var trk=d.querySelector('.st-ribbon .trk');if(!trk)return;
    var originals=[].slice.call(trk.children);
    var guard=0;
    while(trk.scrollWidth<(window.innerWidth||1280)*2.2&&guard<10){
      originals.forEach(function(s){trk.appendChild(s.cloneNode(true));});
      guard++;
    }
    var speed=90; /* px per second */
    trk.style.animationDuration=Math.max(14,(trk.scrollWidth/2)/speed)+'s';
  })();
  var TR={
    en:{'eb':'AIM Services','h1sub':'Clear direction. Confident execution. Measurable outcomes.','lead':'Navigate digital transformation with confidence. We craft execution-ready IT strategies, roadmaps, and governance frameworks that align technology investments with business goals.','cta1':'Connect with us','cta2':'Explore services','pill.eb':'Our advisory coverage','pill.h2':'Five pillars of strategic clarity.','out.eb':'Service outcomes','out.h2':'What you can expect.','j.eb':'How we engage','j.h2':'From first conversation to lasting results.','sub.eb':'Explore our advisory services','sub.h2':'Dive deeper into specific capabilities.','end.eb':'Ready to chart your course?','end.h2':'Chart your digital future.','end.p':'Start with clarity. Move with confidence. Partner with AIM to build a technology strategy that delivers.'},
    fr:{'eb':'Services AIM','h1sub':'Direction claire. Exécution confiante. Résultats mesurables.','lead':'Naviguez la transformation numérique avec confiance. Nous créons des stratégies TI prêtes à exécuter, alignées sur vos objectifs d\u2019affaires.','cta1':'Contactez-nous','cta2':'Explorer les services','pill.eb':'Notre couverture-conseil','pill.h2':'Cinq piliers de clarté stratégique.','out.eb':'Résultats attendus','out.h2':'Ce que vous pouvez attendre.','j.eb':'Notre engagement','j.h2':'De la première conversation aux résultats durables.','sub.eb':'Explorez nos services-conseils','sub.h2':'Approfondissez des capacités spécifiques.','end.eb':'Prêt à tracer votre route?','end.h2':'Tracez votre avenir numérique.','end.p':'Commencez avec clarté. Avancez avec confiance. Partenaire AIM pour une stratégie qui livre.'}
  };
  var MAP=[['eb','.st-hero .eyebrow'],['h1sub','.st-hero .sub-h'],['lead','.st-hero .lead'],['cta1','.st-hero .btn-primary'],['cta2','.st-hero .btn-ghost'],['pill.eb','#st-pill-head .eyebrow'],['pill.h2','#st-pill-head .heading'],['out.eb','#st-out-head .eyebrow'],['out.h2','#st-out-head .heading'],['j.eb','#st-j-head .eyebrow'],['j.h2','#st-j-head .heading'],['sub.eb','#st-sub-head .eyebrow'],['sub.h2','#st-sub-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.p','.sa-cta p']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  /* scrollytelling pillars */
  var panels=[].slice.call(d.querySelectorAll('.st-panel'));
  var idx=d.getElementById('stIdx'),fill=d.getElementById('stFill');
  if('IntersectionObserver' in window&&panels.length){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          panels.forEach(function(p){p.classList.remove('active');});
          e.target.classList.add('active');
          var i=panels.indexOf(e.target);
          if(idx)idx.textContent='0'+(i+1);
          if(fill)fill.style.height=((i+1)/panels.length*100)+'%';
        }
      });
    },{rootMargin:'-35% 0px -45% 0px',threshold:0});
    panels.forEach(function(p){io.observe(p);});
  }
  /* pin the rail with GSAP (works even where CSS sticky fails) */
  if(window.gsap&&window.ScrollTrigger&&!rm&&window.innerWidth>1080){
    gsap.registerPlugin(ScrollTrigger);
    var stick=d.getElementById('stStick'),panelsEl=d.getElementById('stPanels');
    if(stick&&panelsEl){
      ScrollTrigger.create({trigger:panelsEl,start:'top 130px',end:function(){return 'bottom '+(stick.querySelector('.st-stick-in').offsetHeight+160)+'px';},pin:stick.querySelector('.st-stick-in'),pinSpacing:false});
    }
  }
  /* journey line fill + steps light up */
  var jf=d.getElementById('stJfill'),jg=d.getElementById('stJgrid');
  if('IntersectionObserver' in window&&jg){
    var jo=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          if(jf)jf.style.width='100%';
          var steps=jg.querySelectorAll('.st-jstep');
          steps.forEach(function(s,i){setTimeout(function(){s.classList.add('lit');},300+i*320);});
          jo.disconnect();
        }
      });
    },{threshold:.35});
    jo.observe(jg);
  }
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});
    tl.from('.st-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.st-hero .h1',{opacity:0,y:32,duration:.85,ease:'power3.out'},'-=.25')
      .from('.st-hero .sub-h',{opacity:0,y:14,duration:.4,ease:'power3.out'},'-=.25')
      .from('.st-hero .lead',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3')
      .from('.st-hero-badges span',{opacity:0,y:12,stagger:.06,duration:.4,ease:'power3.out'},'-=.25')
      .from('.st-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.2');
    d.querySelectorAll('.st-intro > div').forEach(function(x,i){gsap.from(x,{opacity:0,y:28,duration:.7,delay:i*.15,ease:'power3.out',scrollTrigger:{trigger:x,start:'top 85%',once:true}});});
    d.querySelectorAll('.st-out').forEach(function(o,i){gsap.from(o,{opacity:0,y:20,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 90%',once:true}});});
    d.querySelectorAll('.st-sub').forEach(function(s,i){gsap.from(s,{opacity:0,y:22,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 90%',once:true}});});
    gsap.from('.sa-cta',{opacity:0,y:30,scale:.98,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 85%',once:true}});
  }
  bind(d.querySelectorAll('.st-panel,.st-out,.st-sub,.st-jstep,a'));
  mag(d.querySelectorAll('.btn'));
});

})();