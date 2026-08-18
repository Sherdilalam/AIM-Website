;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var mag=window.aimBindMagnetic||function(){};
  var TR={
    en:{'eb':'AIM Services','lead':'Modernize with a cloud strategy built around business outcomes. AIM migrates, rebuilds, and automates on Azure, AWS, and GCP - with security, resilience, and cost control designed in from day one.','cta1':'Connect with us','cta2':'Explore services','tab.eb':'What we modernize','tab.h2':'Four fronts. One modernization engine.','j.eb':'How we migrate','j.h2':'A journey with no leaps of faith.','out.eb':'Service outcomes','out.h2':'What you can expect.','sub.eb':'Explore our cloud services','sub.h2':'Dive deeper into specific capabilities.','end.eb':'Ready to modernize?','end.h2':'Modernize with confidence.','end.p':'From strategy to steady-state operations, AIM delivers cloud modernization that pays for itself - securely, measurably, and without the drama.','end.b2':'Explore managed services'},
    fr:{'eb':'Services AIM','lead':'Modernisez avec une stratégie infonuagique axée sur les résultats d\u2019affaires - Azure, AWS et GCP, avec sécurité et contrôle des coûts intégrés.','cta1':'Contactez-nous','cta2':'Explorer les services','tab.eb':'Ce que nous modernisons','tab.h2':'Quatre fronts. Un seul moteur de modernisation.','j.eb':'Notre démarche de migration','j.h2':'Un parcours sans saut dans le vide.','out.eb':'Résultats attendus','out.h2':'Ce que vous pouvez attendre.','sub.eb':'Explorez nos services infonuagiques','sub.h2':'Approfondissez des capacités spécifiques.','end.eb':'Prêt à moderniser?','end.h2':'Modernisez en toute confiance.','end.p':'De la stratégie aux opérations, AIM livre une modernisation infonuagique rentable, sécuritaire et mesurable.','end.b2':'Découvrir les services gérés'}
  };
  var MAP=[['eb','.cl-hero .eyebrow'],['lead','.cl-hero .lead'],['cta1','.cl-hero .btn-primary'],['cta2','.cl-hero .btn-ghost'],['tab.eb','#cl-tab-head .eyebrow'],['tab.h2','#cl-tab-head .heading'],['j.eb','#cl-j-head .eyebrow'],['j.h2','#cl-j-head .heading'],['out.eb','#cl-out-head .eyebrow'],['out.h2','#cl-out-head .heading'],['sub.eb','#cl-sub-head .eyebrow'],['sub.h2','#cl-sub-head .heading'],['end.eb','.sa-cta .eyebrow'],['end.h2','.sa-cta .heading'],['end.p','.sa-cta p'],['end.b2','.sa-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  /* tabs */
  var tabs=[].slice.call(d.querySelectorAll('.cl-tab'));
  var panes=[].slice.call(d.querySelectorAll('.cl-pane'));
  tabs.forEach(function(tb){tb.addEventListener('click',function(){
    tabs.forEach(function(x){x.classList.remove('on');});
    panes.forEach(function(x){x.classList.remove('on');});
    tb.classList.add('on');
    var p=panes[parseInt(tb.getAttribute('data-pane'),10)];if(p)p.classList.add('on');
  });});
  /* timeline fill + step lighting */
  var tl=d.getElementById('clTl'),tf=d.getElementById('clTfill');
  if('IntersectionObserver' in window&&tl){
    var to=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          if(tf)tf.style.height='100%';
          var steps=tl.querySelectorAll('.cl-tstep');
          steps.forEach(function(s,i){setTimeout(function(){s.classList.add('lit');},250+i*350);});
          to.disconnect();
        }
      });
    },{threshold:.2});
    to.observe(tl);
  }
  var haveGSAP=window.gsap&&window.ScrollTrigger;
  if(!haveGSAP||rm){
    /* no animation library or reduced motion: ensure all content is visible */
    ['.cl-out','.cl-sub','.cl-tabs','.sa-cta','.cl-layer'].forEach(function(sel){
      d.querySelectorAll(sel).forEach(function(el){el.style.opacity='1';el.style.transform='none';});
    });
  }
  if(haveGSAP&&!rm){gsap.registerPlugin(ScrollTrigger);
    /* refresh after load so triggers measure correctly inside Webflow wrappers */
    setTimeout(function(){try{ScrollTrigger.refresh();}catch(e){}},400);
    var t0=gsap.timeline({delay:.15});
    t0.from('.cl-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'})
      .from('.cl-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.25')
      .from('.cl-hero .lead',{opacity:0,y:18,duration:.55,ease:'power3.out'},'-=.3')
      .from('.cl-badges span',{opacity:0,y:12,stagger:.06,duration:.4,ease:'power3.out'},'-=.25')
      .from('.cl-hero .btn-row',{opacity:0,y:14,duration:.45,ease:'power3.out'},'-=.2')
      .from('.cl-layer',{opacity:0,x:60,stagger:.15,duration:.8,ease:'power3.out'},'-=.7');
    d.querySelectorAll('.cl-out').forEach(function(o,i){gsap.fromTo(o,{opacity:0,y:20},{opacity:1,y:0,duration:.45,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:o,start:'top 95%',once:true}});});
    d.querySelectorAll('.cl-sub').forEach(function(s,i){gsap.fromTo(s,{opacity:0,y:22},{opacity:1,y:0,duration:.45,delay:(i%2)*.08,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 95%',once:true}});});
    gsap.fromTo('.cl-tabs',{opacity:0,y:26},{opacity:1,y:0,duration:.6,ease:'power3.out',scrollTrigger:{trigger:'.cl-tabs',start:'top 95%',once:true}});
    gsap.fromTo('.sa-cta',{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 95%',once:true}});
  }
  bind(d.querySelectorAll('.cl-tab,.cl-out,.cl-sub,.cl-tstep,.cl-layer,a,button'));
  mag(d.querySelectorAll('.btn'));
});

})();