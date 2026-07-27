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
    'hero.h1':{en:'The Zain Test Firm That Ships AI <span class="g">- and Runs It.</span>',fr:'La firme d\u2019architecture qui livre l\u2019IA <span class="g">- et la g\u00e8re.</span>'},
    'hero.sub':{en:'AIM architects the complete AI stack - from enterprise data foundations to production-ready agents. We start with architecture. We measure outcomes. We stay vendor-neutral.',fr:'AIM con\u00e7oit la pile IA compl\u00e8te - des fondations de donn\u00e9es aux agents en production. Architecture d\u2019abord. R\u00e9sultats mesur\u00e9s. Neutralit\u00e9 fournisseur.'},
    'hero.cta1':{en:'Let\u2019s connect \u2192',fr:'Contactez-nous \u2192'},
    'hero.cta2':{en:'Explore services',fr:'D\u00e9couvrir nos services'},
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
    'stat.l0':{en:'Years of enterprise delivery',fr:'Ann\u00e9es de livraison d\u2019entreprise'},'stat.l1':{en:'Implementations completed',fr:'Impl\u00e9mentations compl\u00e9t\u00e9es'},'stat.l2':{en:'Client re-engagement rate',fr:'Taux de r\u00e9engagement client'},'stat.l3':{en:'Global offices',fr:'Bureaux mondiaux'},
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
    {n:'01',t:'Strategy & Advisory',d:'IT strategy, roadmaps and governance that start with where you are - not where a framework assumes you should be. Aligned to your business outcomes.',subs:['IT Strategy & Roadmap Services','Vision & Business Alignment','Current State Assessment & Gap Analysis','Strategic Pillars & Focus Areas','IT Operations & Service Management','Governance, Risk & Compliance (GRC)','Business Optimization & Transformation']},
    {n:'02',t:'Cloud & Infrastructure Modernization',d:'Migration, automation and optimization across Azure, AWS and GCP - modern infrastructure that performs at scale, stays secure, and supports your AI workloads.',subs:['Cloud Strategy & Migration (Azure, AWS, GCP)','Rehosting, Refactoring & Replatforming','SaaS, PaaS & Cloud-native Rebuilding','Infrastructure Automation & CloudOps','Performance Optimization & Monitoring','ServiceNow Deployment & Managed Services']},
    {n:'03',t:'Application Development & Integration',d:'Custom applications and integrations engineered end to end - from prototype to production, web to mobile, API to deployment. Clean architecture from the first sprint.',subs:['Custom Application Development','Design, Prototyping & UI/UX Engineering','API Development & Integration','Application Migration Services','DevOps Enablement & CI/CD','Application Testing & Maintenance']},
    {n:'04',t:'Data, Analytics & AI',d:'BI, data engineering and machine learning that turn fragmented, siloed data into governed, trusted intelligence - available when teams need it.',subs:['BI Strategy, Governance & CoE','Power BI & Dashboard Solutions','Data Integration, Warehousing & ETL/ELT','Semantic Modeling & OLAP','Predictive Analytics & ML Models','NLP & Forecasting Solutions']},
    {n:'05',t:'Quality Engineering & Assurance',d:'Continuous, automated quality woven through the delivery lifecycle - so every release ships with confidence and every regression is caught before it costs you.',subs:['Functional & Integration Testing','Automation & Performance Testing','Self-Healing Test Automation','Continuous Testing in DevOps']},
    {n:'06',t:'Managed IT & Application Services',d:'Run, maintain and continuously improve your applications and platforms at enterprise scale - 24/7 monitoring, L1-L3 support, and proactive optimization.',subs:['Application & Technology Managed Services','Application Maintenance & Enhancements','L1/L2/L3 Support & Monitoring','Asset & Configuration Management','Incident, Problem, Change & Release']},
    {n:'07',t:'Talent Augmentation & Delivery',d:'Specialized technology talent, on demand and at pace - cloud architects, developers, QA specialists and data scientists embedded in your teams.',subs:['Specialized IT & Tech Talent On-Demand','Cloud Architects & Engineers','Software Developers (.NET, Java, React, Python)','QA Specialists & Data Scientists','Agile Project Managers & Scrum Masters','Nearshore & Offshore Delivery Models']},
    {n:'08',t:'Innovation & Emerging Technologies',d:'Future-ready capabilities - from enterprise generative AI and RPA to IoT, blockchain and immersive experiences. Applied where they create measurable value.',subs:['AI & Advanced Analytics Integration','Robotic Process Automation (RPA)','Internet of Things (IoT) Solutions','Blockchain & Smart Contracts','AR/VR Experiences','Generative AI Consulting']}
  ],fr:[
    {n:'01',t:'Strat\u00e9gie et consultation',d:'Strat\u00e9gie TI, feuilles de route et gouvernance qui partent de l\u00e0 o\u00f9 vous \u00eates - align\u00e9es sur vos r\u00e9sultats d\u2019affaires.',subs:['Services de strat\u00e9gie et feuille de route TI','Alignement de la vision et des affaires','\u00c9valuation de l\u2019\u00e9tat actuel et analyse des \u00e9carts','Piliers strat\u00e9giques et domaines cl\u00e9s','Op\u00e9rations TI et gestion des services','Gouvernance, risque et conformit\u00e9 (GRC)','Optimisation et transformation']},
    {n:'02',t:'Modernisation infonuagique',d:'Migration, automatisation et optimisation sur Azure, AWS et GCP - infrastructure moderne qui performe \u00e0 grande \u00e9chelle.',subs:['Strat\u00e9gie et migration (Azure, AWS, GCP)','R\u00e9h\u00e9bergement, refactorisation et replatformage','SaaS, PaaS et reconstruction native','Automatisation d\u2019infrastructure et CloudOps','Optimisation de la performance','D\u00e9ploiement ServiceNow']},
    {n:'03',t:'D\u00e9veloppement et int\u00e9gration',d:'Applications et int\u00e9grations sur mesure de bout en bout - du prototype \u00e0 la production. Architecture propre d\u00e8s le premier sprint.',subs:['D\u00e9veloppement d\u2019applications sur mesure','Conception, prototypage et ing\u00e9nierie UX/UI','D\u00e9veloppement et int\u00e9gration d\u2019API','Services de migration d\u2019applications','DevOps et CI/CD','Tests et maintenance d\u2019applications']},
    {n:'04',t:'Donn\u00e9es, analytique et IA',d:'BI, ing\u00e9nierie des donn\u00e9es et apprentissage automatique qui transforment les donn\u00e9es fragment\u00e9es en intelligence gouvern\u00e9e et fiable.',subs:['Strat\u00e9gie BI, gouvernance et CdE','Solutions Power BI et tableaux de bord','Int\u00e9gration de donn\u00e9es et ETL/ELT','Mod\u00e9lisation s\u00e9mantique et OLAP','Analytique pr\u00e9dictive et mod\u00e8les ML','Solutions PNL et pr\u00e9vision']},
    {n:'05',t:'Ing\u00e9nierie de la qualit\u00e9',d:'Qualit\u00e9 automatis\u00e9e int\u00e9gr\u00e9e dans tout le cycle de livraison - chaque version livr\u00e9e avec confiance.',subs:['Tests fonctionnels et d\u2019int\u00e9gration','Tests de performance et automatisation','Cadres d\u2019automatisation auto-r\u00e9parateurs','Tests continus en DevOps']},
    {n:'06',t:'Services g\u00e9r\u00e9s TI',d:'Ex\u00e9cution, maintenance et am\u00e9lioration continue de vos applications \u00e0 l\u2019\u00e9chelle - surveillance 24/7, support L1-L3 et optimisation proactive.',subs:['Services g\u00e9r\u00e9s d\u2019applications','Maintenance et am\u00e9liorations','Support L1/L2/L3 et surveillance','Gestion des actifs et configurations','Incidents, probl\u00e8mes et changements']},
    {n:'07',t:'Augmentation de talents',d:'Talents technologiques sp\u00e9cialis\u00e9s \u00e0 la demande - architectes, d\u00e9veloppeurs, sp\u00e9cialistes QA et scientifiques des donn\u00e9es int\u00e9gr\u00e9s \u00e0 vos \u00e9quipes.',subs:['Talents TI sp\u00e9cialis\u00e9s \u00e0 la demande','Architectes et ing\u00e9nieurs infonuagiques','D\u00e9veloppeurs (.NET, Java, React, Python)','Sp\u00e9cialistes QA et scientifiques des donn\u00e9es','Gestionnaires de projet agiles','Mod\u00e8les nearshore et offshore']},
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
  function renderCases(){var track=d.getElementById('csTrack');if(!track)return;track.innerHTML='';var L=getLang();var cases=CASES[L]||CASES.en;cases.forEach(function(c){var card=d.createElement('article');card.className='cs-card';card.innerHTML='<div class="cs-media"><img decoding="async" src="'+c.img+'" alt="'+esc(c.t)+'" loading="lazy" onerror="this.style.display=\'none\'"></div><div class="cs-body"><span class="cs-tag">'+(L==='fr'?'\u00c9tude de cas':'Case Study')+' \u00b7 '+esc(c.tag)+'</span><h3>'+esc(c.t)+'</h3><p>'+esc(c.d)+'</p><a href="#" class="cs-link">'+(L==='fr'?'Lire l\u2019\u00e9tude \u2192':'Read case study \u2192')+'</a></div>';track.appendChild(card);});bind(track.querySelectorAll('a,.cs-card'));function cardStep(){var f=track.querySelector('.cs-card');return f?f.getBoundingClientRect().width+24:380;}var nx=d.getElementById('csNext'),pv=d.getElementById('csPrev');if(nx){nx.onclick=function(){if(track.scrollLeft+track.clientWidth>=track.scrollWidth-8){track.scrollTo({left:0,behavior:'smooth'});}else{track.scrollBy({left:cardStep(),behavior:'smooth'});}};}if(pv){pv.onclick=function(){track.scrollBy({left:-cardStep(),behavior:'smooth'});};}if(window._csAuto)clearInterval(window._csAuto);if(!rm){window._csAuto=setInterval(function(){if(track.scrollLeft+track.clientWidth>=track.scrollWidth-8){track.scrollTo({left:0,behavior:'smooth'});}else{track.scrollBy({left:cardStep(),behavior:'smooth'});}},4500);track.onmouseenter=function(){clearInterval(window._csAuto);};track.onmouseleave=function(){if(!rm)window._csAuto=setInterval(function(){if(track.scrollLeft+track.clientWidth>=track.scrollWidth-8)track.scrollTo({left:0,behavior:'smooth'});else track.scrollBy({left:cardStep(),behavior:'smooth'});},4500);}}}
  renderCases();
  /* services explorer */
  function renderServ(){var list=d.getElementById('expList'),panel=d.getElementById('expPanel');if(!list||!panel)return;list.innerHTML='';var L=getLang();var serv=SERV[L]||SERV.en;var exploreLbl=L==='fr'?'Explorer la pratique \u2192':'Explore practice \u2192';function renderPanel(i){var sv=serv[i];var subs=sv.subs.map(function(x){return '<div>'+esc(x)+'</div>';}).join('');panel.innerHTML='<div class="pn">'+sv.n+' / '+(L==='fr'?'PRATIQUE':'PRACTICE')+'</div><h3>'+esc(sv.t)+'</h3><p class="pd">'+esc(sv.d)+'</p><div class="exp-subs">'+subs+'</div><div class="pcta"><a href="#" class="btn btn-primary">'+exploreLbl+'</a></div>';bind(panel.querySelectorAll('a,.btn'));}function select(i){var items=list.querySelectorAll('.exp-item');items.forEach(function(x){x.classList.remove('active');});if(items[i])items[i].classList.add('active');renderPanel(i);}serv.forEach(function(sv,i){var it=d.createElement('div');it.className='exp-item'+(i===0?' active':'');it.innerHTML='<span class="en">'+sv.n+'</span><h3>'+esc(sv.t)+'</h3>';it.addEventListener('mouseenter',function(){select(i);});it.addEventListener('click',function(){select(i);});list.appendChild(it);});renderPanel(0);bind(list.querySelectorAll('.exp-item'));}
  renderServ();
  /* re-render on language change */
  window.addEventListener('aim-lang-change',function(){renderCases();renderServ();});
});

})();
/*__AIM_BLOCK__*/
;(function(){

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
    
})();