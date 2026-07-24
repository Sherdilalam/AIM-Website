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
  const form = document.querySelector('.w-form form');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // Read values using exact field names Power Automate expects
    const payload = {
      firstName:    form.querySelector('[name="firstName"]')?.value?.trim() || '',
      lastName:     form.querySelector('[name="lastName"]')?.value?.trim() || '',
      organization: form.querySelector('[name="organization"]')?.value?.trim() || '',
      email:        form.querySelector('[name="email"]')?.value?.trim() || '',
      phone:        form.querySelector('[name="phone"]')?.value?.trim() || '',
      visit:        form.querySelector('[name="visit"]')?.value?.trim() || '',
      message:      form.querySelector('[name="message"]')?.value?.trim() || '',
      eventDate:    form.querySelector('[name="eventDate"]')?.value?.trim() || '',
      source:       11
    };
    // Debug: open browser console to verify data before sending
    console.log('Sending payload:', JSON.stringify(payload));
    const POWER_AUTOMATE_URL = 'https://7b86ad2e804feb5984ceeced052173.f1.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/6abf930f85734c7aaa5ab869b2f06235/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EL5gczKrFQQ0rsW5dugFVq6vH6l4IbSfq4cE37hzQzc';
    try {
      const response = await fetch(POWER_AUTOMATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok || response.status === 202) {
        // Show Webflow success message
        form.style.display = 'none';
        form.closest('.w-form').querySelector('.w-form-done').style.display = 'block';
      } else {
        form.closest('.w-form').querySelector('.w-form-fail').style.display = 'block';
        console.error('Server error:', response.status);
      }
    } catch (error) {
      form.closest('.w-form').querySelector('.w-form-fail').style.display = 'block';
      console.error('Network error:', error);
    }
  });
});

})();