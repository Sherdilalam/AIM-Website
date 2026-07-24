;(function(){

document.addEventListener("DOMContentLoaded", function() {
  // Select all progress bars
  const bars = document.querySelectorAll(".timeline_progress-bar");
  bars.forEach(bar => {
    const parent = bar.closest(".timeline-section"); // section wrapper
    if (parent) {
      // Set max height according to parent container
      bar.style.maxHeight = parent.offsetHeight + "px";
      bar.style.overflow = "hidden";
    }
  });
});

})();