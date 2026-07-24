;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var TR={
    en:{'eb':'Case study','h1':'Building IT & Digital Strategy for Regional Healthcare.','m1':'Industry:','m1v':'Healthcare','m2':'Service:','m2v':'Strategy & Advisory','m3':'Region:','m3v':'Canada','m4':'Frameworks:','m4v':'Gartner TIME, NIST, COBIT, ITIL','nav':'On this page','n1':'Client background','n2':'Objectives','n3':'Our approach','n4':'Technologies','n5':'Results','n6':'Conclusion','bg.h':'Client background','bg.p':'A Canadian healthcare organization providing community-based healthcare services across the region. The organization is leading a collaborative program between several partner organizations, aiming to improve outcomes for a targeted population by enhancing coordination, service delivery, and digital connectivity.','obj.h':'Main objectives','obj.p':'The goal was to develop an Information and Digital Strategy to support a regional health equity initiative. AIM was specifically tasked with:','ap.h':'Our approach','ap.p':'AIM\u2019s engagement was structured into six phases, each building on the previous to deliver a comprehensive, actionable strategy:','p1.h':'Requirements review & documentation','p1.p':'Collected and validated business and IT requirements across all partner organizations.','p2.h':'Systems review & gap analysis','p2.p':'Conducted a detailed IT assessment to identify overlaps, risks, and modernization opportunities.','p3.h':'Market scan & solution options','p3.p':'Evaluated potential technology platforms including CRM, case management, and data integration tools.','p4.h':'Solution selection process','p4.p':'Facilitated stakeholder alignment and recommended the most suitable solution stack.','p5.h':'Implementation & procurement planning','p5.p':'Developed a high-level rollout roadmap, procurement strategy, and governance plan.','p6.h':'Implementation oversight','p6.p':'Supported the client\u2019s execution team with technical guidance and validation of outcomes.','tech.h':'Technologies & frameworks','tech.p':'AIM\u2019s multidisciplinary team leveraged its digital transformation framework based on industry best practices.','res.h':'Results & expected outcomes','con.h':'Conclusion','cta.eb':'Start your project','cta.h':'Have a similar challenge?','cta.p':'Let\u2019s discuss how AIM can architect a digital strategy tailored to your organization.','cta.btn':'Connect with us \u2192'},
    fr:{'eb':'\u00c9tude de cas','h1':'Strat\u00e9gie TI et num\u00e9rique pour les soins de sant\u00e9 r\u00e9gionaux.','m1':'Industrie:','m1v':'Sant\u00e9','m2':'Service:','m2v':'Strat\u00e9gie et conseil','m3':'R\u00e9gion:','m3v':'Canada','m4':'Cadres:','m4v':'Gartner TIME, NIST, COBIT, ITIL','nav':'Sur cette page','n1':'Contexte client','n2':'Objectifs','n3':'Notre approche','n4':'Technologies','n5':'R\u00e9sultats','n6':'Conclusion','bg.h':'Contexte client','bg.p':'Une organisation canadienne de sant\u00e9 communautaire fournissant des services de sant\u00e9 dans la r\u00e9gion. L\u2019organisation dirige un programme collaboratif entre plusieurs partenaires, visant \u00e0 am\u00e9liorer les r\u00e9sultats pour une population cibl\u00e9e en renfor\u00e7ant la coordination et la connectivit\u00e9 num\u00e9rique.','obj.h':'Objectifs principaux','obj.p':'L\u2019objectif \u00e9tait de d\u00e9velopper une strat\u00e9gie d\u2019information et num\u00e9rique pour une initiative r\u00e9gionale d\u2019\u00e9quit\u00e9 en sant\u00e9. AIM a \u00e9t\u00e9 mandat\u00e9e pour:','ap.h':'Notre approche','ap.p':'L\u2019engagement d\u2019AIM a \u00e9t\u00e9 structur\u00e9 en six phases, chacune s\u2019appuyant sur la pr\u00e9c\u00e9dente:','p1.h':'Revue et documentation des exigences','p1.p':'Collecte et validation des exigences m\u00e9tier et TI de tous les partenaires.','p2.h':'Revue des syst\u00e8mes et analyse des \u00e9carts','p2.p':'\u00c9valuation d\u00e9taill\u00e9e des TI pour identifier les chevauchements, risques et opportunit\u00e9s.','p3.h':'Analyse du march\u00e9 et options','p3.p':'\u00c9valuation des plateformes technologiques incluant CRM, gestion de cas et int\u00e9gration.','p4.h':'Processus de s\u00e9lection de solution','p4.p':'Alignement des parties prenantes et recommandation de la pile technologique optimale.','p5.h':'Planification de mise en \u0153uvre et approvisionnement','p5.p':'D\u00e9veloppement d\u2019une feuille de route, strat\u00e9gie d\u2019approvisionnement et plan de gouvernance.','p6.h':'Supervision de la mise en \u0153uvre','p6.p':'Soutien de l\u2019\u00e9quipe d\u2019ex\u00e9cution avec des conseils techniques et validation des r\u00e9sultats.','tech.h':'Technologies et cadres','tech.p':'L\u2019\u00e9quipe multidisciplinaire d\u2019AIM a utilis\u00e9 son cadre de transformation num\u00e9rique bas\u00e9 sur les meilleures pratiques.','res.h':'R\u00e9sultats et impacts attendus','con.h':'Conclusion','cta.eb':'D\u00e9marrer votre projet','cta.h':'Un d\u00e9fi similaire?','cta.p':'Discutons comment AIM peut concevoir une strat\u00e9gie num\u00e9rique adapt\u00e9e \u00e0 votre organisation.','cta.btn':'Contactez-nous \u2192'}
  };
  var MAP=[['eb','.cs-hero .eyebrow'],['h1','.cs-hero .h1'],['bg.h','#background'],['bg.p','#background + p'],['obj.h','#objectives'],['obj.p','#objectives + p'],['ap.h','#approach'],['ap.p','#approach + p'],['p1.h','.cs-phase:nth-child(1) h3'],['p1.p','.cs-phase:nth-child(1) p'],['p2.h','.cs-phase:nth-child(2) h3'],['p2.p','.cs-phase:nth-child(2) p'],['p3.h','.cs-phase:nth-child(3) h3'],['p3.p','.cs-phase:nth-child(3) p'],['p4.h','.cs-phase:nth-child(4) h3'],['p4.p','.cs-phase:nth-child(4) p'],['p5.h','.cs-phase:nth-child(5) h3'],['p5.p','.cs-phase:nth-child(5) p'],['p6.h','.cs-phase:nth-child(6) h3'],['p6.p','.cs-phase:nth-child(6) p'],['tech.h','#tech'],['tech.p','#tech + p'],['res.h','#results'],['con.h','#conclusion'],['cta.eb','.cs-cta .eyebrow'],['cta.h','.cs-cta h2'],['cta.p','.cs-cta p'],['cta.btn','.cs-cta .btn'],['nav','.cs-nav h4']];
  function translate(){
    var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;
    MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});
    /* Sidebar links */
    var links=d.querySelectorAll('.cs-nav a');
    var lk=['n1','n2','n3','n4','n5','n6'];
    links.forEach(function(a,i){if(dict[lk[i]])a.textContent=dict[lk[i]];});
    /* Meta tags */
    var tags=d.querySelectorAll('.cs-tag');
    var mk=[['m1','m1v'],['m2','m2v'],['m3','m3v'],['m4','m4v']];
    tags.forEach(function(t,i){if(mk[i]){var spans=t.querySelectorAll('span');if(spans[0]&&dict[mk[i][0]])spans[0].textContent=dict[mk[i][0]];}});
  }
  translate();window.addEventListener('aim-lang-change',translate);
  /* Smooth scroll for sidebar links */
  d.querySelectorAll('.cs-nav a').forEach(function(a){
    a.addEventListener('click',function(e){
      var href=this.getAttribute('href');if(!href||href.charAt(0)!=='#')return;
      var target=d.querySelector(href);if(!target)return;
      e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
  /* Animations */
  if(window.gsap&&window.ScrollTrigger&&!rm){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.cs-hero .wrap > *',{opacity:0,y:28,stagger:.1,duration:.7,ease:'power3.out',delay:.1});
    d.querySelectorAll('.cs-phase').forEach(function(p,i){
      gsap.from(p,{opacity:0,x:-24,duration:.5,delay:i*.08,ease:'power3.out',scrollTrigger:{trigger:p,start:'top 88%',once:true}});
    });
    d.querySelectorAll('.cs-result').forEach(function(r,i){
      gsap.from(r,{opacity:0,y:20,duration:.45,delay:i*.06,ease:'power3.out',scrollTrigger:{trigger:r,start:'top 90%',once:true}});
    });
    d.querySelectorAll('.cs-fw span').forEach(function(s,i){
      gsap.from(s,{opacity:0,y:14,duration:.35,delay:i*.05,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 92%',once:true}});
    });
    gsap.from('.cs-cta',{opacity:0,y:32,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.cs-cta',start:'top 85%',once:true}});
  }
  bind(d.querySelectorAll('.cs-nav a,.cs-tag,.cs-fw span,.cs-result,.cs-cta,.btn,a'));
});

})();