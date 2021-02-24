$(window).scroll(HeaderOnScroll);

function HeaderOnScroll() {
    //Change header to fixed and reverse
    if (($('main').offset().top-window.pageYOffset <= 0) && !($('header').hasClass("headerFixed"))) {
        $('header').before('<div id="emptyHeader"></div>');
        $('#emptyHeader').height($('header').height());
        $('header').addClass("headerFixed");
        //window.pageYOffset = 0;
    }
    else if ($('main').offset().top-window.pageYOffset > 0) {
        $('header').removeClass("headerFixed");
        $('#emptyHeader').remove();
    }
}
