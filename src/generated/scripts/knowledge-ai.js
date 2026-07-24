;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var TR={
    en:{'eb':'Knowledge AI','h1':'Your documents have answers. Ask them.','lead':'Turn organizational documents into an intelligent knowledge base. Upload files, ask questions in natural language, get accurate answers with source citations.','cta1':'Request a demo','cta2':'See how it works','prob.eb':'The problem','prob.h2':'Knowledge fragmentation is your hidden productivity drain.','how.eb':'How it works','how.h2':'Three steps to actionable answers.','s1.h':'Upload','s2.h':'Ask','s3.h':'Act','cap.eb':'Our capabilities','cap.h2':'Intelligence built for enterprise documents.','c1.h':'Multi-format document support','c2.h':'Source citations on every answer','c3.h':'Intelligent document processing','c4.h':'Natural language queries','c5.h':'Enterprise security','c6.h':'Conversation context','int.eb':'Ecosystem integrations','int.h2':'Connect with the tools you already use.','end.eb':'See it in action','end.h2':'Experience Knowledge AI live.','end.p':'Upload a document and ask it a question. See how Knowledge AI turns your organizational documents into an interactive knowledge base.','end.btn1':'Request a demo','end.btn2':'Contact support'},
    fr:{'eb':'Knowledge AI','h1':'Vos documents ont des r\u00e9ponses. Posez-leur la question.','lead':'Transformez vos documents organisationnels en base de connaissances intelligente. T\u00e9l\u00e9versez des fichiers, posez des questions en langage naturel, obtenez des r\u00e9ponses pr\u00e9cises avec citations.','cta1':'Demander une d\u00e9mo','cta2':'Voir comment \u00e7a fonctionne','prob.eb':'Le probl\u00e8me','prob.h2':'La fragmentation des connaissances est votre perte de productivit\u00e9 cach\u00e9e.','how.eb':'Comment \u00e7a fonctionne','how.h2':'Trois \u00e9tapes vers des r\u00e9ponses exploitables.','s1.h':'T\u00e9l\u00e9verser','s2.h':'Demander','s3.h':'Agir','cap.eb':'Nos capacit\u00e9s','cap.h2':'Intelligence con\u00e7ue pour les documents d\'entreprise.','c1.h':'Support multi-format','c2.h':'Citations sources sur chaque r\u00e9ponse','c3.h':'Traitement intelligent des documents','c4.h':'Requ\u00eates en langage naturel','c5.h':'S\u00e9curit\u00e9 d\'entreprise','c6.h':'Contexte conversationnel','int.eb':'Int\u00e9grations \u00e9cosyst\u00e8me','int.h2':'Connectez-vous aux outils que vous utilisez d\u00e9j\u00e0.','end.eb':'Voir en action','end.h2':'D\u00e9couvrez Knowledge AI en direct.','end.p':'T\u00e9l\u00e9versez un document et posez-lui une question. D\u00e9couvrez comment Knowledge AI transforme vos documents.','end.btn1':'Demander une d\u00e9mo','end.btn2':'Contacter le soutien'}
  };
  var MAP=[['eb','.ka-hero .eyebrow'],['h1','.ka-hero .h1'],['lead','.ka-hero .lead'],['cta1','.ka-hero .btn-primary'],['cta2','.ka-hero .btn-ghost'],['prob.eb','#ka-problem .eyebrow'],['prob.h2','#ka-problem .heading'],['how.eb','#ka-how-head .eyebrow'],['how.h2','#ka-how-head .heading'],['s1.h','.ka-step:nth-child(1) h3'],['s2.h','.ka-step:nth-child(2) h3'],['s3.h','.ka-step:nth-child(3) h3'],['cap.eb','#ka-cap-head .eyebrow'],['cap.h2','#ka-cap-head .heading'],['c1.h','.ka-cap:nth-child(1) h3'],['c2.h','.ka-cap:nth-child(2) h3'],['c3.h','.ka-cap:nth-child(3) h3'],['c4.h','.ka-cap:nth-child(4) h3'],['c5.h','.ka-cap:nth-child(5) h3'],['c6.h','.ka-cap:nth-child(6) h3'],['int.eb','#ka-int-head .eyebrow'],['int.h2','#ka-int-head .heading'],['end.eb','.ka-cta .eyebrow'],['end.h2','.ka-cta .heading'],['end.p','.ka-cta p'],['end.btn1','.ka-cta .btn-primary'],['end.btn2','.ka-cta .btn-ghost']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});}
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});
    tl.from('.ka-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'}).from('.ka-hero .sub-h',{opacity:0,y:12,duration:.4,ease:'power3.out'},'-=.2')
      .from('.ka-hero .h1',{opacity:0,y:28,duration:.8,ease:'power3.out'},'-=.25')
      .from('.ka-hero .lead',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3')
      .from('.ka-formats',{opacity:0,y:12,duration:.4,ease:'power3.out'},'-=.2').from('.ka-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.2')
      .from('.ka-mockup',{opacity:0,x:50,scale:.96,duration:1,ease:'power3.out'},'-=.7');
    /* Chat messages type in */
    d.querySelectorAll('.ka-mock-msg').forEach(function(m,i){
      gsap.from(m,{opacity:0,y:12,duration:.4,delay:1+i*.3,ease:'power3.out'});
    });
    gsap.from('.ka-prob > div:first-child',{opacity:0,x:-30,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.ka-prob',start:'top 82%',once:true}});
    gsap.from('.ka-prob-img',{opacity:0,x:30,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.ka-prob',start:'top 82%',once:true}});
    d.querySelectorAll('.ka-step').forEach(function(s,i){gsap.from(s,{opacity:0,y:36,duration:.6,delay:i*.12,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 88%',once:true}});});
    d.querySelectorAll('.ka-cap').forEach(function(c,i){gsap.from(c,{opacity:0,y:28,duration:.5,delay:(i%3)*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});});
    d.querySelectorAll('.ka-int-logo').forEach(function(l,i){gsap.from(l,{opacity:0,y:16,duration:.4,delay:i*.06,ease:'power3.out',scrollTrigger:{trigger:l,start:'top 92%',once:true}});});
  }
  bind(d.querySelectorAll('.ka-step,.ka-cap,.ka-int-logo,.btn,a'));
});

})();