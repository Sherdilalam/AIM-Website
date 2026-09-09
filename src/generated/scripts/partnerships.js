;(function(){

window.addEventListener('load',function(){
  var d=document;
  var gridEl=d.getElementById('pnrGrid');
  var tabsEl=d.getElementById('pnrTabs');
  var countEl=d.getElementById('pnrCount');
  var searchEl=d.getElementById('pnrSearch');
  if(!gridEl||!tabsEl||!countEl||!searchEl) return;
  var bind=window.aimBindCursor||function(){};

  /* Sorted A-Z at build time, so no sort is needed at runtime. */
  var PARTNERS=[
  {"id":"adobe","name":"Adobe","category":"Productivity & Collaboration","status":"active","tagline":"Creative, document, and marketing software","desc":"Adobe's creative and document tools, including Acrobat and the Creative Cloud suite, support the content and design work AIM produces for its own and client campaigns.","tags":["Creative Cloud","Acrobat","Document Tools"]},
  {"id":"akamai","name":"Akamai","category":"Cybersecurity & Risk","status":"active","tagline":"Content delivery and edge security","desc":"Akamai's edge network and security platform give AIM clients faster content delivery alongside DDoS protection and web application security controls.","tags":["CDN","Edge Security","DDoS Protection"]},
  {"id":"anthropic","name":"Anthropic","category":"AI & Automation","status":"active","tagline":"Claude models for governed enterprise AI","desc":"Anthropic's Claude models anchor AIM's AI and Data practice, used for retrieval-augmented generation, agentic systems, and governed enterprise AI deployments.","tags":["Claude","RAG","Agentic Systems"]},
  {"id":"aris","name":"ARIS","category":"AI & Automation","status":"active","tagline":"Business process modeling and analysis","desc":"Software AG's ARIS platform supports AIM's process modeling and business architecture work, giving clients a shared, governed view of how work actually runs.","tags":["Process Modeling","Business Architecture","BPM"]},
  {"id":"azeus-software","name":"Azeus Software","category":"Specialty & Industry Solutions","status":"active","tagline":"Paperless board meeting software","desc":"Azeus Convene's board portal software supports AIM's governance-focused clients with secure meeting papers, minutes, and voting for boards and committees.","tags":["Board Portal","Governance","Meeting Management"]},
  {"id":"bizdesign-hopex","name":"Bizdesign (HopeX)","category":"Specialty & Industry Solutions","status":"active","tagline":"Enterprise architecture management platform","desc":"This enterprise architecture and business process management platform helps AIM's architecture practice document and govern how systems, processes, and capabilities connect across a client organization.","tags":["Enterprise Architecture","Business Process Management"]},
  {"id":"botpress","name":"Botpress","category":"AI & Automation","status":"active","tagline":"Conversational AI and chatbot platform","desc":"Botpress is one of AIM's certified conversational AI partners, used to design and deploy chatbot and virtual assistant experiences grounded in client data.","tags":["Conversational AI","Chatbots","Certified Partner"]},
  {"id":"bria","name":"Bria (CounterPath/Alianza)","category":"Communications & Customer Engagement","status":"active","tagline":"Softphone and business calling app","desc":"Bria's softphone application, from CounterPath and now Alianza, gives AIM clients a flexible business calling option for distributed and remote teams.","tags":["Softphone","VoIP","Unified Communications"]},
  {"id":"broadcom-ims","name":"Broadcom (IMS)","category":"Cloud & Infrastructure","status":"active","tagline":"Infrastructure software for mission-critical systems","desc":"Broadcom's infrastructure and management software portfolio supports mainframe modernization, systems management, and application continuity for AIM's infrastructure clients.","tags":["Infrastructure Software","Systems Management"]},
  {"id":"broadcom-layer7","name":"Broadcom Layer7","category":"Cloud & Infrastructure","status":"active","tagline":"API gateway and policy-as-code platform","desc":"Broadcom Layer7 API Gateway is a core platform in AIM's integration practice, providing API security, traffic management, and policy-as-code controls for enterprise and AI workloads.","tags":["API Gateway","API Security","Policy-as-Code"]},
  {"id":"browserstack","name":"BrowserStack","category":"Development & Testing","status":"active","tagline":"Cross-browser and device testing","desc":"BrowserStack's cloud testing platform lets AIM's development team validate applications across real browsers and devices before they reach production.","tags":["Cross-Browser Testing","Device Testing","QA"]},
  {"id":"canonical-ubuntu","name":"Canonical (Ubuntu)","category":"Cloud & Infrastructure","status":"active","tagline":"Open-source operating system and cloud tooling","desc":"Canonical's Ubuntu operating system and cloud infrastructure tooling underpin open-source deployments AIM builds and supports for clients running Linux-based workloads.","tags":["Linux","Open Source","Cloud Infrastructure"]},
  {"id":"canto","name":"Canto","category":"Productivity & Collaboration","status":"active","tagline":"Digital asset management","desc":"Canto's digital asset management platform helps AIM and its clients organize, tag, and distribute brand and marketing assets from a single source of truth.","tags":["DAM","Brand Assets","Content Organization"]},
  {"id":"cervello","name":"Cervello","category":"Data & Analytics","status":"active","tagline":"Data and analytics consulting","desc":"Cervello, a Kearney company, brings specialist data engineering and analytics consulting into AIM's larger data modernization and reporting engagements.","tags":["Data Engineering","Analytics Consulting"]},
  {"id":"cisco","name":"Cisco","category":"Communications & Customer Engagement","status":"active","tagline":"Networking, security, and collaboration","desc":"Cisco's networking, security, and Webex collaboration technology underpins the network architecture AIM designs for clients that need resilient, secure connectivity.","tags":["Networking","Security","Webex"]},
  {"id":"cloudera","name":"Cloudera","category":"Data & Analytics","status":"active","tagline":"Enterprise data platform for hybrid cloud","desc":"Cloudera's data platform gives AIM's data practice a hybrid option for large-scale data storage, processing, and governance across on-premises and cloud environments.","tags":["Big Data","Hybrid Data Platform","Data Governance"]},
  {"id":"cohere","name":"Cohere","category":"AI & Automation","status":"active","tagline":"Enterprise large language model platform","desc":"Cohere's enterprise LLM platform gives AIM another frontier-model option for retrieval-augmented and agentic AI builds, alongside Anthropic and IBM watsonx.","tags":["Enterprise LLM","RAG","Agentic AI"]},
  {"id":"concord","name":"Concord","category":"Specialty & Industry Solutions","status":"active","tagline":"Contract lifecycle management","desc":"Concord's contract lifecycle management platform helps AIM clients draft, negotiate, and track agreements in one place instead of scattered inboxes and drives.","tags":["CLM","Contract Management","Legal Operations"]},
  {"id":"datadog","name":"DataDog","category":"IT & Endpoint Management","status":"active","tagline":"Cloud monitoring and observability","desc":"Datadog's observability platform gives AIM's managed services team real-time visibility into infrastructure, applications, and logs across hybrid and cloud environments.","tags":["Observability","Cloud Monitoring","APM"]},
  {"id":"dell","name":"Dell","category":"Hardware & Devices","status":"active","tagline":"Enterprise hardware and end-user computing","desc":"Dell's server, storage, and end-user device lines support AIM's managed IT and infrastructure refresh engagements across client environments.","tags":["Servers","Storage","End-User Devices"]},
  {"id":"diesel-fuel-market-data-tool","name":"Diesel Fuel Market Data and Analytical Tool","category":"Data & Analytics","status":"active","tagline":"Fuel market data and analytics","desc":"This specialized market data and analytical tool tracks diesel fuel pricing and trends, supporting AIM engagements for transportation and logistics clients.","tags":["Market Data","Fuel Analytics","Logistics"]},
  {"id":"documo","name":"Documo","category":"Productivity & Collaboration","status":"active","tagline":"Cloud fax and document workflow","desc":"Documo's cloud fax and document workflow platform modernizes a still-common compliance requirement, letting AIM clients retire physical fax lines without losing the paper trail.","tags":["Cloud Fax","Document Workflow","Compliance"]},
  {"id":"dropbox","name":"Dropbox","category":"Productivity & Collaboration","status":"active","tagline":"Cloud storage and file collaboration","desc":"Dropbox's cloud storage and collaboration tools give AIM clients a familiar, flexible option for file sharing and team collaboration outside the Microsoft ecosystem.","tags":["Cloud Storage","File Sharing","Collaboration"]},
  {"id":"druide-antidote","name":"Druide Antidote","category":"Productivity & Collaboration","status":"active","tagline":"French-language writing assistant","desc":"Antidote, from Quebec-based Druide informatique, gives French-speaking teams a grammar and writing assistant that AIM recommends for bilingual Canadian workplaces.","tags":["Writing Assistant","French Language","Grammar Correction"]},
  {"id":"ergotron","name":"ergotron.com","category":"Hardware & Devices","status":"active","tagline":"Ergonomic mounting and workspace hardware","desc":"Ergotron's monitor arms, mounts, and sit-stand hardware round out AIM's workplace technology recommendations for adaptable, ergonomic workstation setups.","tags":["Ergonomics","Workplace Hardware"]},
  {"id":"everbridge-xmatters","name":"Everbridge (X Matter)","category":"Specialty & Industry Solutions","status":"active","tagline":"Critical event and incident management","desc":"Everbridge's xMatters platform helps AIM clients coordinate incident response and critical event communication, routing the right alert to the right person fast.","tags":["Incident Management","Critical Event Management","IT Alerting"]},
  {"id":"five9","name":"Five9","category":"Communications & Customer Engagement","status":"active","tagline":"Cloud contact centre platform","desc":"Five9's cloud contact centre platform gives AIM clients a way to modernize customer service operations with AI-assisted routing and omnichannel support.","tags":["Contact Centre","CCaaS","Customer Support"]},
  {"id":"geo-jobe","name":"Geo Jobe","category":"Specialty & Industry Solutions","status":"active","tagline":"GIS solutions built on Esri","desc":"GEO Jobe's Esri-based GIS tools and professional services support AIM's geospatial work for clients in transportation, utilities, and public sector mapping.","tags":["GIS","Esri","Geospatial Data"]},
  {"id":"harmon-ie","name":"Harmon.IE","category":"Productivity & Collaboration","status":"active","tagline":"Outlook and SharePoint content integration","desc":"Harmon.ie brings SharePoint and Microsoft 365 content directly into Outlook, an integration AIM configures to cut down on email-driven content sprawl.","tags":["Outlook Integration","SharePoint","Information Management"]},
  {"id":"hpe","name":"HPE","category":"Hardware & Devices","status":"active","tagline":"Enterprise servers, storage, and hybrid cloud","desc":"HPE GreenLake and on-premises compute and storage give AIM clients a hybrid infrastructure option for workloads that need to stay close to the data.","tags":["Servers & Storage","GreenLake","Hybrid Cloud"]},
  {"id":"ibm","name":"IBM","category":"Cloud & Infrastructure","status":"active","tagline":"Hybrid cloud and watsonx AI infrastructure","desc":"IBM's hybrid cloud and watsonx AI stack support AIM's larger infrastructure modernization and enterprise AI engagements, including watsonx Orchestrate and Assistant integrations.","tags":["Hybrid Cloud","watsonx AI","Enterprise Systems"]},
  {"id":"infobip","name":"Infobip","category":"Communications & Customer Engagement","status":"active","tagline":"Omnichannel messaging and CPaaS platform","desc":"Infobip's omnichannel messaging platform supports AIM's customer engagement builds that span SMS, WhatsApp, and other conversational channels at scale.","tags":["Omnichannel Messaging","CPaaS","WhatsApp Business"]},
  {"id":"jamf","name":"Jamf","category":"IT & Endpoint Management","status":"active","tagline":"Apple device management","desc":"Jamf's device management platform lets AIM support and secure Apple hardware, from enrollment through policy enforcement, across client fleets.","tags":["Apple MDM","Device Management","Endpoint Security"]},
  {"id":"jasper-ai","name":"Jasper AI","category":"AI & Automation","status":"active","tagline":"AI content generation platform","desc":"Jasper AI supports AIM's marketing and content engagements, helping teams generate on-brand copy at speed while keeping a human editor in the loop.","tags":["AI Content Generation","Marketing AI"]},
  {"id":"keeper-security","name":"Keeper Security","category":"Cybersecurity & Risk","status":"active","tagline":"Enterprise password and access management","desc":"Keeper Security's password management and privileged access platform helps AIM strengthen credential hygiene and access control across client environments.","tags":["Password Management","Privileged Access","Zero Trust"]},
  {"id":"lenovo","name":"Lenovo","category":"Hardware & Devices","status":"active","tagline":"PCs, workstations, and data centre hardware","desc":"Lenovo's device and data centre hardware lines give AIM's managed IT practice a reliable option for workstation refreshes and infrastructure builds.","tags":["PCs & Workstations","Data Centre Hardware"]},
  {"id":"lovable","name":"Lovable","category":"AI & Automation","status":"active","tagline":"AI-assisted application building","desc":"Lovable's AI-assisted development platform lets AIM prototype internal tools and client-facing applications quickly, from a natural-language description to working software.","tags":["AI App Building","Rapid Prototyping"]},
  {"id":"manageengine","name":"ManageEngine","category":"IT & Endpoint Management","status":"active","tagline":"IT service and endpoint management suite","desc":"ManageEngine's IT management suite supports AIM's service desk and endpoint operations, from asset tracking to helpdesk and patch workflows.","tags":["ITSM","Endpoint Management","Service Desk"]},
  {"id":"microsoft","name":"Microsoft","category":"Cloud & Infrastructure","status":"active","tagline":"Cloud, productivity, and AI at enterprise scale","desc":"Microsoft 365, Azure, and Copilot form the backbone of AIM's Solutions Partner practice, spanning productivity, hybrid cloud infrastructure, and governed AI enablement for enterprise clients.","tags":["Microsoft 365","Azure","Copilot"]},
  {"id":"milestone-systems","name":"Milestone Systems","category":"Specialty & Industry Solutions","status":"active","tagline":"Video management software for security","desc":"Milestone Systems's video management software gives AIM clients an open-platform option for managing IP surveillance cameras and physical security footage.","tags":["Video Management","IP Surveillance","Physical Security"]},
  {"id":"mimecast","name":"Mimecast","category":"Cybersecurity & Risk","status":"active","tagline":"Email security and resilience","desc":"Mimecast's email security platform protects AIM clients against phishing, malware, and data loss while providing continuity and archiving for regulated environments.","tags":["Email Security","Anti-Phishing","Archiving"]},
  {"id":"monday-com","name":"Monday.com","category":"Productivity & Collaboration","status":"active","tagline":"Work and project management platform","desc":"Monday.com's work management platform gives AIM and its clients a flexible way to track projects, workflows, and cross-team deliverables.","tags":["Project Management","Work OS","Workflow Tracking"]},
  {"id":"mongodb","name":"MongoDB","category":"Development & Testing","status":"active","tagline":"NoSQL database platform","desc":"MongoDB's flexible document database supports the custom application development AIM delivers for clients whose data doesn't fit neatly into rigid schemas.","tags":["NoSQL Database","Application Development"]},
  {"id":"mote","name":"Mote","category":"Productivity & Collaboration","status":"active","tagline":"Voice notes and feedback tool","desc":"Mote's voice-note browser extension lets teams leave spoken feedback directly on documents and forms, an approach AIM recommends for faster, more personal review cycles.","tags":["Voice Feedback","Browser Extension","Collaboration"]},
  {"id":"mouseflow","name":"Mouseflow","category":"Data & Analytics","status":"active","tagline":"Website heatmaps and session replay","desc":"Mouseflow's heatmap and session-recording tools give AIM's digital and marketing teams behavioural data to inform website and UX improvements for clients.","tags":["Heatmaps","Session Replay","UX Analytics"]},
  {"id":"nimonik","name":"Nimonik","category":"Specialty & Industry Solutions","status":"active","tagline":"EHS and regulatory compliance management","desc":"Nimonik's environment, health, and safety compliance platform helps AIM clients track regulatory obligations and audit readiness across their operations.","tags":["EHS Compliance","Regulatory Tracking","Audit Readiness"]},
  {"id":"ninjaone","name":"Ninja One","category":"IT & Endpoint Management","status":"active","tagline":"Unified endpoint management and RMM","desc":"NinjaOne's remote monitoring and management platform is core to AIM's managed IT operations, covering patching, monitoring, and remote support in one console.","tags":["RMM","Unified Endpoint Management","Patch Automation"]},
  {"id":"omnissa","name":"Omnissa","category":"Cloud & Infrastructure","status":"active","tagline":"Digital workspace and virtual desktop platform","desc":"Omnissa's Workspace ONE and Horizon platforms give AIM clients a unified way to manage virtual desktops, applications, and endpoints across a hybrid workforce.","tags":["Digital Workspace","VDI","Endpoint Access"]},
  {"id":"openvpn","name":"OpenVPN","category":"Cybersecurity & Risk","status":"active","tagline":"Secure remote access VPN","desc":"OpenVPN gives AIM clients a secure, flexible remote access option for distributed teams that need encrypted connectivity into corporate networks.","tags":["VPN","Secure Remote Access","Encryption"]},
  {"id":"patch-my-pc","name":"Patch MY PC","category":"IT & Endpoint Management","status":"active","tagline":"Third-party application patching","desc":"Patch My PC extends AIM's endpoint management practice by automating third-party application updates alongside Microsoft's native patching tools.","tags":["Third-Party Patching","Intune","SCCM"]},
  {"id":"pdq","name":"PDQ","category":"IT & Endpoint Management","status":"active","tagline":"Endpoint patch and software deployment","desc":"PDQ's deployment and inventory tools help AIM keep client endpoints patched, current, and consistently configured with minimal manual effort.","tags":["Patch Management","Software Deployment","Endpoint Inventory"]},
  {"id":"postman","name":"Postman","category":"Development & Testing","status":"active","tagline":"API development and testing platform","desc":"Postman is a standard tool in AIM's API engineering practice, used for building, testing, and documenting APIs throughout the development lifecycle.","tags":["API Testing","API Documentation","Developer Tools"]},
  {"id":"qualys","name":"Qualys","category":"Cybersecurity & Risk","status":"active","tagline":"Vulnerability management and compliance","desc":"Qualys's cloud-based vulnerability management platform supports AIM's security assessments, giving clients continuous visibility into exposure across their IT estate.","tags":["Vulnerability Management","Cloud Security","Compliance"]},
  {"id":"rio-education","name":"Rio Education","category":"Specialty & Industry Solutions","status":"active","tagline":"Education sector technology solutions","desc":"Rio Education's sector-specific tools support AIM's work with education clients navigating student data, program management, and institutional reporting.","tags":["Education Technology","Student Data"]},
  {"id":"scanwriter-personable","name":"ScanWriter (Personable)","category":"Specialty & Industry Solutions","status":"active","tagline":"ID and document scanning capture","desc":"Personable's ScanWriter technology automates ID and document scanning and data capture, a workflow AIM has configured for clients with high-volume verification needs.","tags":["Document Scanning","Data Capture","ID Verification"]},
  {"id":"sharegate","name":"ShareGate","category":"IT & Endpoint Management","status":"active","tagline":"Microsoft 365 migration and management","desc":"ShareGate's migration and governance tooling supports AIM's Microsoft 365 and SharePoint migration projects, reducing risk during tenant moves and reorganizations.","tags":["M365 Migration","SharePoint","Governance"]},
  {"id":"slido","name":"Slido","category":"Productivity & Collaboration","status":"active","tagline":"Live polling and audience Q&A","desc":"Slido's live polling and Q&A tool helps AIM run more interactive workshops, webinars, and client events with real-time audience engagement.","tags":["Live Polling","Audience Q&A","Events"]},
  {"id":"solarwinds","name":"SolarWinds","category":"IT & Endpoint Management","status":"active","tagline":"IT infrastructure monitoring and observability","desc":"SolarWinds's monitoring tools give AIM's managed IT practice visibility into network, server, and application performance across client environments.","tags":["Monitoring","Observability","Network Performance"]},
  {"id":"splashtop","name":"Splashtop","category":"IT & Endpoint Management","status":"active","tagline":"Remote access and remote support","desc":"Splashtop's remote access tools give AIM's service desk a fast, secure way to support end-user devices without an on-site visit.","tags":["Remote Support","Remote Access","Helpdesk Tools"]},
  {"id":"survey-monkey","name":"Survey Monkey","category":"Productivity & Collaboration","status":"active","tagline":"Online surveys and forms","desc":"SurveyMonkey's survey and forms platform supports the discovery workshops and stakeholder feedback AIM gathers during assessment and advisory engagements.","tags":["Surveys","Forms","Stakeholder Feedback"]},
  {"id":"twilio","name":"Twilio","category":"Communications & Customer Engagement","status":"active","tagline":"Programmable communications APIs","desc":"Twilio's communications APIs let AIM build SMS, voice, and messaging workflows directly into client applications and customer engagement platforms.","tags":["CPaaS","SMS & Voice APIs","Messaging"]},
  {"id":"uipath","name":"UI Path","category":"AI & Automation","status":"active","tagline":"Robotic process automation platform","desc":"UiPath's robotic process automation platform helps AIM automate repetitive, rules-based back-office workflows for clients looking to reduce manual processing.","tags":["RPA","Process Automation","Workflow Automation"]},
  {"id":"workday","name":"Workday","category":"Specialty & Industry Solutions","status":"active","tagline":"Cloud HR and finance platform","desc":"Workday's HR and finance cloud platform supports AIM's enterprise application engagements for clients consolidating people and financial data onto one system.","tags":["HCM","Financial Management","Enterprise Applications"]},
  {"id":"zoom","name":"Zoom","category":"Productivity & Collaboration","status":"active","tagline":"Video conferencing and collaboration","desc":"Zoom's video conferencing platform supports AIM's own client meetings and the collaboration stacks AIM recommends for distributed teams.","tags":["Video Conferencing","Webinars","Collaboration"]}
  ];
  var CATS=["AI & Automation","Cloud & Infrastructure","Communications & Customer Engagement","Cybersecurity & Risk","Data & Analytics","Development & Testing","Hardware & Devices","IT & Endpoint Management","Productivity & Collaboration","Specialty & Industry Solutions"];

  function esc(s){return String(s).replace(/&/g,'&').replace(/</g,'<').replace(/>/g,'>').replace(/"/g,'"');}
  function initials(name){
    var clean=name.replace(/\([^)]*\)/g,'').trim();
    var words=clean.split(/[\s.]+/).filter(Boolean);
    if(words.length===1) return words[0].slice(0,2).toUpperCase();
    return (words[0][0]+words[1][0]).toUpperCase();
  }

  var state={cat:'All',q:''};

  ['All'].concat(CATS).forEach(function(c){
    var b=d.createElement('button');
    b.type='button';
    b.className='pnr-tab'+(c==='All'?' active':'');
    b.textContent=c;
    b.setAttribute('aria-pressed',c==='All'?'true':'false');
    b.addEventListener('click',function(){
      tabsEl.querySelectorAll('.pnr-tab').forEach(function(x){x.classList.remove('active');x.setAttribute('aria-pressed','false');});
      b.classList.add('active'); b.setAttribute('aria-pressed','true');
      state.cat=c; render();
    });
    tabsEl.appendChild(b);
  });

  searchEl.addEventListener('input',function(e){ state.q=e.target.value.trim().toLowerCase(); render(); });

  function render(){
    var list=PARTNERS.filter(function(p){
      var okCat=state.cat==='All'||p.category===state.cat;
      var okQ=!state.q||p.name.toLowerCase().indexOf(state.q)>-1||p.tagline.toLowerCase().indexOf(state.q)>-1;
      return okCat&&okQ;
    });
    countEl.textContent=list.length+' of '+PARTNERS.length+' partners';
    gridEl.innerHTML='';
    if(!list.length){
      gridEl.innerHTML='<div class="pnr-empty">No partners match that search. Try a different term or category.</div>';
      return;
    }
    list.forEach(function(p){
      /* A real <button>, not a <div>: the card shows a clickable hover state, so
         it has to be reachable and operable by keyboard too. */
      var card=d.createElement('button');
      card.type='button';
      card.className='pnr-card';
      card.innerHTML=
        '<span class="pnr-chip" aria-hidden="true">'+initials(p.name)+'</span>'+
        '<h3>'+esc(p.name)+'</h3>'+
        '<span class="pnr-cat">'+esc(p.category)+'</span>'+
        (p.status==='pending'?'<span class="pnr-pending">Pending signature</span>':'');
      card.addEventListener('click',function(){ openPanel(p,card); });
      gridEl.appendChild(card);
    });
  }

  var panel=d.createElement('div');
  panel.className='pnr-panel';
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-modal','true');
  panel.setAttribute('aria-label','Partner detail');
  panel.innerHTML='<div class="pnr-panel-inner" id="pnrPanelBody"></div>';
  d.body.appendChild(panel);

  var lastFocus=null;

  function openPanel(p,trigger){
    lastFocus=trigger||null;
    var statusHtml=p.status==='pending'
      ? '<span class="d-status pending">Pending contract signature</span>'
      : '<span class="d-status active">Active partnership</span>';
    d.getElementById('pnrPanelBody').innerHTML=
      '<button class="pnr-close" type="button" id="pnrClose" aria-label="Close partner detail"><svg viewbox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>'+
      '<div class="d-chip" aria-hidden="true">'+initials(p.name)+'</div>'+
      '<div class="d-cat">'+esc(p.category)+'</div>'+
      '<h2>'+esc(p.name)+'</h2>'+
      '<div class="d-tag">'+esc(p.tagline)+'</div>'+
      statusHtml+
      '<p class="d-desc">'+esc(p.desc)+'</p>'+
      '<div class="d-tags">'+p.tags.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div>'+
      '<div class="d-cta"><p>Want the full picture of how this fits your architecture?</p><a href="contact-us.html" class="btn btn-primary">Talk to our team →</a></div>';
    var closeBtn=d.getElementById('pnrClose');
    closeBtn.addEventListener('click',closePanel);
    panel.classList.add('open');
    panel.scrollTop=0;
    bind(panel.querySelectorAll('a,.btn'));
    closeBtn.focus();
  }
  function closePanel(){
    if(!panel.classList.contains('open')) return;
    panel.classList.remove('open');
    if(lastFocus&&lastFocus.focus) lastFocus.focus();
  }
  d.addEventListener('keydown',function(e){ if(e.key==='Escape') closePanel(); });

  render();
});
      
})();