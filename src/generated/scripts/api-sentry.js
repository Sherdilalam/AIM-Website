;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  if(window.gsap&&!rm){gsap.from('.prod-hero .hero-copy > *',{opacity:0,y:36,stagger:.12,duration:.9,ease:'power3.out',delay:.1});gsap.from('.prod-visual',{opacity:0,scale:.9,duration:1.1,ease:'power3.out',delay:.25});}
  /* feature tabs */
  var tabs=d.querySelectorAll('.ft-tab'),panels=d.querySelectorAll('.ft-panel');
  tabs.forEach(function(tb){tb.addEventListener('click',function(){var i=+tb.dataset.f;tabs.forEach(function(x){x.classList.remove('active');});panels.forEach(function(x){x.classList.remove('active');});tb.classList.add('active');if(panels[i])panels[i].classList.add('active');});});
  bind(d.querySelectorAll('.step,.uc,.int-card,.ft-tab,a,.btn'));
  window.aimI18n=window.aimI18n||{};
  Object.assign(window.aimI18n,{
    'as.eb':{en:'API Sentry',fr:'API Sentry'},
    'as.h1':{en:'Real-time API security and monitoring.',fr:'Sécurité et surveillance API en temps réel.'},
    'as.ch.eb':{en:'The challenge',fr:'Le défi'},
    'as.ch.h2':{en:'APIs are your biggest attack surface.',fr:'Les API sont votre plus grande surface d’attaque.'},
    'as.ft.eb':{en:'Capabilities',fr:'Fonctionnalités'},
    'as.ft.h2':{en:'One solution for API security.',fr:'Une solution pour la sécurité API.'},
    'as.int.eb':{en:'Integrations',fr:'Intégrations'},
    'as.int.h2':{en:'Connects to the tools you already use.',fr:'Se connecte aux outils que vous utilisez déjà.'},
    'as.sec.eb':{en:'Security by design',fr:'Sécurité par conception'},
    'as.sec.h2':{en:'Built secure from the ground up.',fr:'Conçu sécuritaire dès le départ.'},
    'as.cta.h2':{en:'Secure your API infrastructure.',fr:'Sécurisez votre infrastructure API.'}
  });
  if(window.aimSetLang) window.aimSetLang(window.aimGetLang?window.aimGetLang():'en');
  /* ===== FULL PAGE TRANSLATIONS (API_SENTRY) ===== */
  var PT={".prod-hero .h1": {"en": "Real-time API security and monitoring.", "fr": "Sécurité et surveillance API en temps réel."}, ".prod-hero .sub": {"en": "Monitor, detect, and respond to threats across your API management platforms - in near real-time, with zero JVM dependencies and seamless cloud integration.", "fr": "Surveillez, détectez et répondez aux menaces sur vos plateformes de gestion API - en temps quasi réel, sans dépendances JVM."}, ".prod-hero .btn-primary": {"en": "Request a demo →", "fr": "Demander une démo →"}, ".prod-hero .btn-ghost": {"en": "See features", "fr": "Voir les fonctionnalités"}, ".sec-head .eyebrow": [{"en": "The challenge", "fr": "Le défi"}, {"en": "Capabilities", "fr": "Fonctionnalités"}, {"en": "Integrations", "fr": "Intégrations"}, {"en": "Security by design", "fr": "Sécurité par conception"}], ".sec-head .heading": [{"en": "APIs are your biggest attack surface.", "fr": "Les API sont votre plus grande surface d’attaque."}, {"en": "One solution for API security.", "fr": "Une solution complète pour la sécurité API."}, {"en": "Connects to the tools you already use.", "fr": "Se connecte aux outils que vous utilisez déjà."}, {"en": "Built secure from the ground up.", "fr": "Construit sécurisé dès le départ."}], ".p-split .stext p:nth-child(3)": [{"en": "As enterprises shift toward digital transformation, APIs become the connective tissue between platforms, data, and users. But every API endpoint is a potential vulnerability.", "fr": "Alors que les entreprises se transforment numériquement, les API deviennent le tissu connectif. Mais chaque point d’accès API est une vulnérabilité potentielle."}], ".p-split .stext p:nth-child(4)": [{"en": "Security teams need visibility into suspicious behavior - not hours later, but in real time. API Sentry was built to close that gap.", "fr": "Les équipes de sécurité ont besoin de visibilité en temps réel. API Sentry a été conçu pour combler cette lacune."}], ".ft-tab:nth-child(1)": {"en": "Real-time detection", "fr": "Détection en temps réel"}, ".ft-tab:nth-child(2)": {"en": "Low footprint", "fr": "Empreinte légère"}, ".ft-tab:nth-child(3)": {"en": "Enrichable alerts", "fr": "Alertes enrichissables"}, ".ft-tab:nth-child(4)": {"en": "Long-term analysis", "fr": "Analyse à long terme"}, ".step:nth-child(1) h3": {"en": "Secure CI/CD pipeline", "fr": "Pipeline CI/CD sécurisé"}, ".step:nth-child(1) p": {"en": "Continuous tracking of third-party vulnerabilities and secure code practices embedded in every release.", "fr": "Suivi continu des vulnérabilités tierces et pratiques de code sécurisé intégrées à chaque version."}, ".step:nth-child(2) h3": {"en": "Rigorous development", "fr": "Développement rigoureux"}, ".step:nth-child(2) p": {"en": "Security-first development processes ensuring the highest standards at every stage of the product lifecycle.", "fr": "Processus de développement sécurité d’abord assurant les plus hauts standards à chaque étape."}, ".step:nth-child(3) h3": {"en": "Compliance-ready", "fr": "Prêt pour la conformité"}, ".step:nth-child(3) p": {"en": "Aligned to enterprise security frameworks including SABSA, NIST, and ISO 27001.", "fr": "Aligné sur les cadres de sécurité d’entreprise incluant SABSA, NIST et ISO 27001."}, ".cta h2": {"en": "Secure your API infrastructure.", "fr": "Sécurisez votre infrastructure API."}, ".cta p": {"en": "See API Sentry in action - request a personalized demo from our team.", "fr": "Voyez API Sentry en action - demandez une démo personnalisée."}, ".cta .btn-primary": {"en": "Request a demo →", "fr": "Demander une démo →"}};
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
  window.addEventListener('aim-lang-change',applyPageTrans);
});

})();