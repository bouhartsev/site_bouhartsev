document.addEventListener("DOMContentLoaded", function() {
	const ufo = document.querySelector("#imgAva");
    function UFOOnScroll() {
	  let ufo_scroll = 0;
	//   ufo_scroll = Math.max(window.scrollY - ufo.offsetTop + window.innerHeight/80, 0); // fix try for tablets and horizontal phones: animation starts when ufo in viewport
	  ufo_scroll = window.scrollY;
      document.documentElement.style.setProperty("--ufo-scroll", ufo_scroll);
    }
	function UFOResize() {
		ufo.style.setProperty("--ufo-mode", Number(ufo.offsetTop == 10));
		document.documentElement.style.setProperty("--ufo-change", ufo.offsetHeight);
	}
    window.addEventListener('scroll', UFOOnScroll);
	window.addEventListener('resize', UFOResize);

	UFOResize()
});