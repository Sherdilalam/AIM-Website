;(function(){

window.addEventListener('load',function(){
  var d=document,b=d.body;if(!b)return;
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bind=window.aimBindCursor||function(){};
  var TR={
    en:{'eb':'Contact us','h1':'Let\'s start a conversation.','sub':'Have a question, project, or idea? Reach out to learn more about our services, request a consultation, or explore how AIM can support your goals.','form.h':'Send us a message','form.fn':'First name','form.ln':'Last name','form.email':'Work email','form.co':'Company','form.int':'I\'m interested in','form.msg':'Message','form.btn':'Send message','o1':'Canada (HQ)',},
    fr:{'eb':'Contactez-nous','h1':'D\u00e9marrons une conversation.','sub':'Une question, un projet ou une id\u00e9e? Contactez notre \u00e9quipe pour en savoir plus sur nos services ou d\u00e9marrer une conversation.','form.h':'Envoyez-nous un message','form.fn':'Pr\u00e9nom','form.ln':'Nom','form.email':'Courriel professionnel','form.co':'Entreprise','form.int':'Je suis int\u00e9ress\u00e9 par','form.msg':'Message','form.btn':'Envoyer le message','o1':'Canada (Si\u00e8ge)',}
  };
  var MAP=[['eb','.ct-hero .eyebrow'],['h1','.ct-hero .h1'],['sub','.ct-hero .sub'],['form.h','.ct-form h2'],['form.btn','.ct-form .btn'],['o1','.ct-office:nth-child(1) h3']];
  function translate(){var L=window.aimGetLang?window.aimGetLang():'en';var dict=TR[L]||TR.en;MAP.forEach(function(p){var el=d.querySelector(p[1]);if(el&&dict[p[0]])el.textContent=dict[p[0]];});
    var labels=d.querySelectorAll('.ct-field label');var lkeys=['form.fn','form.ln','form.email','form.co','form.int','form.msg'];labels.forEach(function(l,i){if(dict[lkeys[i]])l.textContent=dict[lkeys[i]];});
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
/*__AIM_BLOCK__*/
;(function(){

document.addEventListener('DOMContentLoaded', function () {
  // TODO (human action item): the Microsoft 365 / Dynamics 365 connection is
  // being finalized by Kabir with Rajiv. D365_FORM_ENDPOINT is substituted at
  // `npm run convert` time from the D365_FORM_ENDPOINT env var (see
  // scripts/convert.mjs) -- it is NOT present in source control and NOT
  // hardcoded here, so it stays empty (and this form shows its "not yet
  // connected" state below) until that env var is set wherever the site is
  // built. Once Kabir/Rajiv confirm the working endpoint the live site
  // currently uses, set D365_FORM_ENDPOINT to that same URL so this mirrors
  // it, and consider whether the field names in `payload` below need to
  // change to match what that flow expects.
  var D365_FORM_ENDPOINT = '';
  var form = document.getElementById('ctForm');
  if (!form) return;
  var status = form.querySelector('.ct-form-status');
  var isTest = /[?&]test=1\b/.test(window.location.search);
  if (isTest && status) status.textContent = 'Test mode: submissions are tagged isTest and will not be treated as real leads.';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var payload = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      company: form.company.value.trim(),
      interest: form.interest.value,
      message: form.message.value.trim(),
      isTest: isTest,
    };
    if (!D365_FORM_ENDPOINT) {
      if (status) status.textContent = 'Form submissions are not yet connected. Please email hello@iaim.ca in the meantime.';
      return;
    }
    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    if (status) status.textContent = 'Sending...';
    try {
      var response = await fetch(D365_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        if (status) status.textContent = 'Thanks, your message has been sent. We will be in touch shortly.';
        form.reset();
      } else {
        if (status) status.textContent = 'Something went wrong sending your message. Please email hello@iaim.ca instead.';
        console.error('Contact form submit error:', response.status);
      }
    } catch (error) {
      if (status) status.textContent = 'Something went wrong sending your message. Please email hello@iaim.ca instead.';
      console.error('Contact form network error:', error);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});

})();