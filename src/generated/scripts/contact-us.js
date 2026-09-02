;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var TR={
    en:{'eb':'Contact us','h1':'Let\'s start a conversation.','sub':'Have a question, project, or idea? Reach out to learn more about our services, request a consultation, or explore how AIM can support your goals.','o1':'Canada (HQ)',},
    fr:{'eb':'Contactez-nous','h1':'D\u00e9marrons une conversation.','sub':'Une question, un projet ou une id\u00e9e? Contactez notre \u00e9quipe pour en savoir plus sur nos services ou d\u00e9marrer une conversation.','o1':'Canada (Si\u00e8ge)',}
  };
  var MAP=[['eb','.ct-hero .eyebrow'],['h1','.ct-hero .h1'],['sub','.ct-hero .sub'],['o1','.ct-office:nth-child(1) h3']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});
  }
  translate();window.addEventListener('aim-lang-change',translate);
  if(window.gsap&&window.ScrollTrigger&&!rm){gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({delay:.15});tl.from('.ct-hero .eyebrow',{opacity:0,y:14,duration:.45,ease:'power3.out'}).from('.ct-hero .h1',{opacity:0,y:28,duration:.8,ease:'power3.out'},'-=.25').from('.ct-hero .sub',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3').from('.ct-hero .btn',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.2').from('.ct-hero-visual',{opacity:0,x:50,scale:.96,duration:1,ease:'power3.out'},'-=.7');
    d.querySelectorAll('.ct-office').forEach(function(c,i){gsap.from(c,{opacity:0,x:-24,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 90%',once:true}});});
    gsap.from('.ct-form',{opacity:0,y:36,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.ct-form',start:'top 85%',once:true}});
    gsap.from('.ct-map',{opacity:0,y:24,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.ct-map',start:'top 88%',once:true}});
  }
  bind(d.querySelectorAll('.ct-office,.btn,a,input,textarea,select'));
});

})();