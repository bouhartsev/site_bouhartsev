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
            if (!document.querySelector('header').classList.contains("headerFixed")) {
                document.querySelector('body').classList.add('add-empty');
                document.querySelector('header').classList.add("headerFixed");
            }
            $(window).unbind('scroll', HeaderOnScroll);
            document.querySelector('.add-empty').style.setProperty("--header-height", document.querySelector('header').clientHeight + 'px');
            return true;
        }
        else {
            $(window).bind('scroll', HeaderOnScroll);
            HeaderOnScroll();
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

    // Для вызова использовать ссылку - <a href="popup_id" data-change-popup>Text</a>
    function togglePopup(event, target_id=null) {
        let popup = null;
        if (event && event.currentTarget.hasAttribute('data-popup-close')) {
            popup = event.currentTarget.parentNode;
            window.history.replaceState({}, '', `${location.pathname}${(location.search)?'?'+location.search:''}`);
        }
        else {
            if(event) target_id = event.currentTarget.getAttribute('href');
            if (target_id) popup = document.querySelector(target_id);
        }
        if (popup) {
            popup.classList.toggle('popup_opened');
            document.body.classList.toggle('overflow-hidden');
        }
        else {
            console.log("Popup '"+popup+"' doesn't exist")
        }
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
            // let NoIndexCont = document.createElement('noindex');
            // let NotReadyDiv = document.createElement('div');
            // NotReadyDiv.style = "width: 100%; height: 100vh; font-size: 50px; padding: 30px; box-sizing: border-box;z-index:1000000;background: white;position: fixed;";
            // NotReadyDiv.id = 'NotReady';
            // NotReadyDiv.innerHTML = 'Здесь по<span onclick="document.cookie=`dev=true;max-age=3600`;$(`#NotReady`).hide(0);">я</span>вится новая версия сайта <a href="https://vk.com/bouhartsev" style="color: blue">Матвея Бухарцева</a>';
            // NoIndexCont.prepend(NotReadyDiv)
            // document.body.prepend(NoIndexCont);
            document.body.insertAdjacentHTML('afterbegin', `
            <noindex id="NotReady" class="popup" style="text-align: center;">
                <button data-popup-close class="popup__back"></button>
                <button data-popup-close class="popup__x" title="Close popup">x</button>
                Здесь появится новая версия сайта <a href="https://vk.com/bouhartsev" style="color: blue">Матвея Бухарцева</a></p>
                <button data-popup-close class="popup__button">OK</button>
                <button data-popup-close class="popup__button" onclick="document.cookie='dev=true'">Больше не показывать</button>
            </noindex>
            `);
            togglePopup(null, '#NotReady');
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

    document.querySelectorAll('[data-popup-open], [data-popup-close]').forEach(el => el.addEventListener('click', togglePopup));
    togglePopup(null, window.location.hash.split('?')[0]);
  });