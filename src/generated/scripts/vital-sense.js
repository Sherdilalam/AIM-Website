;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;
  if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  /* ===== COMPLETE FR TRANSLATIONS ===== */
  var TR={
    en:{
      'tag':'AIM Product','eb':'Vital Sense',
      'h1':'The AI safety net for maternal hypertension.',
      'counter.cap':'from BP reading to clinical action',
      'sub':'A six-agent AI platform on IBM watsonx Orchestrate that detects and escalates hypertension risk across the third trimester and postpartum window - closing the gap that causes 70% of maternal hypertension deaths.',
      'cta1':'Connect with us \u2192','cta2':'Meet the agents',
      'ov.1':'AI agents','ov.2':'Response','ov.3':'Monitoring',
      'prob.eb':'The problem','prob.h2':'Between obstetric visits, no clinician is watching.',
      'prob.lead':'Hypertensive disorders complicate 1 in 10 U.S. pregnancies. The clinical calendar stops watching after discharge - but the risk doesn\u2019t.',
      'pc1.h':'Pregnancies affected','pc1.p':'U.S. pregnancies complicated by a hypertensive disorder - preeclampsia, gestational hypertension, or chronic hypertension.',
      'pc2.h':'Deaths occur post-discharge','pc2.p':'Maternal hypertension deaths happen after the patient leaves the hospital - in the gap between visits where no one is monitoring.',
      'pc3.h':'Classified as preventable','pc3.p':'The CDC classifies 80% of these deaths as preventable. The gap is not clinical knowledge - it is continuous monitoring between visits.',
      'pc4.h':'Annual U.S. market','pc4.p':'The total addressable market for maternal hypertension monitoring in the United States alone.',
      'ag.eb':'Six AI agents','ag.h2':'One transparent risk verdict.',
      'ag.lead':'Coordinated by a central Supervisor on IBM watsonx Orchestrate, six purpose-built agents work in parallel - from signal intake to patient communication in under 25 seconds.',
      'a1.n':'Agent 01','a1.h':'Signal Intake','a1.p':'Ingests BP readings, symptom SMS, EHR history, and gestational age from four parallel streams. Deduplicates, normalizes, and enriches every signal with patient context.',
      'a1.l1':'Blood pressure readings from connected devices','a1.l2':'Symptom SMS via natural language','a1.l3':'EHR history and gestational age context',
      'a2.n':'Agent 02','a2.h':'Risk Surveillance','a2.p':'Evaluates every blood pressure reading against the patient\u2019s individual baseline and ACOG thresholds - including a postpartum time-window filter that auto-elevates risk during days 0-14.',
      'a2.l1':'Individual baseline comparison','a2.l2':'ACOG threshold evaluation','a2.l3':'Postpartum 0-14 day auto-elevation',
      'a3.n':'Agent 03','a3.h':'Symptom Triage','a3.p':'Uses natural language understanding to parse patient-submitted symptom reports - headache, vision changes, epigastric pain - extracting structured clinical entities that flag preeclampsia warning signs.',
      'a3.l1':'Natural language symptom parsing','a3.l2':'Structured clinical entity extraction','a3.l3':'Preeclampsia warning sign detection',
      'a4.n':'Agent 04','a4.h':'Gestational Context','a4.p':'Applies the correct ACOG clinical threshold based on gestational stage - differentiating third-trimester risk from postpartum risk so no presentation is measured against the wrong standard.',
      'a4.l1':'Stage-aware ACOG thresholds','a4.l2':'Third-trimester vs postpartum differentiation','a4.l3':'Correct clinical standard per window',
      'a5.n':'Agent 05','a5.h':'Clinical Escalation','a5.p':'Pages the on-call OB directly via Microsoft Teams within seconds of a high-severity verdict, and automatically books a telehealth appointment - closing the 72+ hour hand-off gap.',
      'a5.l1':'Direct OB paging via Microsoft Teams','a5.l2':'Automatic telehealth booking','a5.l3':'72+ hour gap elimination',
      'a6.n':'Agent 06','a6.h':'Care Navigator','a6.p':'Sends the patient a plain-language SMS immediately after escalation: what happened, what to do right now, who will call and when, and when to go to Labor and Delivery if symptoms worsen.',
      'a6.l1':'Instant patient SMS notification','a6.l2':'Plain-language clinical guidance','a6.l3':'Clear next-steps and escalation path',
      'ben.eb':'Key benefits','ben.h2':'Designed for the moments that matter most.',
      'b1.h':'Dual-window coverage','b1.p':'Monitors both the third trimester and postpartum period from a single platform with stage-aware ACOG thresholds applied at each window.',
      'b2.h':'Under 25 seconds','b2.p':'From a blood pressure reading to a safe, documented clinical action in under 25 seconds - with zero manual triage required.',
      'b3.h':'Compliant by architecture','b3.p':'End-to-end encryption, signed BAAs, FDA Class II SaMD pathway, Health Canada parallel filing, and continuous AI governance via watsonx.governance.',
      'b4.h':'Proven, preventable impact','b4.p':'80% of maternal hypertension deaths are preventable. 70% occur post-discharge. Vital Sense closes that gap at scale.',
      'cl.eb':'Clinical procurement ready','cl.h2':'Designed for clinical procurement from day one.',
      'c1.h':'FDA SaMD Class II','c1.p':'Architected for 510(k) submission with a predicate device cohort already identified.',
      'c2.h':'Health Canada SaMD Class II','c2.p':'Parallel U.S. and Canadian regulatory pathways for dual-market entry without compliance duplication.',
      'c3.h':'HIPAA and PIPEDA compliant','c3.p':'End-to-end encryption, signed BAAs with all subprocessors, and regional data residency as standard.',
      'c4.h':'Continuous AI governance','c4.p':'Model lineage, drift detection, and bias monitoring via IBM watsonx.governance - audit-ready by default.',
      'int.eb':'Built on industry-leading platforms','int.h2':'Seamless integrations.',
      'cta.eb':'Ready to close the gap?','cta.h2':'See Vital Sense in action.',
      'cta.p':'From blood pressure reading to documented clinical action in under 25 seconds. Connect with our team for a walkthrough.',
      'cta.btn1':'Connect with us \u2192','cta.btn2':'Download overview'
    },
    fr:{
      'tag':'Produit AIM','eb':'Vital Sense',
      'h1':'Le filet de s\u00e9curit\u00e9 IA pour l\u2019hypertension maternelle.',
      'counter.cap':'de la lecture de PA \u00e0 l\u2019action clinique',
      'sub':'Une plateforme IA \u00e0 six agents sur IBM watsonx Orchestrate qui d\u00e9tecte et escalade le risque d\u2019hypertension \u00e0 travers le troisi\u00e8me trimestre et la p\u00e9riode postpartum - comblant l\u2019\u00e9cart qui cause 70% des d\u00e9c\u00e8s par hypertension maternelle.',
      'cta1':'Contactez-nous \u2192','cta2':'D\u00e9couvrir les agents',
      'ov.1':'Agents IA','ov.2':'R\u00e9ponse','ov.3':'Surveillance',
      'prob.eb':'Le probl\u00e8me','prob.h2':'Entre les visites obst\u00e9tricales, aucun clinicien ne surveille.',
      'prob.lead':'Les troubles hypertensifs compliquent 1 grossesse am\u00e9ricaine sur 10. Le calendrier clinique cesse de surveiller apr\u00e8s la sortie - mais le risque persiste.',
      'pc1.h':'Grossesses affect\u00e9es','pc1.p':'Grossesses am\u00e9ricaines compliqu\u00e9es par un trouble hypertensif - pr\u00e9\u00e9clampsie, hypertension gestationnelle ou chronique.',
      'pc2.h':'D\u00e9c\u00e8s post-sortie','pc2.p':'Les d\u00e9c\u00e8s par hypertension maternelle surviennent apr\u00e8s la sortie de l\u2019h\u00f4pital - dans l\u2019intervalle o\u00f9 personne ne surveille.',
      'pc3.h':'Class\u00e9s comme \u00e9vitables','pc3.p':'Le CDC classe 80% de ces d\u00e9c\u00e8s comme \u00e9vitables. Le probl\u00e8me n\u2019est pas le savoir clinique - c\u2019est la surveillance continue entre les visites.',
      'pc4.h':'March\u00e9 am\u00e9ricain annuel','pc4.p':'Le march\u00e9 total adressable pour la surveillance de l\u2019hypertension maternelle aux \u00c9tats-Unis.',
      'ag.eb':'Six agents IA','ag.h2':'Un verdict de risque transparent.',
      'ag.lead':'Coordonn\u00e9s par un superviseur central sur IBM watsonx Orchestrate, six agents sp\u00e9cialis\u00e9s travaillent en parall\u00e8le - de la prise de signal \u00e0 la communication patient en moins de 25 secondes.',
      'a1.n':'Agent 01','a1.h':'Prise de signal','a1.p':'Ing\u00e8re les lectures de PA, SMS de sympt\u00f4mes, historique DSE et \u00e2ge gestationnel. D\u00e9duplique, normalise et enrichit chaque signal avec le contexte patient.',
      'a1.l1':'Lectures de pression art\u00e9rielle','a1.l2':'SMS de sympt\u00f4mes en langage naturel','a1.l3':'Historique DSE et contexte gestationnel',
      'a2.n':'Agent 02','a2.h':'Surveillance du risque','a2.p':'\u00c9value chaque lecture de PA par rapport \u00e0 la ligne de base individuelle et aux seuils ACOG - incluant un filtre postpartum qui \u00e9l\u00e8ve automatiquement le risque pendant les jours 0-14.',
      'a2.l1':'Comparaison \u00e0 la ligne de base individuelle','a2.l2':'\u00c9valuation des seuils ACOG','a2.l3':'Auto-\u00e9l\u00e9vation postpartum jours 0-14',
      'a3.n':'Agent 03','a3.h':'Triage des sympt\u00f4mes','a3.p':'Utilise la compr\u00e9hension du langage naturel pour analyser les rapports de sympt\u00f4mes - c\u00e9phal\u00e9es, troubles visuels, douleur \u00e9pigastrique - extrayant des entit\u00e9s cliniques structur\u00e9es.',
      'a3.l1':'Analyse de sympt\u00f4mes en langage naturel','a3.l2':'Extraction d\u2019entit\u00e9s cliniques structur\u00e9es','a3.l3':'D\u00e9tection des signes de pr\u00e9\u00e9clampsie',
      'a4.n':'Agent 04','a4.h':'Contexte gestationnel','a4.p':'Applique le bon seuil clinique ACOG selon le stade gestationnel - diff\u00e9renciant le risque du troisi\u00e8me trimestre du risque postpartum.',
      'a4.l1':'Seuils ACOG adapt\u00e9s au stade','a4.l2':'Diff\u00e9renciation 3e trimestre vs postpartum','a4.l3':'Standard clinique correct par fen\u00eatre',
      'a5.n':'Agent 05','a5.h':'Escalade clinique','a5.p':'Contacte l\u2019obst\u00e9tricien de garde via Microsoft Teams en quelques secondes et r\u00e9serve automatiquement un rendez-vous de t\u00e9l\u00e9sant\u00e9.',
      'a5.l1':'Contact direct de l\u2019OB via Microsoft Teams','a5.l2':'R\u00e9servation automatique de t\u00e9l\u00e9sant\u00e9','a5.l3':'\u00c9limination du d\u00e9lai de 72+ heures',
      'a6.n':'Agent 06','a6.h':'Navigateur de soins','a6.p':'Envoie \u00e0 la patiente un SMS en langage clair imm\u00e9diatement apr\u00e8s l\u2019escalade : ce qui s\u2019est pass\u00e9, quoi faire maintenant, qui appellera et quand.',
      'a6.l1':'Notification SMS instantan\u00e9e','a6.l2':'Conseils cliniques en langage clair','a6.l3':'Prochaines \u00e9tapes claires et chemin d\u2019escalade',
      'ben.eb':'Avantages cl\u00e9s','ben.h2':'Con\u00e7u pour les moments qui comptent le plus.',
      'b1.h':'Couverture double fen\u00eatre','b1.p':'Surveille le troisi\u00e8me trimestre et la p\u00e9riode postpartum depuis une seule plateforme avec des seuils ACOG adapt\u00e9s.',
      'b2.h':'Moins de 25 secondes','b2.p':'De la lecture de PA \u00e0 l\u2019action clinique document\u00e9e en moins de 25 secondes - sans triage manuel.',
      'b3.h':'Conforme par architecture','b3.p':'Chiffrement de bout en bout, BAA sign\u00e9s, parcours FDA Classe II, d\u00e9p\u00f4t parall\u00e8le Sant\u00e9 Canada, et gouvernance IA continue.',
      'b4.h':'Impact \u00e9vitable prouv\u00e9','b4.p':'80% des d\u00e9c\u00e8s par hypertension maternelle sont \u00e9vitables. 70% surviennent post-sortie. Vital Sense comble cet \u00e9cart.',
      'cl.eb':'Pr\u00eat pour l\u2019approvisionnement clinique','cl.h2':'Con\u00e7u pour l\u2019approvisionnement clinique d\u00e8s le premier jour.',
      'c1.h':'FDA SaMD Classe II','c1.p':'Con\u00e7u pour la soumission 510(k) avec une cohorte de dispositifs pr\u00e9dicats d\u00e9j\u00e0 identifi\u00e9e.',
      'c2.h':'Sant\u00e9 Canada SaMD Classe II','c2.p':'Parcours r\u00e9glementaires parall\u00e8les pour une entr\u00e9e sur deux march\u00e9s sans duplication de conformit\u00e9.',
      'c3.h':'Conforme HIPAA et PIPEDA','c3.p':'Chiffrement de bout en bout, BAA sign\u00e9s avec tous les sous-traitants, et r\u00e9sidence des donn\u00e9es r\u00e9gionale.',
      'c4.h':'Gouvernance IA continue','c4.p':'Tra\u00e7abilit\u00e9 des mod\u00e8les, d\u00e9tection de d\u00e9rive et surveillance des biais via watsonx.governance.',
      'int.eb':'Construit sur des plateformes de premier plan','int.h2':'Int\u00e9grations transparentes.',
      'cta.eb':'Pr\u00eat \u00e0 combler l\u2019\u00e9cart?','cta.h2':'Voir Vital Sense en action.',
      'cta.p':'De la lecture de pression \u00e0 l\u2019action clinique document\u00e9e en moins de 25 secondes. Contactez notre \u00e9quipe.',
      'cta.btn1':'Contactez-nous \u2192','cta.btn2':'T\u00e9l\u00e9charger l\u2019aper\u00e7u'
    }
  };
  /* Map: key → CSS selector */
  var MAP=[
    ['tag','.vs-hero .tag'],['eb','.vs-hero .eyebrow'],['h1','.vs-hero .h1'],
    ['counter.cap','.vs-counter .cap'],['sub','.vs-hero .sub'],
    ['cta1','.vs-hero .btn-primary'],['cta2','.vs-hero .btn-ghost'],
    ['ov.1','.overlay-stat .os:nth-child(1) .l'],['ov.2','.overlay-stat .os:nth-child(2) .l'],['ov.3','.overlay-stat .os:nth-child(3) .l'],
    ['prob.eb','.vs-problem .eyebrow'],['prob.h2','.vs-problem .heading'],['prob.lead','.vs-problem .lead'],
    ['pc1.h','.vs-pcard:nth-child(1) h3'],['pc1.p','.vs-pcard:nth-child(1) p'],
    ['pc2.h','.vs-pcard:nth-child(2) h3'],['pc2.p','.vs-pcard:nth-child(2) p'],
    ['pc3.h','.vs-pcard:nth-child(3) h3'],['pc3.p','.vs-pcard:nth-child(3) p'],
    ['pc4.h','.vs-pcard:nth-child(4) h3'],['pc4.p','.vs-pcard:nth-child(4) p'],
    ['ag.eb','.vs-pipeline .eyebrow'],['ag.h2','.vs-pipeline .heading'],['ag.lead','.vs-pipeline .lead'],
    ['a1.n','.vs-agent:nth-child(1) .anum'],['a1.h','.vs-agent:nth-child(1) h3'],['a1.p','.vs-agent:nth-child(1) p'],
    ['a1.l1','.vs-agent:nth-child(1) .alist div:nth-child(1)'],['a1.l2','.vs-agent:nth-child(1) .alist div:nth-child(2)'],['a1.l3','.vs-agent:nth-child(1) .alist div:nth-child(3)'],
    ['a2.n','.vs-agent:nth-child(2) .anum'],['a2.h','.vs-agent:nth-child(2) h3'],['a2.p','.vs-agent:nth-child(2) p'],
    ['a2.l1','.vs-agent:nth-child(2) .alist div:nth-child(1)'],['a2.l2','.vs-agent:nth-child(2) .alist div:nth-child(2)'],['a2.l3','.vs-agent:nth-child(2) .alist div:nth-child(3)'],
    ['a3.n','.vs-agent:nth-child(3) .anum'],['a3.h','.vs-agent:nth-child(3) h3'],['a3.p','.vs-agent:nth-child(3) p'],
    ['a3.l1','.vs-agent:nth-child(3) .alist div:nth-child(1)'],['a3.l2','.vs-agent:nth-child(3) .alist div:nth-child(2)'],['a3.l3','.vs-agent:nth-child(3) .alist div:nth-child(3)'],
    ['a4.n','.vs-agent:nth-child(4) .anum'],['a4.h','.vs-agent:nth-child(4) h3'],['a4.p','.vs-agent:nth-child(4) p'],
    ['a4.l1','.vs-agent:nth-child(4) .alist div:nth-child(1)'],['a4.l2','.vs-agent:nth-child(4) .alist div:nth-child(2)'],['a4.l3','.vs-agent:nth-child(4) .alist div:nth-child(3)'],
    ['a5.n','.vs-agent:nth-child(5) .anum'],['a5.h','.vs-agent:nth-child(5) h3'],['a5.p','.vs-agent:nth-child(5) p'],
    ['a5.l1','.vs-agent:nth-child(5) .alist div:nth-child(1)'],['a5.l2','.vs-agent:nth-child(5) .alist div:nth-child(2)'],['a5.l3','.vs-agent:nth-child(5) .alist div:nth-child(3)'],
    ['a6.n','.vs-agent:nth-child(6) .anum'],['a6.h','.vs-agent:nth-child(6) h3'],['a6.p','.vs-agent:nth-child(6) p'],
    ['a6.l1','.vs-agent:nth-child(6) .alist div:nth-child(1)'],['a6.l2','.vs-agent:nth-child(6) .alist div:nth-child(2)'],['a6.l3','.vs-agent:nth-child(6) .alist div:nth-child(3)'],
    ['ben.eb','.vs-comp-grid:first-of-type ~ .sec-head .eyebrow, .sec:nth-child(4) .eyebrow'],
    ['ben.h2','.sec:nth-child(4) .heading'],
    ['b1.h','.sec:nth-child(4) .vs-comp:nth-child(1) h3'],['b1.p','.sec:nth-child(4) .vs-comp:nth-child(1) p'],
    ['b2.h','.sec:nth-child(4) .vs-comp:nth-child(2) h3'],['b2.p','.sec:nth-child(4) .vs-comp:nth-child(2) p'],
    ['b3.h','.sec:nth-child(4) .vs-comp:nth-child(3) h3'],['b3.p','.sec:nth-child(4) .vs-comp:nth-child(3) p'],
    ['b4.h','.sec:nth-child(4) .vs-comp:nth-child(4) h3'],['b4.p','.sec:nth-child(4) .vs-comp:nth-child(4) p'],
    ['cl.eb','.sec:nth-child(5) .eyebrow'],['cl.h2','.sec:nth-child(5) .heading'],
    ['c1.h','.sec:nth-child(5) .vs-comp:nth-child(1) h3'],['c1.p','.sec:nth-child(5) .vs-comp:nth-child(1) p'],
    ['c2.h','.sec:nth-child(5) .vs-comp:nth-child(2) h3'],['c2.p','.sec:nth-child(5) .vs-comp:nth-child(2) p'],
    ['c3.h','.sec:nth-child(5) .vs-comp:nth-child(3) h3'],['c3.p','.sec:nth-child(5) .vs-comp:nth-child(3) p'],
    ['c4.h','.sec:nth-child(5) .vs-comp:nth-child(4) h3'],['c4.p','.sec:nth-child(5) .vs-comp:nth-child(4) p'],
    ['int.eb','.sec:nth-child(6) .eyebrow'],['int.h2','.sec:nth-child(6) .heading'],
    ['cta.eb','.sa-cta .eyebrow'],['cta.h2','.sa-cta .heading'],['cta.p','.sa-cta p'],
    ['cta.btn1','.sa-cta .btn-primary'],['cta.btn2','.sa-cta .btn-ghost']
  ];
  function translate(){
    var L=window.aimGetLang?window.aimGetLang():'en';
    var dict=TR[L]||TR.en;
    MAP.forEach(function(pair){
      var el=d.querySelector(pair[1]);
      if(el&&dict[pair[0]])el.textContent=dict[pair[0]];
    });
  }
  translate();
  /* Render integration logos */
  var vsLogos=[
    {s:'ibm',n:'IBM watsonx'},{s:'ibm',n:'IBM Granite'},{s:'ibm',n:'watsonx.governance'},
    {s:'microsoftteams',n:'Microsoft Teams'},{s:'twilio',n:'Twilio SMS'},{s:'microsoftazure',n:'Microsoft Azure'}
  ];
  var logoGrid=d.getElementById('vsLogos');
  if(logoGrid){
    var isLight=b.classList.contains('t-light');
    var clr=isLight?'1F2330':'d6dae8';
    vsLogos.forEach(function(l){
      var el=d.createElement('div');el.className='vs-lg';
      var img=d.createElement('img');img.alt=l.n;img.loading='lazy';img.decoding='async';
      img.src='https://cdn.simpleicons.org/'+l.s+'/'+clr;
      img.onerror=function(){img.style.display='none';};
      var sp=d.createElement('span');sp.textContent=l.n;
      el.appendChild(img);el.appendChild(sp);logoGrid.appendChild(el);
    });
    bind(logoGrid.querySelectorAll('.vs-lg'));
  }
  window.addEventListener('aim-lang-change',translate);
  /* ===== ANIMATIONS ===== */
  /* Hero entrance */
  if(window.gsap&&!rm){
    var tl=gsap.timeline({delay:.15});
    tl.from('.vs-hero .tag',{opacity:0,y:20,duration:.6,ease:'power3.out'})
      .from('.vs-hero .eyebrow',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.3')
      .from('.vs-hero .h1',{opacity:0,y:30,duration:.8,ease:'power3.out'},'-=.3')
      .from('.vs-counter',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.4')
      .from('.vs-hero .sub',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3')
      .from('.vs-hero .btn-row',{opacity:0,y:20,duration:.6,ease:'power3.out'},'-=.3')
      .from('.vs-visual',{opacity:0,x:60,duration:1,ease:'power3.out'},'-=.8');
    /* Counter animation: 0 → 25 */
    var cn=d.getElementById('vsCount');
    if(cn)gsap.from({v:0},{v:25,duration:2,delay:.6,ease:'power2.out',onUpdate:function(){cn.textContent=Math.round(this.targets()[0].v);}});
  }
  /* Problem cards: staggered reveal on scroll */
  var pcards=d.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:.2,rootMargin:'0px 0px -60px 0px'});
    pcards.forEach(function(c){io.observe(c);});
  }else{pcards.forEach(function(c){c.classList.add('visible');});}
  /* Staggered section reveals */
  if(window.gsap&&window.ScrollTrigger&&!rm){
    gsap.registerPlugin(ScrollTrigger);
    /* Benefit cards */
    d.querySelectorAll('.vs-comp').forEach(function(c,i){
      gsap.from(c,{opacity:0,y:40,duration:.7,delay:i%2*.15,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}});
    });
    /* Agent timeline - alternating slide */
    d.querySelectorAll('.vs-ag-item').forEach(function(c,i){
      var isOdd=i%2===0;
      gsap.from(c.querySelector('.vs-ag-content'),{opacity:0,x:isOdd?-50:50,duration:.7,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 85%',once:true}});
      gsap.from(c.querySelector('.vs-ag-node'),{opacity:0,scale:0,duration:.4,delay:.2,ease:'back.out(1.7)',scrollTrigger:{trigger:c,start:'top 85%',once:true}});
    });
    /* Integration pills */
    d.querySelectorAll('.vs-int').forEach(function(p,i){
      gsap.from(p,{opacity:0,y:20,duration:.5,delay:i*.06,ease:'power3.out',scrollTrigger:{trigger:p,start:'top 90%',once:true}});
    });
    /* Section heads */
    d.querySelectorAll('.sec-head, .vs-prob-text').forEach(function(el){
      gsap.from(el,{opacity:0,y:32,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}});
    });
    /* CTA split */
    gsap.from('.sa-cta',{opacity:0,y:32,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.sa-cta',start:'top 85%',once:true}});
  }
  /* Bind cursor to interactive elements */
  /* Trust bar: scrolling platform logos */
  var trustEl=d.getElementById('vsTrust');
  if(trustEl){
    var trustLogos=[
      {s:'ibm',n:'IBM'},{s:'microsoftazure',n:'Microsoft Azure'},{s:'amazonwebservices',n:'AWS'},
      {s:'googlecloud',n:'Google Cloud'},{s:'servicenow',n:'ServiceNow'},{s:'salesforce',n:'Salesforce'},
      {s:'oracle',n:'Oracle'},{s:'broadcom',n:'Broadcom'}
    ];
    function addTrustSet(){trustLogos.forEach(function(l){
      var item=d.createElement('span');item.className='vs-trust-item';
      var img=d.createElement('img');img.alt=l.n;img.loading='lazy';
      img.src='https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/'+l.s+'.svg';
      var sp=d.createElement('span');sp.textContent=l.n;sp.style.display='none';
      img.onerror=function(){img.style.display='none';sp.style.display='inline-block';};
      item.appendChild(img);item.appendChild(sp);trustEl.appendChild(item);
    });}
    /* Same seamless-loop technique as the homepage platform marquee: fill past
       the viewport, then clone the whole current set exactly once so the
       -50% keyframe always lands on an identical copy, at any screen width. */
    addTrustSet();
    var trustTarget=(screen.width||window.innerWidth||1280)*1.3,trustGuard=0;
    while(trustEl.scrollWidth<trustTarget&&trustGuard<14){addTrustSet();trustGuard++;}
    var trustCount=trustEl.children.length;
    for(var ti=0;ti<trustCount;ti++){trustEl.appendChild(trustEl.children[ti].cloneNode(true));}
  }
  bind(d.querySelectorAll('.vs-comp,.vs-int,.vs-pipe-btn,.vs-pcard,a,.btn'));
});

})();
/*__AIM_BLOCK__*/
;(function(){

/* apply body classes + language immediately (no flash) */
(function(){
  var b=document.body;
  if(!b) return;
  b.classList.add('aim');
  if(!b.classList.contains('t-light') && !b.classList.contains('t-dark')) b.classList.add('t-light');
  /* language: check saved pref */
  var saved=null;
  try{ saved=localStorage.getItem('aim-lang'); }catch(e){}
  if(saved==='fr'||saved==='en'){
    b.setAttribute('data-lang',saved);
  }
})();
/* everything else waits for full page load */
window.addEventListener('load',function(){
  var d=document, b=d.body;
  if(!b) return;
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse=window.matchMedia('(pointer: coarse)').matches||window.matchMedia('(hover: none)').matches;
  /* ===== LANGUAGE ENGINE ===== */
  var currentLang=b.getAttribute('data-lang')||'en';
  function setLang(lang){
    currentLang=lang;
    b.setAttribute('data-lang',lang);
    try{localStorage.setItem('aim-lang',lang);}catch(e){}
    /* update toggle label (shows the OTHER language) */
    var lbl=d.getElementById('langLabel');
    if(lbl) lbl.textContent=lang==='en'?'FR':'EN';
    /* translate all [data-i18n] elements */
    d.querySelectorAll('[data-i18n]').forEach(function(el){
      var key=el.getAttribute('data-i18n');
      var dict=window.aimI18n;
      if(dict && dict[key] && dict[key][lang]){
        if(el.hasAttribute('data-i18n-html')){
          el.innerHTML=dict[key][lang];
        } else {
          el.textContent=dict[key][lang];
        }
      }
    });
    /* notify page scripts to re-render JS-generated content */
    window.dispatchEvent(new CustomEvent('aim-lang-change',{detail:{lang:lang}}));
  }
  window.aimSetLang=setLang;
  window.aimGetLang=function(){return currentLang;};
  /* language default: always English on a fresh visit.
     Only a saved preference (from the toggle) can make it French.
     Geo-detection removed - it was defaulting Quebec/Canada visitors to French. */
  var hasSaved=false;
  try{hasSaved=(localStorage.getItem('aim-lang')==='fr'||localStorage.getItem('aim-lang')==='en');}catch(e){}
  if(hasSaved){
    setLang(currentLang);
  } else {
    setLang('en');
  }
    /* nav + footer translations */
    var navT={
      'nav.home':{en:'Home',fr:'Accueil'},
      'nav.about':{en:'About Us',fr:'À propos'},
      'nav.products':{en:'Products',fr:'Produits'},
      'nav.services':{en:'Services',fr:'Services'},
      'nav.industries':{en:'Industries',fr:'Industries'},
      'nav.platforms':{en:'Platforms',fr:'Plateformes'},
      'nav.support':{en:'Support',fr:'Soutien'},
      'nav.careers':{en:'Careers',fr:'Carrières'},
      'nav.cta':{en:'Connect with Us',fr:'Contactez-nous'}
    };
    window.aimI18n=window.aimI18n||{};
    Object.assign(window.aimI18n,navT);
  /* language toggle click */
  var lt=d.getElementById('langToggle');
  if(lt) lt.addEventListener('click',function(){
    setLang(currentLang==='en'?'fr':'en');
  });
  /* ===== CUSTOM CURSOR: crisp dot + trailing halo (no GSAP dependency) =====
     Research note: accessibility guidance (ericwbailey.website, dbushell.com)
     warns custom cursors can override OS-level cursor accessibility settings
     and obscure content, so this stays small, high-contrast, gated to real
     pointing devices only (the coarse/hover:none check below), and never
     grows large enough to cover text or the actual clickable target. */
  var cur=null,halo=null;
  if(!coarse){
    cur=d.createElement('div'); cur.className='aim-cursor'; cur.style.opacity='0'; b.appendChild(cur);
    halo=d.createElement('div'); halo.className='aim-halo'; halo.style.opacity='0'; b.appendChild(halo);
    var cx=0,cy=0,tx=0,ty=0,hx=0,hy=0,raf=null;
    function lerp(a,b,t){return a+(b-a)*t;}
    function tick(){
      cx=lerp(cx,tx,rm?1:0.24);cy=lerp(cy,ty,rm?1:0.24);
      hx=lerp(hx,tx,rm?1:0.09);hy=lerp(hy,ty,rm?1:0.09);
      cur.style.transform='translate('+(cx-cur.offsetWidth/2)+'px,'+(cy-cur.offsetHeight/2)+'px)';
      halo.style.transform='translate('+(hx-halo.offsetWidth/2)+'px,'+(hy-halo.offsetHeight/2)+'px)';
      raf=requestAnimationFrame(tick);
    }
    window.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!raf){cx=tx;cy=ty;hx=tx;hy=ty;cur.style.transform='translate('+(cx-cur.offsetWidth/2)+'px,'+(cy-cur.offsetHeight/2)+'px)';halo.style.transform='translate('+(hx-halo.offsetWidth/2)+'px,'+(hy-halo.offsetHeight/2)+'px)';cur.style.opacity='';halo.style.opacity='';raf=requestAnimationFrame(tick);}});
    d.addEventListener('mouseleave',function(){cur.classList.add('hide');halo.classList.add('hide');});
    d.addEventListener('mouseenter',function(){cur.classList.remove('hide');halo.classList.remove('hide');});
    d.addEventListener('mousedown',function(){cur.classList.add('down');});
    d.addEventListener('mouseup',function(){cur.classList.remove('down');});
  }
  /* Hide cursor over iframes and maps */
  d.querySelectorAll('iframe,.ct-map,[data-nocursor]').forEach(function(el){
    el.addEventListener('mouseenter',function(){if(cur)cur.classList.add('hide');if(halo)halo.classList.add('hide');});
    el.addEventListener('mouseleave',function(){if(cur)cur.classList.remove('hide');if(halo)halo.classList.remove('hide');});
  });
  window.aimBindCursor=function(els){ if(coarse||!cur) return; els.forEach(function(el){ el.addEventListener('mouseenter',function(){cur.classList.add('hover');if(halo)halo.classList.add('hover');}); el.addEventListener('mouseleave',function(){cur.classList.remove('hover');if(halo)halo.classList.remove('hover');}); }); };
  /* Magnetic snap for buttons and key interactive elements */
  window.aimBindMagnetic=function(els){ if(coarse||!cur) return; els.forEach(function(el){
    el.setAttribute('data-magnetic','');
    el.addEventListener('mouseenter',function(){magEl=el;magRect=el.getBoundingClientRect();cur.classList.add('magnetic');cur.classList.remove('hover');if(halo)halo.classList.add('hover');});
    el.addEventListener('mousemove',function(){magRect=el.getBoundingClientRect();});
    el.addEventListener('mouseleave',function(){magEl=null;magRect=null;el.style.transform='';cur.classList.remove('magnetic');if(halo)halo.classList.remove('hover');});
  }); };
  window.aimBindCursor(d.querySelectorAll('a, .cap-tab, .ind, .val, .lg, .cs-btn'));
  window.aimBindMagnetic(d.querySelectorAll('.btn, .burger, .navcta'));
  /* ===== NAV ===== */
  var nav=d.getElementById('nav');
  if(nav){
    window.addEventListener('scroll',function(){ nav.classList.toggle('scrolled', window.scrollY>30); },{passive:true});
    var burger=d.getElementById('burger');
    if(burger) burger.addEventListener('click',function(){ nav.classList.toggle('open'); });
    d.querySelectorAll('.has-dd > a').forEach(function(a){ a.addEventListener('click',function(e){ if(window.matchMedia('(max-width:1080px)').matches){ e.preventDefault(); a.parentElement.classList.toggle('open'); } }); });
    nav.querySelectorAll('a[href="#"]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); }); });
  }
  /* ===== THEME TOGGLE ===== */
  var tg=d.getElementById('themeToggle');
  if(tg) tg.addEventListener('click',function(){
    if(b.classList.contains('t-dark')){ b.classList.remove('t-dark'); b.classList.add('t-light'); try{sessionStorage.setItem('aim-theme','light');}catch(e){} }
    else { b.classList.remove('t-light'); b.classList.add('t-dark'); try{sessionStorage.setItem('aim-theme','dark');}catch(e){} }
  });
  /* ===== SCROLL REVEALS ===== */
  var revels=d.querySelectorAll('.reveal');
  if(window.gsap && window.ScrollTrigger && !rm && revels.length){
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(revels,{opacity:0,y:48});
    revels.forEach(function(el){ gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}}); });
  } else { revels.forEach(function(el){ el.style.opacity='1'; }); }
  /* ===== STAT COUNTERS ===== */
  var dn=false; function run(){ if(dn)return; dn=true; d.querySelectorAll('.count').forEach(function(el){ var to=+el.dataset.to,st=null,du=1500; function step(t){ if(!st)st=t; var p=Math.min((t-st)/du,1); el.textContent=Math.floor(p*to); if(p<1)requestAnimationFrame(step); else el.textContent=to; } requestAnimationFrame(step); }); }
  var sg=d.querySelector('.stat-grid');
  if(sg && 'IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) run(); }); },{threshold:.4}); io.observe(sg); } else if(sg){ run(); }
  /* ===== MAGNETIC BUTTONS ===== */
  /* Magnetic buttons handled by aimBindMagnetic */
});

})();