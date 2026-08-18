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
    'aa.eb':{en:'AuditAhead',fr:'AuditAhead'},
    'aa.h1':{en:'Intelligent multi-agent audit automation.',fr:'Automatisation d’audit multi-agents intelligente.'},
    'aa.pr.eb':{en:'The problem',fr:'Le problème'},
    'aa.pr.h2':{en:'Reactive audit posture leaves boards exposed.',fr:'La posture d’audit réactive expose les conseils.'},
    'aa.kb.eb':{en:'Key benefits',fr:'Avantages clés'},
    'aa.kb.h2':{en:'Empowering your success.',fr:'Favoriser votre succès.'},
    'aa.ft.eb':{en:'Key features',fr:'Fonctionnalités clés'},
    'aa.ft.h2':{en:'Four specialized agents. One unified audit platform.',fr:'Quatre agents spécialisés. Une plateforme d’audit unifiée.'},
    'aa.tr.eb':{en:'Built for trust',fr:'Conçu pour la confiance'},
    'aa.tr.h2':{en:'Security and evidence architecture.',fr:'Architecture de sécurité et de preuve.'},
    'aa.int.eb':{en:'Built on industry-leading platforms',fr:'Bâti sur des plateformes de pointe'},
    'aa.int.h2':{en:'Seamless integrations.',fr:'Intégrations transparentes.'},
    'aa.cta.h2':{en:'Replace reactive audits with continuous trust.',fr:'Remplacez les audits réactifs par une confiance continue.'}
  });
  if(window.aimSetLang) window.aimSetLang(window.aimGetLang?window.aimGetLang():'en');
  /* ===== FULL PAGE TRANSLATIONS (AUDITAHEAD) ===== */
  var PT={".prod-hero .h1": {"en": "Intelligent multi-agent audit automation.", "fr": "Automatisation d’audit intelligente multi-agents."}, ".prod-hero .sub": {"en": "AIM’s purpose-built audit automation platform for healthcare and compliance-intensive industries. Powered by a four-agent LangGraph architecture on IBM watsonx Orchestrate - compressing audit cycles from days to minutes.", "fr": "La plateforme d’automatisation d’audit d’AIM pour les industries de santé et de conformité. Propulsée par une architecture LangGraph à quatre agents - comprimant les cycles d’audit de jours à minutes."}, ".prod-hero .btn-primary": {"en": "Connect with us →", "fr": "Connectez-nous →"}, ".prod-hero .btn-ghost": {"en": "See how it works", "fr": "Découvrir le fonctionnement"}, ".ft-tab:nth-child(1)": {"en": "Consent compliance", "fr": "Conformité du consentement"}, ".ft-tab:nth-child(2)": {"en": "Claims analysis", "fr": "Analyse des réclamations"}, ".ft-tab:nth-child(3)": {"en": "Forensic review", "fr": "Examen forensique"}, ".ft-tab:nth-child(4)": {"en": "Audit attestation", "fr": "Attestation d’audit"}, ".step:nth-child(1) h3": {"en": "HMAC-SHA256 signing", "fr": "Signature HMAC-SHA256"}, ".step:nth-child(2) h3": {"en": "Append-only evidence ledger", "fr": "Registre de preuves en ajout seulement"}, ".step:nth-child(3) h3": {"en": "12-point end-to-end validation", "fr": "Validation bout en bout en 12 points"}, ".sa-cta h2": {"en": "Replace reactive audits with continuous trust.", "fr": "Remplacez les audits réactifs par une confiance continue."}, ".sa-cta p": {"en": "See AuditAhead in action - from batch intake to board-ready attestation in under 30 seconds.", "fr": "Voyez AuditAhead en action - de l’entrée de lot à l’attestation en moins de 30 secondes."}, ".sa-cta .btn-primary": {"en": "Connect with us →", "fr": "Connectez-nous →"}};
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