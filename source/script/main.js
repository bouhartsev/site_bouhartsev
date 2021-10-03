document.addEventListener("DOMContentLoaded", function() {
    function HeaderOnScroll() {
        //Change header to fixed and reverse
        if ((document.querySelector('main').offsetTop-window.pageYOffset <= 0) && !(document.querySelector('header').classList.contains("headerFixed"))) {
            document.querySelector('body').classList.add('add-empty');
            document.querySelector('.add-empty').style.setProperty("--header-height", document.querySelector('header').clientHeight + 'px');
            document.querySelector('header').classList.add("headerFixed");
            //window.pageYOffset = 0;
        }
        else if (document.querySelector('main').offsetTop-window.pageYOffset > 0) {
            document.querySelector('header').classList.remove("headerFixed");
            document.querySelector('body').classList.remove("add-empty");
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

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

    function NotReady() {
        // Without cookie
        // $.ajax({
        //     url:'/source/script/dev.json',
        //     type:'HEAD',
        //     error: function()
        //     {
        //         let NoIndexCont = document.createElement('noindex');
        //         let NotReadyDiv = document.createElement('div');
        //         NotReadyDiv.style = "width: 100%; height: 100vh; font-size: 50px; padding: 30px; box-sizing: border-box;z-index:1000000;background: white;position: fixed;";
        //         NotReadyDiv.id = 'NotReady';
        //         NotReadyDiv.innerHTML = 'Здесь по<span onclick="document.cookie=`dev=true`;$(`#NotReady`).hide(0);">я</span>вится новая версия сайта <a href="https://vk.com/bouhartsev" style="color: blue">Матвея Бухарцева</a>';
        //         NoIndexCont.prepend(NotReadyDiv)
        //         document.body.prepend(NoIndexCont);
        //     },
        //     success: function()
        //     {
        //         console.log('development');
        //     }
        // });

        if (getCookie('dev')!='true') {
            let NoIndexCont = document.createElement('noindex');
            let NotReadyDiv = document.createElement('div');
            NotReadyDiv.style = "width: 100%; height: 100vh; font-size: 50px; padding: 30px; box-sizing: border-box;z-index:1000000;background: white;position: fixed;";
            NotReadyDiv.id = 'NotReady';
            NotReadyDiv.innerHTML = 'Здесь по<span onclick="document.cookie=`dev=true;max-age=3600`;$(`#NotReady`).hide(0);">я</span>вится новая версия сайта <a href="https://vk.com/bouhartsev" style="color: blue">Матвея Бухарцева</a>';
            NoIndexCont.prepend(NotReadyDiv)
            document.body.prepend(NoIndexCont);
            document.cookie="dev=false";
        }
        else {
            console.log('development');
        }
        
    }

    console.log("Load");
	NotReady();

    isBurger();
    $(window).resize(isBurger);
    $("#burger").click(clickBurger);
  });