;(function(){

window.addEventListener('load', function(){
  var d=document, b=d.body;
  if(!b) return;
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s){return s.replace(/&/g,'&').replace(/</g,'<');}
  var bind=window.aimBindCursor||function(){};
  /* ===== TRANSLATION DICTIONARY (single, clean) ===== */
  window.aimI18n = window.aimI18n || {};
  var T={
    'hero.h1':{en:'The Architecture Firm That Ships AI <span class="g">- and Runs It.</span>',fr:'La firme d\u2019architecture qui livre l\u2019IA <span class="g">- et la g\u00e8re.</span>'},
    'hero.sub':{en:'AIM architects the complete AI stack - from enterprise data foundations to production-ready agents. We start with architecture. We measure outcomes. We stay vendor-neutral.',fr:'AIM con\u00e7oit la pile IA compl\u00e8te - des fondations de donn\u00e9es aux agents en production. Architecture d\u2019abord. R\u00e9sultats mesur\u00e9s. Neutralit\u00e9 fournisseur.'},
    'hero.cta1':{en:'Let\u2019s connect \u2192',fr:'Contactez-nous \u2192'},
    'hero.cta2':{en:'Explore partnerships',fr:'D\u00e9couvrir nos partenariats'},
    'hero.p1':{en:'Architecture-First',fr:'Architecture d\u2019abord'},
    'hero.p2':{en:'Outcome-Driven',fr:'Ax\u00e9 r\u00e9sultats'},
    'hero.p3':{en:'Vendor-Neutral',fr:'Neutralit\u00e9 fournisseur'},
    'cap.eb':{en:'What we do',fr:'Ce que nous faisons'},
    'cap.h2':{en:'Four practices. One architecture for momentum.',fr:'Quatre pratiques. Une architecture pour l\u2019\u00e9lan.'},
    'cap.lead':{en:'Every engagement is architecture-led and outcome-measured - we don\'t guess, we prove. Explore the capabilities that move modern enterprises forward.',fr:'Chaque engagement est guid\u00e9 par l\u2019architecture et mesur\u00e9 par les r\u00e9sultats. D\u00e9couvrez les capacit\u00e9s qui font avancer les entreprises.'},
    'cap.t0':{en:'AI',fr:'IA'},'cap.t1':{en:'Data',fr:'Donn\u00e9es'},'cap.t2':{en:'Digital',fr:'Num\u00e9rique'},'cap.t3':{en:'Dev',fr:'D\u00e9v'},
    'cap.ai.tg':{en:'AI',fr:'IA'},
    'cap.ai.h3':{en:'Agentic AI & Intelligent Assistants',fr:'IA agentique et assistants intelligents'},
    'cap.ai.p':{en:'We take agentic AI and large language models from proof-of-concept to governed production - intelligent systems that drive real business outcomes, not science projects. Deployed on your infrastructure. Measured from day one.',fr:'Nous amenons l\u2019IA agentique du prototype \u00e0 la production gouvern\u00e9e - des syst\u00e8mes intelligents qui g\u00e9n\u00e8rent de vrais r\u00e9sultats. D\u00e9ploy\u00e9s sur votre infrastructure. Mesur\u00e9s d\u00e8s le premier jour.'},
    'cap.ai.l1':{en:'Agentic AI design & intelligent assistant enablement',fr:'Conception d\u2019IA agentique et activation d\u2019assistants intelligents'},
    'cap.ai.l2':{en:'LLM deployment & enterprise AI integration',fr:'D\u00e9ploiement LLM et int\u00e9gration IA d\u2019entreprise'},
    'cap.ai.l3':{en:'RAG pipelines & knowledge retrieval with mandatory citations',fr:'Pipelines RAG et recherche de connaissances avec citations obligatoires'},
    'cap.ai.l4':{en:'AI governance, responsible adoption & audit lineage',fr:'Gouvernance IA, adoption responsable et tra\u00e7abilit\u00e9 d\u2019audit'},
    'cap.da.tg':{en:'Data',fr:'Donn\u00e9es'},
    'cap.da.h3':{en:'Unified Data & Analytics Platform',fr:'Plateforme unifi\u00e9e de donn\u00e9es et analytique'},
    'cap.da.p':{en:'We unify fragmented data into a single, governed platform - real-time pipelines and analytics engineering that turn raw signals into decisions leaders can trust and act on.',fr:'Nous unifions les donn\u00e9es fragment\u00e9es en une plateforme gouvern\u00e9e unique avec pipelines en temps r\u00e9el et ing\u00e9nierie analytique.'},
    'cap.da.l1':{en:'Cloud data platforms & warehouses (Azure Synapse, ADF)',fr:'Plateformes de donn\u00e9es infonuagiques (Azure Synapse, ADF)'},
    'cap.da.l2':{en:'Real-time pipelines & ETL/ELT',fr:'Pipelines en temps r\u00e9el et ETL/ELT'},
    'cap.da.l3':{en:'BI strategy, Power BI & executive dashboards',fr:'Strat\u00e9gie BI, Power BI et tableaux de bord'},
    'cap.da.l4':{en:'Data governance & Center of Excellence',fr:'Gouvernance des donn\u00e9es et centre d\u2019excellence'},
    'cap.di.tg':{en:'Digital',fr:'Num\u00e9rique'},
    'cap.di.h3':{en:'Digital Transformation & Cloud Modernization',fr:'Transformation num\u00e9rique et modernisation infonuagique'},
    'cap.di.p':{en:'We modernize legacy estates and migrate to the cloud without losing momentum - integration, replatforming and change enablement delivered at enterprise scale and built to last.',fr:'Nous modernisons les syst\u00e8mes existants et migrons vers le nuage sans perdre d\u2019\u00e9lan - int\u00e9gration et gestion du changement \u00e0 l\u2019\u00e9chelle.'},
    'cap.di.l1':{en:'Cloud strategy & migration (Azure, AWS, GCP)',fr:'Strat\u00e9gie et migration infonuagique (Azure, AWS, GCP)'},
    'cap.di.l2':{en:'Legacy modernization & replatforming',fr:'Modernisation et replatformage'},
    'cap.di.l3':{en:'Systems integration & API connectivity',fr:'Int\u00e9gration de syst\u00e8mes et connectivit\u00e9 API'},
    'cap.di.l4':{en:'Change enablement & adoption at scale',fr:'Gestion du changement et adoption \u00e0 grande \u00e9chelle'},
    'cap.dv.tg':{en:'Dev',fr:'D\u00e9v'},
    'cap.dv.h3':{en:'Application Development & Engineering',fr:'D\u00e9veloppement d\u2019applications et ing\u00e9nierie'},
    'cap.dv.p':{en:'We design and build custom applications end to end - full-stack engineering, clean APIs, and DevOps practices that ship reliably, integrate securely, and scale with your business.',fr:'Nous concevons et d\u00e9veloppons des applications sur mesure de bout en bout - ing\u00e9nierie full-stack, API propres et pratiques DevOps.'},
    'cap.dv.l1':{en:'Custom web & mobile application development',fr:'D\u00e9veloppement d\u2019applications web et mobiles sur mesure'},
    'cap.dv.l2':{en:'Design, prototyping & UI/UX engineering',fr:'Conception, prototypage et ing\u00e9nierie UX/UI'},
    'cap.dv.l3':{en:'API development & integration',fr:'D\u00e9veloppement et int\u00e9gration d\u2019API'},
    'cap.dv.l4':{en:'DevOps, CI/CD & quality engineering',fr:'DevOps, CI/CD et ing\u00e9nierie qualit\u00e9'},
    'cs.eb':{en:'Case studies',fr:'\u00c9tudes de cas'},
    'cs.h2':{en:'Outcomes, not just outputs.',fr:'Des r\u00e9sultats, pas que des livrables.'},
    'cs.lead':{en:'A look at how we help enterprises turn ambition into measurable results.',fr:'Comment nous aidons les entreprises \u00e0 transformer l\u2019ambition en r\u00e9sultats mesurables.'},
    'why.eb':{en:'Why AIM',fr:'Pourquoi AIM'},
    'why.h2':{en:'How we think shapes what we ship.',fr:'Notre fa\u00e7on de penser fa\u00e7onne ce que nous livrons.'},
    'why.lead':{en:'Architecture-first thinking, vendor-neutral advice, and outcomes that persist past the initial engagement - this is how AIM operates.',fr:'Pens\u00e9e architecture d\u2019abord, conseils neutres et r\u00e9sultats durables - c\u2019est ainsi qu\u2019AIM op\u00e8re.'},
    'why.v1h':{en:'Architecture-First',fr:'Architecture d\u2019abord'},
    'why.v1p':{en:'Every engagement begins with architecture - scalable, governable, built to outlast the project. We translate technical complexity into outcomes the C-suite can act on.',fr:'Chaque engagement commence par l\u2019architecture - \u00e9volutive, gouvernable, con\u00e7ue pour durer. Nous traduisons la complexit\u00e9 technique en r\u00e9sultats actionnables.'},
    'why.v2h':{en:'Outcome-Driven',fr:'Ax\u00e9 r\u00e9sultats'},
    'why.v2p':{en:'We tie every recommendation to a measurable result. Faster time-to-insight, reduced audit exposure, accelerated delivery - named, tracked, and proven.',fr:'Nous lions chaque recommandation \u00e0 un r\u00e9sultat mesurable. D\u00e9lais r\u00e9duits, exposition aux audits diminu\u00e9e, livraison acc\u00e9l\u00e9r\u00e9e.'},
    'why.v3h':{en:'Vendor-Neutral',fr:'Neutralit\u00e9 fournisseur'},
    'why.v3p':{en:'Production fluency across Microsoft, IBM, Anthropic, Botpress and more - guidance that maximizes the investments you already hold.',fr:'Ma\u00eetrise de production chez Microsoft, IBM, Anthropic, Botpress et plus - des conseils qui maximisent vos investissements existants.'},
    'why.v4h':{en:'Pragmatic Delivery',fr:'Livraison pragmatique'},
    'why.v4p':{en:'Realistic roadmaps that deliver value early, reduce risk incrementally, and build organizational capability alongside the technology.',fr:'Des feuilles de route r\u00e9alistes qui livrent de la valeur rapidement et r\u00e9duisent les risques progressivement.'},
    'srv.eb':{en:'Capabilities',fr:'Comp\u00e9tences'},
    'srv.h2':{en:'The full delivery stack.',fr:'La pile compl\u00e8te de livraison.'},
    'srv.lead':{en:'Eight specialized practices, from strategy through managed operations. Every practice is staffed with domain-certified talent and delivered against a defined architecture.',fr:'Huit pratiques sp\u00e9cialis\u00e9es, de la strat\u00e9gie aux op\u00e9rations g\u00e9r\u00e9es. Chaque pratique est dot\u00e9e de talents certifi\u00e9s.'},
    'ind.eb':{en:'Industries',fr:'Industries'},
    'ind.h2':{en:'Outcomes across the sectors that move the economy.',fr:'Des r\u00e9sultats dans les secteurs qui font avancer l\u2019\u00e9conomie.'},
    'ind.0t':{en:'Healthcare',fr:'Sant\u00e9'},'ind.0h':{en:'Health & Life Sciences',fr:'Sant\u00e9 et sciences de la vie'},'ind.0p':{en:'Clinical AI, digital strategy and governed data engineering for health-equity and care-delivery initiatives.',fr:'IA clinique, strat\u00e9gie num\u00e9rique et ing\u00e9nierie de donn\u00e9es gouvern\u00e9e pour les initiatives d\u2019\u00e9quit\u00e9 en sant\u00e9.'},
    'ind.1t':{en:'Higher Education',fr:'\u00c9ducation sup\u00e9rieure'},'ind.1h':{en:'Higher Education',fr:'\u00c9ducation sup\u00e9rieure'},'ind.1p':{en:'Modern platforms, data governance and AI for institutions operating at scale across campuses and portals.',fr:'Plateformes modernes, gouvernance des donn\u00e9es et IA pour les institutions \u00e0 grande \u00e9chelle.'},
    'ind.2t':{en:'Technology',fr:'Technologie'},'ind.2h':{en:'Technology',fr:'Technologie'},'ind.2p':{en:'Engineering velocity, API infrastructure and enterprise AI for product and platform teams.',fr:'V\u00e9locit\u00e9 d\u2019ing\u00e9nierie, infrastructure API et IA d\u2019entreprise pour les \u00e9quipes produit.'},
    'ind.3t':{en:'Financial Services',fr:'Services financiers'},'ind.3h':{en:'Financial Services',fr:'Services financiers'},'ind.3p':{en:'Governed data, intelligent automation and compliance-ready architecture for regulated financial institutions.',fr:'Donn\u00e9es gouvern\u00e9es, automatisation intelligente et architecture conforme pour les institutions financi\u00e8res.'},
    'ind.4t':{en:'Transportation',fr:'Transport'},'ind.4h':{en:'Transportation & Logistics',fr:'Transport et logistique'},'ind.4p':{en:'BI, data engineering and connected systems that transform fleet, supply chain and logistics operations.',fr:'BI, ing\u00e9nierie des donn\u00e9es et syst\u00e8mes connect\u00e9s pour le transport et la logistique.'},
    'ind.5t':{en:'Retail & eCommerce',fr:'Commerce de d\u00e9tail'},'ind.5h':{en:'Retail & eCommerce',fr:'Commerce de d\u00e9tail et en ligne'},'ind.5p':{en:'Customer intelligence, demand forecasting and resilient commerce platforms built to scale.',fr:'Intelligence client, pr\u00e9vision de la demande et plateformes commerciales r\u00e9silientes.'},
    'stat.l0':{en:'Years of enterprise delivery',fr:'Ann\u00e9es de livraison d\u2019entreprise'},'stat.l1':{en:'Team certifications',fr:'Certifications d\u2019\u00e9quipe'},'stat.l2':{en:'Client re-engagement rate',fr:'Taux de r\u00e9engagement client'},'stat.l3':{en:'Dedicated sector teams',fr:'\u00c9quipes sectorielles d\u00e9di\u00e9es'},
    'plat.eb':{en:'Platforms & partners',fr:'Plateformes et partenaires'},
    'plat.h2':{en:'We build on the platforms enterprises trust.',fr:'Nous construisons sur les plateformes de confiance.'},
    'cta.h2':{en:'Let\u2019s build what\u2019s next.',fr:'Construisons ce qui vient.'},
    'cta.p':{en:'One partner. The full journey. No handoffs. Start with a scoping conversation - a clear-eyed look at where you are and what it takes to move forward.',fr:'Un partenaire. Le parcours complet. Aucun transfert. Commencez par une conversation de cadrage.'},
    'cta.btn':{en:'Request a conversation \u2192',fr:'Demander une conversation \u2192'}
  };
  Object.assign(window.aimI18n, T);
  /* bilingual case studies */
  var CASES={en:[
    {t:'IT & Digital Strategy',tag:'Healthcare',d:'Building the IT and digital strategy for a leading Canadian healthcare organization\u2019s health-equity initiative - a phased roadmap from current-state assessment to governed execution.',img:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'},
    {t:'Fleet Operations Business Intelligence',tag:'Data & BI',d:'Transforming fleet management through data engineering and BI - technicians went from 45+ minutes searching to instant, cited answers.',img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80'},
    {t:'Enterprise ITSM Transformation',tag:'Service Management',d:'Aligning IT operations to business outcomes - incident, problem, and change management re-engineered for scale, speed, and measurable improvement.',img:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80'},
    {t:'AIM Enterprise AI Solutions',tag:'Enterprise AI',d:'Multi-agent AI systems across healthcare, pharmacy compliance, and fleet operations - governed, production-deployed, and delivering outcomes from day one.',img:'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80'},
    {t:'Mirlin AI Knowledge Assistant',tag:'Generative AI',d:'From 45+ minutes of manual search to verified answers in seconds - 1,000+ documents indexed, zero hallucinations, mandatory citations, live in production.',img:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'}
  ],fr:[
    {t:'Strat\u00e9gie TI et num\u00e9rique',tag:'Sant\u00e9',d:'Conception de la strat\u00e9gie TI et num\u00e9rique pour l\u2019initiative d\u2019\u00e9quit\u00e9 en sant\u00e9 d\u2019un grand organisme canadien.',img:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'},
    {t:'Intelligence d\u2019affaires - op\u00e9rations de flotte',tag:'Donn\u00e9es et BI',d:'Transformation de la gestion de flotte par l\u2019ing\u00e9nierie des donn\u00e9es et la BI - de 45+ minutes de recherche \u00e0 des r\u00e9ponses instantan\u00e9es et cit\u00e9es.',img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80'},
    {t:'Transformation ITSM d\u2019entreprise',tag:'Gestion des services',d:'Alignement des op\u00e9rations TI sur les r\u00e9sultats d\u2019affaires - gestion des incidents, probl\u00e8mes et changements r\u00e9ing\u00e9ni\u00e9r\u00e9e.',img:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80'},
    {t:'Solutions IA d\u2019entreprise AIM',tag:'IA d\u2019entreprise',d:'Syst\u00e8mes IA multi-agents en sant\u00e9, conformit\u00e9 pharmaceutique et op\u00e9rations de flotte - gouvern\u00e9s et en production.',img:'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80'},
    {t:'Assistant IA Mirlin',tag:'IA g\u00e9n\u00e9rative',d:'De 45+ minutes de recherche manuelle \u00e0 des r\u00e9ponses v\u00e9rifi\u00e9es en secondes - 1 000+ documents index\u00e9s, z\u00e9ro hallucination.',img:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'}
  ]};
  /* bilingual services */
  var SERV={en:[
    {n:'01',t:'Strategy & Advisory',d:'IT strategy, roadmaps and governance that start with where you are - not where a framework assumes you should be. Aligned to your business outcomes.',subs:['IT Strategy & Roadmap Services','Vision & Business Alignment','Current State Assessment & Gap Analysis','Strategic Pillars & Focus Areas','IT Operations & Service Management','Governance, Risk & Compliance (GRC)']},
    {n:'02',t:'Cloud & Infrastructure Modernization',d:'Migration, automation and optimization across Azure, AWS and GCP - modern infrastructure that performs at scale, stays secure, and supports your AI workloads.',subs:['Cloud Strategy & Migration (Azure, AWS, GCP)','Rehosting / Lift-and-Shift','SaaS, PaaS & Application Modernization','Infrastructure Automation & CloudOps','Performance Optimization & Monitoring','ServiceNow Deployment & Managed Services']},
    {n:'03',t:'Application Development & Integration',d:'Custom applications and integrations engineered end to end - from prototype to production, web to mobile, API to deployment. Clean architecture from the first sprint.',subs:['Custom Application Development','Design, Prototyping & UI/UX Engineering','API Engineering & Development','Application Migration Services','DevOps Enablement & CI/CD','Application Testing & Maintenance']},
    {n:'04',t:'Data, Analytics & AI',d:'BI, data engineering and machine learning that turn fragmented, siloed data into governed, trusted intelligence - available when teams need it.',subs:['BI Strategy, Governance & CoE','Power BI & Dashboard Solutions','Data Integration, Warehousing & ETL/ELT','Semantic Modeling & OLAP','Machine Learning & Predictive Analytics','NLP & Forecasting Solutions']},
    {n:'05',t:'Quality Engineering & Assurance',d:'Continuous, automated quality woven through the delivery lifecycle - so every release ships with confidence and every regression is caught before it costs you.',subs:['Functional & Integration Testing','Automation & Performance Testing','Self-Healing Test Automation','Continuous Testing in DevOps']},
    {n:'06',t:'Managed IT & Application Services',d:'Run, maintain and continuously improve your applications and platforms at enterprise scale - 24/7 monitoring, L1-L3 support, and proactive optimization.',subs:['Application & Technology Managed Services','Application Maintenance & Enhancements','L1/L2/L3 Support & Monitoring','Asset & Configuration Management','Incident, Problem, Change & Release']},
    {n:'07',t:'Talent Augmentation & Delivery',d:'Specialized technology talent, on demand and at pace - cloud architects, developers, QA specialists and data scientists embedded in your teams.',subs:['Specialized IT & Tech Talent On-Demand','Cloud Architects & Engineers','Software Developers (.NET, Java, React, Python)','QA Specialists & Data Scientists']},
    {n:'08',t:'Innovation & Emerging Technologies',d:'Future-ready capabilities - from enterprise generative AI and RPA to IoT, blockchain and immersive experiences. Applied where they create measurable value.',subs:['AI & Advanced Analytics Integration','Robotic Process Automation (RPA)','Internet of Things (IoT) Solutions','Blockchain & Smart Contracts','AR/VR Experiences','Generative AI Consulting']}
  ],fr:[
    {n:'01',t:'Strat\u00e9gie et consultation',d:'Strat\u00e9gie TI, feuilles de route et gouvernance qui partent de l\u00e0 o\u00f9 vous \u00eates - align\u00e9es sur vos r\u00e9sultats d\u2019affaires.',subs:['Services de strat\u00e9gie et feuille de route TI','Alignement de la vision et des affaires','\u00c9valuation de l\u2019\u00e9tat actuel et analyse des \u00e9carts','Piliers strat\u00e9giques et domaines cl\u00e9s','Op\u00e9rations TI et gestion des services','Gouvernance, risque et conformit\u00e9 (GRC)']},
    {n:'02',t:'Modernisation infonuagique',d:'Migration, automatisation et optimisation sur Azure, AWS et GCP - infrastructure moderne qui performe \u00e0 grande \u00e9chelle.',subs:['Strat\u00e9gie et migration (Azure, AWS, GCP)','R\u00e9h\u00e9bergement / Lift-and-Shift','SaaS, PaaS et modernisation des applications','Automatisation d\u2019infrastructure et CloudOps','Optimisation de la performance','D\u00e9ploiement ServiceNow']},
    {n:'03',t:'D\u00e9veloppement et int\u00e9gration',d:'Applications et int\u00e9grations sur mesure de bout en bout - du prototype \u00e0 la production. Architecture propre d\u00e8s le premier sprint.',subs:['D\u00e9veloppement d\u2019applications sur mesure','Conception, prototypage et ing\u00e9nierie UX/UI','Ing\u00e9nierie et d\u00e9veloppement d\u2019API','Services de migration d\u2019applications','DevOps et CI/CD','Tests et maintenance d\u2019applications']},
    {n:'04',t:'Donn\u00e9es, analytique et IA',d:'BI, ing\u00e9nierie des donn\u00e9es et apprentissage automatique qui transforment les donn\u00e9es fragment\u00e9es en intelligence gouvern\u00e9e et fiable.',subs:['Strat\u00e9gie BI, gouvernance et CdE','Solutions Power BI et tableaux de bord','Int\u00e9gration de donn\u00e9es et ETL/ELT','Mod\u00e9lisation s\u00e9mantique et OLAP','Apprentissage automatique et analytique pr\u00e9dictive','Solutions PNL et pr\u00e9vision']},
    {n:'05',t:'Ing\u00e9nierie de la qualit\u00e9',d:'Qualit\u00e9 automatis\u00e9e int\u00e9gr\u00e9e dans tout le cycle de livraison - chaque version livr\u00e9e avec confiance.',subs:['Tests fonctionnels et d\u2019int\u00e9gration','Tests de performance et automatisation','Cadres d\u2019automatisation auto-r\u00e9parateurs','Tests continus en DevOps']},
    {n:'06',t:'Services g\u00e9r\u00e9s TI',d:'Ex\u00e9cution, maintenance et am\u00e9lioration continue de vos applications \u00e0 l\u2019\u00e9chelle - surveillance 24/7, support L1-L3 et optimisation proactive.',subs:['Services g\u00e9r\u00e9s d\u2019applications','Maintenance et am\u00e9liorations','Support L1/L2/L3 et surveillance','Gestion des actifs et configurations','Incidents, probl\u00e8mes et changements']},
    {n:'07',t:'Augmentation de talents',d:'Talents technologiques sp\u00e9cialis\u00e9s \u00e0 la demande - architectes, d\u00e9veloppeurs, sp\u00e9cialistes QA et scientifiques des donn\u00e9es int\u00e9gr\u00e9s \u00e0 vos \u00e9quipes.',subs:['Talents TI sp\u00e9cialis\u00e9s \u00e0 la demande','Architectes et ing\u00e9nieurs infonuagiques','D\u00e9veloppeurs (.NET, Java, React, Python)','Sp\u00e9cialistes QA et scientifiques des donn\u00e9es']},
    {n:'08',t:'Innovation et technologies \u00e9mergentes',d:'Capacit\u00e9s tourn\u00e9es vers l\u2019avenir - de l\u2019IA g\u00e9n\u00e9rative et RPA \u00e0 l\u2019IoT et la cha\u00eene de blocs. Appliqu\u00e9es l\u00e0 o\u00f9 elles cr\u00e9ent de la valeur mesurable.',subs:['IA et analytique avanc\u00e9e','Automatisation robotique des processus (RPA)','Solutions Internet des objets (IoT)','Cha\u00eene de blocs et contrats intelligents','Exp\u00e9riences RA/RV','Consultation en IA g\u00e9n\u00e9rative']}
  ]};
  /* hero entrance */
  if(window.gsap&&!rm){gsap.from('.hero-copy > *',{opacity:0,y:42,stagger:.13,duration:1,ease:'power3.out',delay:.15});gsap.from('.hero-3d',{opacity:0,scale:.85,duration:1.3,ease:'power3.out',delay:.3});}
  function getLang(){return window.aimGetLang?window.aimGetLang():'en';}
  /* platforms marquee */
  var LOGOS=[
    {u:'https://cdn.prod.website-files.com/686f974b2e7de53e55148390/697cd039ae038b60414a61e1_download%20(3).avif',n:'Broadcom',z:1.45},
    {u:'https://cdn.prod.website-files.com/686f974b2e7de53e55148390/697cd039bafaf8e86ce72926_download%20(5).avif',n:'Documo',z:1.5},
    {u:'https://cdn.prod.website-files.com/686f974b2e7de53e55148390/697cd039512e13b12b29e147_5b110f53a79cb05e0f97a1c454d30f21_download.avif',n:'NinjaOne',z:1.45},
    {u:'https://cdn.prod.website-files.com/686f974b2e7de53e55148390/697cd039dd44853e0134d5aa_download%20(4).avif',n:'KnowBe4',z:1},
    {u:'https://cdn.prod.website-files.com/686f974b2e7de53e55148390/697cd039090c24a6c26e9023_bbc00621341fb52af69ab062984c47b1_download%20%281%29.avif',n:'Microsoft',z:1}
  ];
  function renderLogos(){var el=d.getElementById('platRow1');if(!el)return;el.innerHTML='';
    function addSet(){LOGOS.forEach(function(o){var a=d.createElement('div');a.className='lg';var img=d.createElement('img');img.alt=o.n;img.loading='eager';img.decoding='async';img.src=o.u;if(o.z&&o.z!==1){img.style.transform='scale('+o.z+')';}img.onerror=function(){a.style.display='none';};a.appendChild(img);el.appendChild(a);});}
    addSet();
    var target=(screen.width||window.innerWidth||1280)*1.3;var guard=0;
    while(el.scrollWidth<target&&guard<14){addSet();guard++;}
    var count=el.children.length;for(var i=0;i<count;i++){el.appendChild(el.children[i].cloneNode(true));}
  }
  renderLogos();
  /* cap tabs */
  var ct=d.querySelectorAll('.cap-tab'),cp=d.querySelectorAll('.cap-panel');
  ct.forEach(function(tb){tb.addEventListener('click',function(){var i=+tb.dataset.c;ct.forEach(function(x){x.classList.remove('active');});cp.forEach(function(x){x.classList.remove('active');});tb.classList.add('active');if(cp[i])cp[i].classList.add('active');});});
  /* case studies */
  var CASE_SLUGS=['/it-digital-strategy','/bi','/itsm','/aim-enterprise-ai-solutions','/mirlin-ai-knowledge-assistant'];
  function renderCases(){var track=d.getElementById('csTrack');if(!track)return;track.innerHTML='';var L=getLang();var cases=CASES[L]||CASES.en;cases.forEach(function(c,ci){var card=d.createElement('article');card.className='cs-card';card.innerHTML='<div class="cs-media"><img decoding="async" src="'+c.img+'" alt="'+esc(c.t)+'" loading="lazy" onerror="this.style.display=\'none\'"></div><div class="cs-body"><span class="cs-tag">'+(L==='fr'?'\u00c9tude de cas':'Case Study')+' \u00b7 '+esc(c.tag)+'</span><h3>'+esc(c.t)+'</h3><p>'+esc(c.d)+'</p><a href="'+(CASE_SLUGS[ci]||'#')+'" class="cs-link">'+(L==='fr'?'Lire l\u2019\u00e9tude \u2192':'Read case study \u2192')+'</a></div>';track.appendChild(card);});bind(track.querySelectorAll('a,.cs-card'));function cardStep(){var f=track.querySelector('.cs-card');return f?f.getBoundingClientRect().width+24:380;}var nx=d.getElementById('csNext'),pv=d.getElementById('csPrev');if(nx){nx.onclick=function(){if(track.scrollLeft+track.clientWidth>=track.scrollWidth-8){track.scrollTo({left:0,behavior:'smooth'});}else{track.scrollBy({left:cardStep(),behavior:'smooth'});}};}if(pv){pv.onclick=function(){track.scrollBy({left:-cardStep(),behavior:'smooth'});};}if(window._csAuto)clearInterval(window._csAuto);if(!rm){window._csAuto=setInterval(function(){if(track.scrollLeft+track.clientWidth>=track.scrollWidth-8){track.scrollTo({left:0,behavior:'smooth'});}else{track.scrollBy({left:cardStep(),behavior:'smooth'});}},4500);track.onmouseenter=function(){clearInterval(window._csAuto);};track.onmouseleave=function(){if(!rm)window._csAuto=setInterval(function(){if(track.scrollLeft+track.clientWidth>=track.scrollWidth-8)track.scrollTo({left:0,behavior:'smooth'});else track.scrollBy({left:cardStep(),behavior:'smooth'});},4500);}}}
  renderCases();
  /* services explorer */
  var SERV_SLUGS=['/strategy-and-advisory','/cloud-infrastructure-modernization','/application-development-integration-services','/data-analytics-ai','/quality-engineering-assurance','/managed-it-application-services','/talent-augmentation-delivery','/innovation-emerging-technologies'];
  function renderServ(){var list=d.getElementById('expList'),panel=d.getElementById('expPanel');if(!list||!panel)return;list.innerHTML='';var L=getLang();var serv=SERV[L]||SERV.en;var exploreLbl=L==='fr'?'Explorer la pratique \u2192':'Explore practice \u2192';function renderPanel(i){var sv=serv[i];var subs=sv.subs.map(function(x){return '<div>'+esc(x)+'</div>';}).join('');panel.innerHTML='<div class="pn">'+sv.n+' / '+(L==='fr'?'PRATIQUE':'PRACTICE')+'</div><h3>'+esc(sv.t)+'</h3><p class="pd">'+esc(sv.d)+'</p><div class="exp-subs">'+subs+'</div><div class="pcta"><a href="'+(SERV_SLUGS[i]||'#')+'" class="btn btn-primary">'+exploreLbl+'</a></div>';bind(panel.querySelectorAll('a,.btn'));}function select(i){var items=list.querySelectorAll('.exp-item');items.forEach(function(x){x.classList.remove('active');});if(items[i])items[i].classList.add('active');renderPanel(i);}serv.forEach(function(sv,i){var it=d.createElement('div');it.className='exp-item'+(i===0?' active':'');it.innerHTML='<span class="en">'+sv.n+'</span><h3>'+esc(sv.t)+'</h3>';it.addEventListener('mouseenter',function(){select(i);});it.addEventListener('click',function(){select(i);});list.appendChild(it);});renderPanel(0);bind(list.querySelectorAll('.exp-item'));}
  renderServ();
  /* re-render on language change */
  window.addEventListener('aim-lang-change',function(){renderCases();renderServ();});
});

})();
/*__AIM_BLOCK__*/
;(function(){

(function(){
  var mount=document.getElementById('archGL');
  var panel=document.querySelector('.hero-3d');
  var heroSection=document.querySelector('.hero');
  if(!mount||!panel||!heroSection||!window.THREE)return;
  var W=heroSection.clientWidth,H=heroSection.clientHeight;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(45,W/H,0.1,100);
  camera.position.set(0,0,7.4);
  var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.setSize(W,H);
  mount.appendChild(renderer.domElement);
  var ORBIT_RADIUS=2.3; /* must match the radius used in fixedSlot() below */
  var rig=new THREE.Group(); scene.add(rig);
  /* the canvas spans the full header so nothing hard-clips at a column edge, and the whole
     structure is biased right so it still reads as "belonging" to that side - but the bias
     and scale are both recalculated from the ACTUAL camera frustum each resize, so nodes
     orbiting at the far edge can never swing outside the visible frame on either side */
  var STAGE_FRACTION=0.74, SAFE_MARGIN=0.86;
  function applyStageBias(){
    var halfFovV=(camera.fov/2)*Math.PI/180;
    var halfFovH=Math.atan(Math.tan(halfFovV)*camera.aspect);
    var visibleHalfW=camera.position.z*Math.tan(halfFovH);
    var maxScale=(visibleHalfW*SAFE_MARGIN)/ORBIT_RADIUS;
    var scale=Math.min(1.3,maxScale);
    rig.scale.setScalar(scale);
    var orbitExtent=ORBIT_RADIUS*scale;
    var maxBias=Math.max(0,visibleHalfW*SAFE_MARGIN-orbitExtent);
    var desiredBias=(STAGE_FRACTION-0.5)*2*visibleHalfW;
    rig.position.x=Math.min(desiredBias,maxBias);
  }
  applyStageBias();
  var hub=new THREE.Mesh(new THREE.IcosahedronGeometry(0.5,1), new THREE.MeshBasicMaterial({color:0xA100FF,wireframe:true,transparent:true,opacity:.9}));
  rig.add(hub);
  var hubCore=new THREE.Mesh(new THREE.SphereGeometry(0.2,16,16), new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.85}));
  rig.add(hubCore);
  var hubRing=new THREE.Mesh(new THREE.TorusGeometry(0.85,0.008,8,80), new THREE.MeshBasicMaterial({color:0x3D32D9,transparent:true,opacity:.45}));
  hubRing.rotation.x=Math.PI/2.3;
  rig.add(hubRing);
  var pGeo=new THREE.BufferGeometry(); var PCOUNT=320, pos=new Float32Array(PCOUNT*3);
  for(var i=0;i<PCOUNT;i++){var r=1.6+Math.random()*3.2,th=Math.random()*Math.PI*2,ph=Math.random()*Math.PI;
    pos[i*3]=r*Math.sin(ph)*Math.cos(th); pos[i*3+1]=r*Math.sin(ph)*Math.sin(th)*0.55; pos[i*3+2]=r*Math.cos(ph)*0.65;}
  pGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  var points=new THREE.Points(pGeo,new THREE.PointsMaterial({color:0x6A5CFF,size:0.032,transparent:true,opacity:.6}));
  rig.add(points);
  function isDarkTheme(){
    var b=document.body;
    return b.classList.contains('t-dark')||b.classList.contains('t-hybrid');
  }
  function makeLabel(text){
    var c=document.createElement('canvas'); c.width=300;c.height=72;
    var cx=c.getContext('2d');
    cx.font='700 32px Poppins, sans-serif'; cx.fillStyle=isDarkTheme()?'#ffffff':'#1800AD';
    cx.textAlign='center'; cx.textBaseline='middle'; cx.fillText(text,150,36);
    var tex=new THREE.CanvasTexture(c);
    var sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));
    sp.scale.set(1.3,0.32,1);
    return sp;
  }
  var DESCR={
    AI:'Agentic AI, deployed & governed',
    Data:'Unified data, governed pipelines',
    Cloud:'Migration & modernization at scale',
    Apps:'Custom apps, engineered end to end',
    Security:'Real-time policy enforcement',
    Governance:'Architecture-first, outcome-measured'
  };
  var ANCHORS={AI:'#services',Data:'#services',Cloud:'#services',Apps:'#services',Security:'#about',Governance:'#about'};
  var domLayer=document.getElementById('archDomLayer');
  var GOLD=Math.PI*(3-Math.sqrt(5));
  var blocks=[], count=0;
  var MAX_SLOTS=6;
  function fixedSlot(i){
    var radius=ORBIT_RADIUS;
    var y=1-(2*(i+0.5))/MAX_SLOTS;
    var rad=Math.sqrt(Math.max(0,1-y*y));
    var theta=GOLD*i;
    return new THREE.Vector3(Math.cos(theta)*rad*radius, y*radius*0.55, Math.sin(theta)*rad*radius);
  }
  /* every slot is computed once, up front, and never recalculated - so adding a new capability
     never moves the ones already settled (that was the cause of everything piling into one spot) */
  var SLOTS=[]; for(var _i=0;_i<MAX_SLOTS;_i++) SLOTS.push(fixedSlot(_i));
  function addBlock(text){
    var slotIndex=blocks.length;
    count++;
    var mesh=new THREE.Mesh(new THREE.OctahedronGeometry(0.22,0), new THREE.MeshBasicMaterial({color:0xC15AFF,wireframe:true,transparent:true,opacity:.95}));
    var startDir=new THREE.Vector3((Math.random()-.5),(Math.random()-.5),(Math.random()-.5)).normalize().multiplyScalar(7.5);
    mesh.position.copy(startDir);
    rig.add(mesh);
    var label=makeLabel(text);
    label.position.copy(mesh.position).add(new THREE.Vector3(0,0.36,0));
    rig.add(label);
    var lineGeo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),mesh.position.clone()]);
    var line=new THREE.Line(lineGeo,new THREE.LineBasicMaterial({color:0x6A5CFF,transparent:true,opacity:.5}));
    rig.add(line);
    blocks.push({mesh:mesh,label:label,line:line,target:SLOTS[slotIndex].clone(),text:text,settled:false,link:ANCHORS[text]||'#services'});
    var counterEl=document.getElementById('archCount'); if(counterEl) counterEl.textContent=count;
  }
  function setActive(b,on){
    if(b.active===on)return;
    b.active=on;
    b.domEl.classList.toggle('active',on);
  }
  function settleBlock(b){
    b.settled=true;
    rig.remove(b.label);
    b.mesh.material.color.set(isDarkTheme()?0x6A5CFF:0x1800AD);
    b.mesh.material.opacity=1;
    b.pop=1;
    var node=document.createElement('div'); node.className='arch-node';
    var dot=document.createElement('div'); dot.className='arch-dot';
    var a=document.createElement('a'); a.className='arch-placard'; a.href=b.link;
    a.innerHTML='<div class="ap-title">'+b.text+'</div><div class="ap-desc">'+(DESCR[b.text]||'')+'</div><div class="ap-cta">Explore \u2192</div>';
    a.addEventListener('click',function(e){ e.preventDefault(); goTo(b.link); });
    node.appendChild(dot); node.appendChild(a);
    domLayer.appendChild(node);
    b.domEl=node; b.active=false;
    node.addEventListener('mouseenter',function(){ b.hoverLock=true; setActive(b,true); });
    node.addEventListener('mouseleave',function(){ b.hoverLock=false; setActive(b,false); });
    /* auto-reveal the newest node's card briefly so the "build" visibly pays off, then settle back to a dot */
    setActive(b,true);
    setTimeout(function(){ if(!b.hoverLock) setActive(b,false); },2400);
    var hintEl=panel.querySelector('.arch-hint');
    if(hintEl) hintEl.textContent='Hover a node to explore that capability';
  }
  function goTo(link){
    var el=document.querySelector(link);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  }
  document.querySelectorAll('#archCaps .arch-cap').forEach(function(c){
    c.addEventListener('click',function(){
      if(c.classList.contains('added'))return;
      c.classList.add('added');
      addBlock(c.dataset.t);
    });
  });
  var resetBtn=document.getElementById('archReset');
  if(resetBtn) resetBtn.addEventListener('click',function(){
    blocks.forEach(function(b){rig.remove(b.mesh);rig.remove(b.label);rig.remove(b.line);if(b.domEl)b.domEl.remove();});
    blocks=[]; count=0;
    var counterEl=document.getElementById('archCount'); if(counterEl) counterEl.textContent=0;
    document.querySelectorAll('#archCaps .arch-cap').forEach(function(c){c.classList.remove('added');});
    var hintEl=panel.querySelector('.arch-hint');
    if(hintEl) hintEl.textContent='Click a capability to build';
  });
  function resize(){ W=heroSection.clientWidth;H=heroSection.clientHeight; if(!W||!H)return; camera.aspect=W/H; camera.updateProjectionMatrix(); applyStageBias(); renderer.setSize(W,H); }
  window.addEventListener('resize',resize);
  var rotY=0.35, rotX=0.05, targetRotY=rotY, targetRotX=rotX, dragging=false, dragMoved=false, lastX=0,lastY=0, lastDragTime=0;
  var stageEl=document.getElementById('archStage');
  stageEl.addEventListener('mousedown',function(e){
    if(e.target.closest('.arch-cap')||e.target.closest('.arch-reset')||e.target.closest('.arch-placard')||e.target.closest('.arch-node'))return;
    dragging=true; dragMoved=false; lastX=e.clientX; lastY=e.clientY;
  });
  window.addEventListener('mousemove',function(e){
    if(dragging){
      var dx=e.clientX-lastX, dy=e.clientY-lastY;
      if(Math.abs(dx)>2||Math.abs(dy)>2) dragMoved=true;
      targetRotY+=dx*0.006; targetRotX+=dy*0.004;
      targetRotX=Math.max(-0.45,Math.min(0.45,targetRotX));
      lastX=e.clientX; lastY=e.clientY; lastDragTime=performance.now();
    }
  });
  window.addEventListener('mouseup',function(){dragging=false;});
  var projVec=new THREE.Vector3();
  var CARD_W=150, CARD_H=64, CARD_GAP=14;
  function updatePlacardPositions(){
    var settled=blocks.filter(function(b){return b.settled&&b.domEl;});
    var raw=settled.map(function(b){
      projVec.copy(b.mesh.position).applyMatrix4(rig.matrixWorld);
      projVec.project(camera);
      return {b:b, x:(projVec.x*0.5+0.5)*W, y:(-projVec.y*0.5+0.5)*H, behind:projVec.z>1};
    });
    /* every node's dot: simple direct placement, always on */
    raw.forEach(function(r){
      var b=r.b;
      if(r.behind){ b.domEl.style.display='none'; return; }
      b.domEl.style.display='';
      if(b.curX===undefined){ b.curX=r.x; b.curY=r.y; }
      b.curX+=(r.x-b.curX)*0.22; b.curY+=(r.y-b.curY)*0.22;
      b.domEl.style.left=b.curX+'px';
      b.domEl.style.top=b.curY+'px';
    });
    /* only the (typically 1, occasionally 2) active cards need collision resolution -
       small subset, so this comfortably guarantees no overlap rather than hoping 3D spacing avoids it */
    var active=raw.filter(function(r){return r.b.active&&!r.behind;});
    if(active.length>1){
      var halfW=CARD_W+CARD_GAP, halfH=CARD_H+CARD_GAP;
      var pts=active.map(function(r){return {x:r.b.curX,y:r.b.curY-CARD_H/2-22};});
      for(var iter=0;iter<8;iter++){
        for(var i=0;i<pts.length;i++){
          for(var j=i+1;j<pts.length;j++){
            var dx=pts[j].x-pts[i].x, dy=pts[j].y-pts[i].y;
            var ox=halfW-Math.abs(dx), oy=halfH-Math.abs(dy);
            if(ox>0&&oy>0){
              if(ox<oy){ var push=ox/2*(dx<0?-1:1)||1; pts[i].x-=push; pts[j].x+=push; }
              else { var pushY=oy/2*(dy<0?-1:1)||1; pts[i].y-=pushY; pts[j].y+=pushY; }
            }
          }
        }
      }
      active.forEach(function(r,idx){
        var card=r.b.domEl.querySelector('.arch-placard');
        var offX=pts[idx].x-r.b.curX, offY=(pts[idx].y+CARD_H/2+22)-r.b.curY;
        card.style.transform='translate(calc(-50% + '+offX+'px), '+offY+'px)';
      });
    } else {
      active.forEach(function(r){
        r.b.domEl.querySelector('.arch-placard').style.transform='';
      });
    }
  }
  var clock=new THREE.Clock();
  /* This scene rendered every frame forever, with no check for whether
     .hero-3d was even on screen -- once the page scrolled past the hero, the
     GPU kept doing a full render pass (plus per-block buffer re-uploads from
     the needsUpdate flags below) 60 times a second for content nobody could
     see, competing with the browser's own scroll compositing and dropping
     frames elsewhere on the page. Gate the loop on actual visibility: stop
     scheduling new frames once the hero scrolls out of view, and let the
     IntersectionObserver restart it when the hero is visible again. Nothing
     inside animate() changes, so the animation itself is unaffected while
     visible -- this only stops it from running unseen. */
  var heroVisible=true, rafId=null;
  function animate(){
    rafId=heroVisible?requestAnimationFrame(animate):null;
    if(!heroVisible)return;
    var t=clock.getElapsedTime(), now=performance.now();
    if(!dragging && now-lastDragTime>1800){ targetRotY+=0.0016; }
    rotY+=(targetRotY-rotY)*0.08; rotX+=(targetRotX-rotX)*0.08;
    rig.rotation.y=rotY; rig.rotation.x=rotX;
    rig.updateMatrixWorld();
    hub.rotation.y+=0.004; hub.rotation.x+=0.002;
    hubRing.rotation.z+=0.003;
    hubCore.scale.setScalar(1+Math.sin(t*1.6)*0.05);
    points.rotation.y+=0.0007;
    blocks.forEach(function(b){
      if(!b.settled){
        b.mesh.position.lerp(b.target,0.045);
        b.mesh.rotation.x+=0.01; b.mesh.rotation.y+=0.013;
        b.label.position.copy(b.mesh.position).add(new THREE.Vector3(0,0.36,0));
        if(b.mesh.position.distanceTo(b.target)<0.04) settleBlock(b);
      } else {
        if(b.pop>0){ b.pop*=0.85; var s=1+b.pop*0.35; b.mesh.scale.setScalar(s); if(b.pop<0.02){b.pop=0;b.mesh.scale.setScalar(1);} }
        b.mesh.rotation.y+=0.006;
      }
      var pa=b.line.geometry.attributes.position;
      pa.setXYZ(1,b.mesh.position.x,b.mesh.position.y,b.mesh.position.z);
      pa.needsUpdate=true;
    });
    updatePlacardPositions();
    renderer.render(scene,camera);
  }
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(entries){
      var wasVisible=heroVisible;
      heroVisible=entries[0].isIntersecting;
      if(heroVisible&&!wasVisible&&!rafId)rafId=requestAnimationFrame(animate);
    },{threshold:0}).observe(heroSection);
  }
  resize();
  animate();
  /* keep already-settled nodes correct if the site's light/dark toggle is flipped without a reload */
  var themeObserver=new MutationObserver(function(){
    var dark=isDarkTheme(), col=dark?0x6A5CFF:0x1800AD;
    blocks.forEach(function(b){ if(b.settled) b.mesh.material.color.set(col); });
  });
  themeObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
})();

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
    // Cache each element's half-width/half-height once instead of reading
    // offsetWidth/offsetHeight on every animation frame: both are fixed-size
    // (CSS-defined) elements, so their size never changes after creation, but
    // offsetWidth/offsetHeight force a synchronous layout flush on every read.
    // Doing that 60x/second, forever (this rAF loop never stops once started),
    // was the real cause of the cursor lag -- worst over the Services mega-menu,
    // since that forced flush also has to settle its large backdrop-filter layer.
    var curHalfW=cur.offsetWidth/2,curHalfH=cur.offsetHeight/2,haloHalfW=halo.offsetWidth/2,haloHalfH=halo.offsetHeight/2;
    var cx=0,cy=0,tx=0,ty=0,hx=0,hy=0,raf=null;
    function lerp(a,b,t){return a+(b-a)*t;}
    function tick(){
      cx=lerp(cx,tx,rm?1:0.24);cy=lerp(cy,ty,rm?1:0.24);
      hx=lerp(hx,tx,rm?1:0.09);hy=lerp(hy,ty,rm?1:0.09);
      cur.style.transform='translate('+(cx-curHalfW)+'px,'+(cy-curHalfH)+'px)';
      halo.style.transform='translate('+(hx-haloHalfW)+'px,'+(hy-haloHalfH)+'px)';
      raf=requestAnimationFrame(tick);
    }
    window.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!raf){cx=tx;cy=ty;hx=tx;hy=ty;cur.style.transform='translate('+(cx-curHalfW)+'px,'+(cy-curHalfH)+'px)';halo.style.transform='translate('+(hx-haloHalfW)+'px,'+(hy-haloHalfH)+'px)';cur.style.opacity='';halo.style.opacity='';raf=requestAnimationFrame(tick);}});
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
    d.querySelectorAll('.has-dd > a').forEach(function(a){ a.addEventListener('click',function(e){ if(window.matchMedia('(max-width:1400px)').matches){ e.preventDefault(); a.parentElement.classList.toggle('open'); } }); });
    nav.querySelectorAll('a[href="#"]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); }); });
  }
  /* ===== THEME TOGGLE =====
     Bound immediately and unconditionally in app/layout.jsx instead (see
     THEME_NOFLASH) -- the toggle has no real dependency on the libraries this
     script waits for, and gating it here meant an early click could silently
     do nothing. ===== */
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
/*__AIM_BLOCK__*/
;(function(){

if (typeof PureCounter !== 'undefined') {
       new PureCounter({
    selector: '.partners',
    start: 0,
    end: 20,
    duration: 2,
    delay: 20,
    once: true,
    repeat: false,
    decimals: 0,
    legacy: true,
    filesizing: false,
    currency: false,
    separator: false,
});
new PureCounter({
    selector: '.clients',
    start: 0,
    end: 300,
    duration: 2,
    delay: 20,
    once: true,
    repeat: false,
    decimals: 0,
    legacy: true,
    filesizing: false,
    currency: false,
    separator: false,
});
new PureCounter({
    selector: '.projects',
    start: 0,
    end: 1,
    duration: 2,
    delay: 20,
    once: true,
    repeat: false,
    decimals: 0,
    legacy: true,
    filesizing: false,
    currency: false,
    separator: false,
});
new PureCounter({
    selector: '.experience',
    start: 0,
    end: 15,
    duration: 2,
    delay: 20,
    once: true,
    repeat: false,
    decimals: 0,
    legacy: true,
    filesizing: false,
    currency: false,
    separator: false,
});
} else {
  console.warn('[aim] PureCounter failed to load (CDN blocked or unreachable) -- hero stat counters will not animate.');
}
    
})();