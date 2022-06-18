document.addEventListener("DOMContentLoaded", function() {
	const ufo = document.querySelector("#imgAva");
    function UFOOnScroll() {
      // console.log("change UFO!");
      document.documentElement.style.setProperty("--ufo-scroll", window.scrollY);
    }
	function UFOResize() {
		ufo.style.setProperty("--ufo-mode", Number(ufo.offsetTop == 10));
		document.documentElement.style.setProperty("--ufo-change", ufo.offsetHeight);
	  }
    window.addEventListener('scroll', UFOOnScroll);
	window.addEventListener('resize', UFOResize);

	UFOResize()
});