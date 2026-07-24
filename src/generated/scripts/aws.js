;(function(){

$(".tab-button").click(function(e) { 
  e.preventDefault();
  $(".tab-button").removeClass("tab-button-active");
  $(".w-tab-link:contains(" + e.target.innerText + ")").click();
  $(e.target).addClass("tab-button-active");
})

})();