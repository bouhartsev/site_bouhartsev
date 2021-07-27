$(document).ready(function() {
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

    function isBurger() {
        if (window.innerWidth<=Number(getComputedStyle(document.documentElement).getPropertyValue('--size-tablet').slice(0, -2))) {
            if (!$('header').hasClass("headerFixed")) {
                $('header').before('<div id="emptyHeader"></div>');
                $('header').addClass("headerFixed");
            }
            $('#emptyHeader').height($('header').height());
            $(window).unbind('scroll', HeaderOnScroll);
            return true;
        }
        else {
            $(window).bind('scroll', HeaderOnScroll);
            $('#emptyHeader').height($('header').height());
            return false;
        }
    }

    function clickBurger() {
        $(".header__burger, header nav, header nav ul, body").toggleClass('burger-active', Number(getComputedStyle(document.documentElement).getPropertyValue('--transition-time').split(' ')[1].slice(0,-1))*1000);
    }

    function NotReady() {
        let NoIndexCont = document.createElement('noindex');
        let NotReadyDiv = document.createElement('div');
        NotReadyDiv.style = "width: 100%; height: 100vh; font-size: 50px; padding: 30px; box-sizing: border-box;z-index:1000;background: white;position: fixed;";
        NotReadyDiv.id = 'NotReady';
        NotReadyDiv.innerHTML = 'Здесь по<span onclick="$(`#NotReady`).hide(0);">я</span>вится сайт <a href="https://vk.com/bouhartsev" style="color: blue">Матвея Бухарцева</a>';
        NoIndexCont.prepend(NotReadyDiv)
        document.body.prepend(NoIndexCont);
    }

    console.log("Load");
	NotReady();

    isBurger();
    $(window).resize(isBurger);
    $("#burger").click(clickBurger);
  });