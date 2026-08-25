;(function(){

window.addEventListener('load', function(){
  /* ===== ABOUT PAGE TRANSLATIONS ===== */
  window.aimI18n = window.aimI18n || {};
  var T={
    'ab.hero.eb':{en:'About AIM',fr:'À propos d’AIM'},
    'ab.hero.h1':{en:'We move organizations <span class="g">forward.</span>',fr:'Nous faisons avancer les organisations <span class="g">vers l’avant.</span>'},
    'ab.hero.sub':{en:'AIM architects the complete AI stack - from enterprise data foundations to production-ready agents. One partner. The full journey. No handoffs.',fr:'AIM conçoit la pile IA complète - des fondations de données aux agents en production. Un partenaire. Le parcours complet. Aucun transfert.'},
    'ab.hero.cta1':{en:'Connect with us →',fr:'Contactez-nous →'},
    'ab.hero.cta2':{en:'How we work',fr:'Notre approche'},
    'ab.p1':{en:'Canada-headquartered',fr:'Siège au Canada'},
    'ab.p2':{en:'North America & beyond',fr:'Amérique du Nord et au-delà'},
    'ab.p3':{en:'Architecture-First',fr:'Priorité à l’architecture'},
    'ab.p4':{en:'AI & Data engineering',fr:'Ingénierie IA et données'},
    'ab.who.eb':{en:'Who we are',fr:'Qui nous sommes'},
    'ab.who.h2':{en:'We design, build, and support digital ecosystems.',fr:'Nous concevons, construisons et soutenons des écosystèmes numériques.'},
    'ab.mis.eb':{en:'Our mission',fr:'Notre mission'},
    'ab.band.eb':{en:'Built for scale',fr:'Con\u00e7u pour l\u2019\u00e9chelle'},
    'ab.band.h2':{en:'Enterprise depth, delivered close to you.',fr:'Expertise d’entreprise, livrée près de vous.'},
    'ab.st0':{en:'Team certifications',fr:'Certifications de l\u2019\u00e9quipe'},
    'ab.st1':{en:'Service practices',fr:'Pratiques de service'},
    'ab.st2':{en:'Platforms mastered',fr:'Plateformes maîtrisées'},
    'ab.st3':{en:'Industries served',fr:'Industries desservies'},
    'ab.why.eb':{en:'Why AIM',fr:'Pourquoi AIM'},
    'ab.why.h2':{en:'What makes us different.',fr:'Ce qui nous distingue.'},
    'ab.how.eb':{en:'How we work',fr:'Notre approche'},
    'ab.how.h2':{en:'A proven path from idea to outcome.',fr:'Un parcours éprouvé de l’idée au résultat.'},
    'ab.edge.eb':{en:'Our edge',fr:'Notre avantage'},
    'ab.edge.h2':{en:'Enterprise depth. Startup speed.',fr:'Profondeur d’entreprise. Vitesse de startup.'},
    'ab.edge.cta':{en:'Book a consultation',fr:'Réserver une consultation'},
    'ab.life.eb':{en:'Life at AIM',fr:'La vie chez AIM'},
    'ab.life.h2':{en:'Built on great people.',fr:'Bâti sur des gens d’exception.'},
    'ab.loc.eb':{en:'Where we are',fr:'Où nous sommes'},
    'ab.loc.h2':{en:'Headquartered in Canada.',fr:'Si\u00e8ge social au Canada.'},
    'ab.fw.eb':{en:'Standards we build to',fr:'Nos standards de référence'},
    'ab.fw.h2':{en:'Trusted frameworks. Proven governance.',fr:'Cadres de confiance. Gouvernance éprouvée.'},
    'ab.cta.eb':{en:'Ready to move forward?',fr:'Prêt à avancer?'},
    'ab.cta.h2':{en:'Let\'s architect what\'s next.',fr:'Architecturons ce qui vient.'}
  };
  Object.assign(window.aimI18n, T);
  /* apply current language to this page */
  if(window.aimSetLang) window.aimSetLang(window.aimGetLang?window.aimGetLang():'en');
  var d=document, b=d.body;
  if(!b) return;
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  /* hero entrance */
  if(window.gsap && !rm){
    gsap.from('.ab-hero .hero-copy > *',{opacity:0,y:42,stagger:.13,duration:1,ease:'power3.out',delay:.15});
  }
  /* mission word-by-word reveal (scroll-scrubbed, Apple-style) */
  var ms=d.getElementById('missionText');
  if(ms && window.gsap && window.ScrollTrigger){
    var raw=ms.innerHTML;
    /* wrap each text node word in a span, preserve existing HTML spans */
    var parts=raw.split(/(<[^>]+>)/);
    var out='';
    parts.forEach(function(p){
      if(p.startsWith('<')){out+=p;}
      else{p.split(/\s+/).forEach(function(w){if(w)out+='<span class="w">'+w+' </span>';});}
    });
    ms.innerHTML=out;
    var ws=ms.querySelectorAll('.w');
    if(!rm && ws.length){
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(ws,{opacity:1,stagger:.04,ease:'none',scrollTrigger:{trigger:ms,start:'top 82%',end:'bottom 55%',scrub:0.5}});
    } else { ws.forEach(function(w){w.style.opacity='1';}); }
  }
  /* approach rows: bind cursor */
  bind(d.querySelectorAll('.apx-row, .fw, .loc, .fig, a, .btn, .acc-btn'));
  /* Why AIM accordion */
  var accItems=d.querySelectorAll('#whyAcc .acc-item');
  accItems.forEach(function(item){
    var btn=item.querySelector('.acc-btn');
    if(btn) btn.addEventListener('click',function(){
      var wasActive=item.classList.contains('active');
      accItems.forEach(function(x){x.classList.remove('active');});
      if(!wasActive) item.classList.add('active');
    });
  });
  /* ===== FULL PAGE TRANSLATIONS (ABOUT) ===== */
  var PT={".split .stext p:nth-child(3)": [{"en": "Architecture in Motion is an enterprise AI and digital engineering consultancy headquartered in Mississauga, Canada, serving clients across North America, the Middle East, and beyond.", "fr": "Architecture in Motion est un cabinet-conseil en IA d’entreprise et ingénierie numérique basé à Mississauga, Canada, servant des clients en Amérique du Nord, au Moyen-Orient et au-delà."}], ".split .stext p:nth-child(4)": [{"en": "We bring together strategists, architects, engineers, and data specialists united by one mandate - helping organizations deliver governed, production-ready technology that creates lasting business value.", "fr": "Nous réunissons stratèges, architectes, ingénieurs et spécialistes des données avec un seul mandat - aider les organisations à livrer une technologie gouvernée et prête pour la production."}], ".split .stext p:nth-child(5)": [{"en": "Architecture-first. Outcome-driven. Vendor-neutral. Not a tagline - the operating model behind every engagement we run.", "fr": "Architecture d’abord. Axé résultats. Neutralité fournisseur. Pas un slogan - le modèle opérationnel derrière chaque engagement."}], "#whyAcc .acc-item:nth-child(1) .acc-title": {"en": "Architecture-First Thinking", "fr": "Pensée architecture d’abord"}, "#whyAcc .acc-item:nth-child(2) .acc-title": {"en": "Outcome-Driven Delivery", "fr": "Livraison axée résultats"}, "#whyAcc .acc-item:nth-child(3) .acc-title": {"en": "Vendor-Neutral Guidance", "fr": "Conseils neutres fournisseur"}, "#whyAcc .acc-item:nth-child(4) .acc-title": {"en": "Enterprise Depth, Startup Speed", "fr": "Profondeur d’entreprise, vitesse de startup"}, "#whyAcc .acc-item:nth-child(5) .acc-title": {"en": "End-to-End Ownership", "fr": "Responsabilité de bout en bout"}, "#whyAcc .acc-item:nth-child(1) .acc-body p": {"en": "Every engagement begins with architecture - scalable, governable, built to outlast the project. We don’t start with a vendor or a product. We start with your current state and design toward outcomes.", "fr": "Chaque engagement commence par l’architecture - évolutive, gouvernable, conçue pour durer. Nous ne commençons pas par un fournisseur. Nous partons de votre état actuel."}, "#whyAcc .acc-item:nth-child(2) .acc-body p": {"en": "We tie every recommendation to a measurable result. Faster time-to-insight, reduced audit exposure, accelerated delivery - named, tracked, and proven across every engagement.", "fr": "Chaque recommandation est liée à un résultat mesurable. Temps d’analyse accéléré, exposition réduite, livraison accélérée."}, "#whyAcc .acc-item:nth-child(3) .acc-body p": {"en": "Production fluency across Microsoft, IBM watsonx, Anthropic, Botpress, Broadcom, and more. We recommend what fits - not what we’re incentivized to push.", "fr": "Maîtrise de production chez Microsoft, IBM watsonx, Anthropic, Botpress, Broadcom et plus. Nous recommandons ce qui convient."}, "#whyAcc .acc-item:nth-child(4) .acc-body p": {"en": "The rigour and frameworks of large consultancies without the overhead. Our teams are lean, senior-led, and empowered to move from strategy to production in weeks, not quarters.", "fr": "La rigueur des grands cabinets sans la lourdeur. Nos équipes sont agiles, dirigées par des experts, et passent de la stratégie à la production en semaines."}, "#whyAcc .acc-item:nth-child(5) .acc-body p": {"en": "From discovery through managed operations, we own the full lifecycle. One partner, one architecture, continuous momentum.", "fr": "De la découverte aux opérations gérées, nous sommes responsables du cycle complet. Un partenaire, une architecture, un élan continu."}, ".sec-head .lead": [null, null, null, {"en": "Our model is simple: Advise, Build, Run. A clear, costed roadmap. Production-ready delivery. Managed operations that stay with you.", "fr": "Notre modèle est simple : Conseiller, Construire, Gérer. Une feuille de route claire. Une livraison prête pour la production."}], ".apx-row:nth-child(1) .apx-d": {"en": "We run structured workshops to assess your current state, surface gaps, and identify the opportunities worth building toward - grounded in your architecture, not assumptions.", "fr": "Nous menons des ateliers structurés pour évaluer votre état actuel, identifier les écarts et les opportunités - ancrés dans votre architecture."}, ".apx-row:nth-child(2) .apx-d": {"en": "We shape a business case and phased roadmap, prioritizing by impact, feasibility, and urgency - so the path forward is clear before a single line of code is written.", "fr": "Nous élaborons un dossier d’affaires et une feuille de route phasée, priorisant par impact, faisabilité et urgence."}, ".apx-row:nth-child(3) .apx-d": {"en": "We define the target architecture, align it to leading security and governance frameworks, and detail the flows, services, and test cases that will govern delivery.", "fr": "Nous définissons l’architecture cible, l’alignons sur les cadres de sécurité et de gouvernance, et détaillons les flux et cas de test."}, ".apx-row:nth-child(4) .apx-d": {"en": "We engineer cloud-native systems, governed AI pipelines, unified APIs, and modern applications on robust, scalable backends.", "fr": "Nous concevons des systèmes natifs du nuage, des pipelines IA gouvernés, des API unifiées et des applications modernes."}, ".apx-row:nth-child(5) .apx-d": {"en": "Automated testing across unit, integration, and performance keeps quality measurable and regressions caught before they reach production.", "fr": "Des tests automatisés unitaires, d’intégration et de performance gardent la qualité mesurable."}, ".apx-row:nth-child(6) .apx-d": {"en": "24/7 managed services, L1-L3 support, and proactive monitoring keep your systems performing securely long after launch.", "fr": "Services gérés 24/7, support L1-L3 et surveillance proactive pour garder vos systèmes performants."}, ".split.flip .stext p:nth-child(3)": [{"en": "Most AI projects fail for the same reason - the data wasn’t ready and nobody owned the full problem. AIM has been solving that for years.", "fr": "La plupart des projets IA échouent pour la même raison - les données n’étaient pas prêtes. AIM résout ce problème depuis des années."}], ".split.flip .stext p:nth-child(4)": [{"en": "We take you from data foundation through to working agents, then stay with you to run and improve them over time. One team, accountable from strategy to operations.", "fr": "Nous vous accompagnons des fondations de données aux agents en production, puis restons pour les gérer. Une équipe, responsable de la stratégie aux opérations."}], ".fw:nth-child(1) h3": {"en": "SABSA", "fr": "SABSA"}, ".fw:nth-child(1) p": {"en": "Security architecture aligned to business risk and enterprise requirements.", "fr": "Architecture de sécurité alignée sur les risques d’affaires et les exigences de l’entreprise."}, ".fw:nth-child(2) h3": {"en": "NIST", "fr": "NIST"}, ".fw:nth-child(2) p": {"en": "Cybersecurity framework for identifying, protecting, detecting, and recovering from threats.", "fr": "Cadre de cybersécurité pour identifier, protéger, détecter et récupérer des menaces."}, ".fw:nth-child(3) h3": {"en": "ISO 27001", "fr": "ISO 27001"}, ".fw:nth-child(3) p": {"en": "International standard for information security management systems.", "fr": "Norme internationale pour les systèmes de gestion de la sécurité de l’information."}, ".fw:nth-child(4) h3": {"en": "ITIL V4", "fr": "ITIL V4"}, ".fw:nth-child(4) p": {"en": "Best-practice framework for IT service management and operational excellence.", "fr": "Cadre de bonnes pratiques pour la gestion des services TI et l’excellence opérationnelle."}, ".fw:nth-child(5) h3": {"en": "Agile / SAFe", "fr": "Agile / SAFe"}, ".fw:nth-child(5) p": {"en": "Scaled agile delivery across distributed, cross-functional enterprise teams.", "fr": "Livraison agile à grande échelle pour des équipes interfonctionnelles distribuées."}, ".fw:nth-child(6) h3": {"en": "DevSecOps", "fr": "DevSecOps"}, ".fw:nth-child(6) p": {"en": "Security integrated into every stage of the development and delivery lifecycle.", "fr": "Sécurité intégrée à chaque étape du cycle de développement et de livraison."}, ".sa-cta p": {"en": "Whether you’re modernizing infrastructure, deploying AI, or building a digital product - we’re ready to partner from day one.", "fr": "Que vous modernisiez votre infrastructure, déployiez l’IA ou construisiez un produit numérique - nous sommes prêts à collaborer dès le premier jour."}, ".sa-cta .btn-primary": {"en": "Start a conversation →", "fr": "Démarrer une conversation →"}};
  function applyPageTrans(){
    var L=window.aimGetLang?window.aimGetLang():'en';
    Object.keys(PT).forEach(function(sel){
      var els=document.querySelectorAll(sel);
      els.forEach(function(el,i){
        var v=PT[sel];
        if(Array.isArray(v)){ if(v[i]&&v[i][L]) el.textContent=v[i][L]; }
        else if(v[L]) {
          if(v.html) el.innerHTML=v[L]; else el.textContent=v[L];
        }
      });
    });
  }
  applyPageTrans();
});

})();