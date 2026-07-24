;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var TR={
    en:{'eb':'Support center','h1':'How can we help?','sub':'Search our knowledge base or browse categories below. Whether you need technical help, pricing clarity, or onboarding guidance - our team is standing by.','search':'Search for help articles, guides, or topics...','cta1':'Contact support','cta2':'Browse topics','ch.eb':'How to reach us','ch.h2':'Choose your channel.','c1.h':'Email support','c1.p':'Send us a detailed message and our team will respond within one business day.','c2.h':'Phone','c2.p':'Speak directly with a support specialist during business hours.','c3.h':'Support portal','c3.p':'Submit and track tickets through our dedicated client support portal.','cat.eb':'Browse by topic','cat.h2':'What do you need help with?','s1.h':'Technical support','s1.p':'Solutions to technical challenges with AIM products or integrations.','s2.h':'Getting started','s2.p':'Onboarding guides, setup walkthroughs, and quick-start resources.','s3.h':'Pricing and licensing','s3.p':'Clarity on pricing models, licensing options, and billing inquiries.','s4.h':'Feature requests','s4.p':'Share ideas for new features or improvements. We build what clients need.','s5.h':'Trial assistance','s5.p':'Questions about trials? We will guide you through evaluation and next steps.','s6.h':'Documentation','s6.p':'API references, integration guides, and technical documentation.','prod.eb':'Product support','prod.h2':'Get help for a specific product.','hrs.h':'Support hours','hrs.p':'The AIM Support team is available during business hours, Monday through Friday, 9:00 AM - 6:00 PM EST.','nc.h':'Not an active customer?','nc.p':'We can still help. Whether you are evaluating AIM products, need a consultation, or want to understand how our solutions fit your needs.','reach.eb':'Reach us directly','reach.h2':'Still need help?','e.h':'Email','ph.h':'Phone','po.h':'Support portal','cta.eb':'Partnership mindset','cta.h2':'Together, let\'s keep your business in motion.','cta.p':'Great service goes beyond solutions. It is about partnership - reliable, responsive, and built to last.','cta.btn1':'Connect with us','cta.btn2':'Learn about AIM'},
    fr:{'eb':'Centre de soutien','h1':'Comment pouvons-nous aider?','sub':'Recherchez dans notre base de connaissances ou parcourez les cat\u00e9gories ci-dessous. Que vous ayez besoin d\'aide technique, de clart\u00e9 sur les prix ou de conseils - notre \u00e9quipe est pr\u00eate.','search':'Rechercher des articles d\'aide, guides ou sujets...','cta1':'Contacter le soutien','cta2':'Parcourir les sujets','ch.eb':'Comment nous joindre','ch.h2':'Choisissez votre canal.','c1.h':'Soutien par courriel','c1.p':'Envoyez-nous un message d\u00e9taill\u00e9 et notre \u00e9quipe r\u00e9pondra dans un jour ouvrable.','c2.h':'T\u00e9l\u00e9phone','c2.p':'Parlez directement \u00e0 un sp\u00e9cialiste pendant les heures d\'affaires.','c3.h':'Portail de soutien','c3.p':'Soumettez et suivez vos billets via notre portail client d\u00e9di\u00e9.','cat.eb':'Parcourir par sujet','cat.h2':'De quoi avez-vous besoin?','s1.h':'Soutien technique','s1.p':'Solutions aux d\u00e9fis techniques avec les produits ou int\u00e9grations AIM.','s2.h':'Mise en route','s2.p':'Guides d\'int\u00e9gration, proc\u00e9dures et ressources de d\u00e9marrage rapide.','s3.h':'Prix et licences','s3.p':'Clart\u00e9 sur les mod\u00e8les de prix, options de licence et facturation.','s4.h':'Demandes de fonctionnalit\u00e9s','s4.p':'Partagez vos id\u00e9es pour de nouvelles fonctionnalit\u00e9s. Nous construisons ce dont les clients ont besoin.','s5.h':'Assistance d\'essai','s5.p':'Questions sur les essais? Nous vous guiderons \u00e0 chaque \u00e9tape.','s6.h':'Documentation','s6.p':'R\u00e9f\u00e9rences API, guides d\'int\u00e9gration et documentation technique.','prod.eb':'Soutien produit','prod.h2':'Obtenir de l\'aide pour un produit sp\u00e9cifique.','hrs.h':'Heures de soutien','hrs.p':'L\'\u00e9quipe de soutien AIM est disponible du lundi au vendredi, 9h - 18h HNE.','nc.h':'Pas encore client?','nc.p':'Nous pouvons quand m\u00eame vous aider. Que vous \u00e9valuiez nos produits ou souhaitiez comprendre nos solutions.','reach.eb':'Nous joindre directement','reach.h2':'Besoin d\'aide suppl\u00e9mentaire?','e.h':'Courriel','ph.h':'T\u00e9l\u00e9phone','po.h':'Portail de soutien','cta.eb':'Mentalit\u00e9 de partenariat','cta.h2':'Ensemble, gardons votre entreprise en mouvement.','cta.p':'Un excellent service va au-del\u00e0 des solutions. C\'est un partenariat - fiable, r\u00e9actif et durable.','cta.btn1':'Contactez-nous','cta.btn2':'En savoir plus sur AIM'}
  };
  var MAP=[['eb','.su-hero .eyebrow'],['h1','.su-hero .h1'],['sub','.su-hero .sub'],['cta1','.su-hero .btn-primary'],['cta2','.su-hero .btn-ghost'],['ch.eb','#su-ch-head .eyebrow'],['ch.h2','#su-ch-head .heading'],['c1.h','.su-ch:nth-child(1) h3'],['c1.p','.su-ch:nth-child(1) p'],['c2.h','.su-ch:nth-child(2) h3'],['c2.p','.su-ch:nth-child(2) p'],['c3.h','.su-ch:nth-child(3) h3'],['c3.p','.su-ch:nth-child(3) p'],['cat.eb','#su-cat-head .eyebrow'],['cat.h2','#su-cat-head .heading'],['s1.h','.su-cat:nth-child(1) h3'],['s1.p','.su-cat:nth-child(1) p'],['s2.h','.su-cat:nth-child(2) h3'],['s2.p','.su-cat:nth-child(2) p'],['s3.h','.su-cat:nth-child(3) h3'],['s3.p','.su-cat:nth-child(3) p'],['s4.h','.su-cat:nth-child(4) h3'],['s4.p','.su-cat:nth-child(4) p'],['s5.h','.su-cat:nth-child(5) h3'],['s5.p','.su-cat:nth-child(5) p'],['s6.h','.su-cat:nth-child(6) h3'],['s6.p','.su-cat:nth-child(6) p'],['prod.eb','#su-prod-head .eyebrow'],['prod.h2','#su-prod-head .heading'],['hrs.h','.su-box:nth-child(1) h3'],['nc.h','.su-box:nth-child(2) h3'],['reach.eb','#su-reach-head .eyebrow'],['reach.h2','#su-reach-head .heading'],['e.h','.su-cc:nth-child(1) h4'],['ph.h','.su-cc:nth-child(2) h4'],['po.h','.su-cc:nth-child(3) h4'],['cta.eb','.su-cta .eyebrow'],['cta.h2','.su-cta .heading'],['cta.p','.su-cta p'],['cta.btn1','.su-cta .btn-primary'],['cta.btn2','.su-cta .btn-ghost']];
  function translate(){
    var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;
    MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});
  }
  translate();window.addEventListener('aim-lang-change',translate);
  /* Animations */
  if(window.gsap&&window.ScrollTrigger&&!rm){
    gsap.registerPlugin(ScrollTrigger);
    /* Hero entrance */
    var tl=gsap.timeline({delay:.15});
    tl.from('.su-hero .eyebrow',{opacity:0,y:16,duration:.5,ease:'power3.out'})
      .from('.su-hero .h1',{opacity:0,y:28,duration:.8,ease:'power3.out'},'-=.3')
      .from('.su-hero .btn-row',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.2');
    /* Channel cards - stagger + lift */
    d.querySelectorAll('.su-ch').forEach(function(c,i){
      gsap.from(c,{opacity:0,y:40,duration:.7,delay:i*.12,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});
    });
    /* Category cards - stagger from left */
    d.querySelectorAll('.su-cat').forEach(function(c,i){
      gsap.from(c,{opacity:0,x:-20,duration:.5,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 90%',once:true}});
    });
    /* Product pills - rapid stagger */
    d.querySelectorAll('.su-prod').forEach(function(p,i){
      gsap.from(p,{opacity:0,y:20,scale:.95,duration:.4,delay:i*.06,ease:'power3.out',scrollTrigger:{trigger:p,start:'top 92%',once:true}});
    });
    /* Info boxes - slide from sides */
    d.querySelectorAll('.su-box').forEach(function(b,i){
      gsap.from(b,{opacity:0,x:i===0?-30:30,duration:.7,ease:'power3.out',scrollTrigger:{trigger:b,start:'top 85%',once:true}});
    });
    /* Contact cards - stagger up */
    d.querySelectorAll('.su-cc').forEach(function(c,i){
      gsap.from(c,{opacity:0,y:28,duration:.5,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});
    });
    /* CTA */
    gsap.from('.su-cta .wrap > *',{opacity:0,y:24,stagger:.1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.su-cta',start:'top 80%',once:true}});
  }
  bind(d.querySelectorAll('.su-ch,.su-cat,.su-prod,.su-cc,.btn,a,input'));
});

})();