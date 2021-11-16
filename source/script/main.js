document.addEventListener("DOMContentLoaded", function() {
    let transition_time = Number(getComputedStyle(document.documentElement).getPropertyValue('--transition-time').split(' ')[1].slice(0,-1))*1000;
    console.log(transition_time)

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
            window.removeEventListener('scroll', HeaderOnScroll);
            document.querySelector('.add-empty').style.setProperty("--header-height", document.querySelector('header').clientHeight + 'px');
            return true;
        }
        else {
            window.addEventListener('scroll', HeaderOnScroll);
            HeaderOnScroll(); // избыточность. работает. не трогай.
            return false;
        }
    }

    function clickBurger() {
        // $(".header__burger, header nav, header nav ul, body").toggleClass('burger-active', Number(getComputedStyle(document.documentElement).getPropertyValue('--transition-time').split(' ')[1].slice(0,-1))*1000);
        document.querySelectorAll(".header__burger, header nav, header nav ul, body").forEach((el) => {
            el.classList.toggle("burger-active"); // проблема - при увеличении высоты экрана вручную видно страницу снизу
        });
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
        else if (popup!=null) {
            console.log("Popup '"+popup+"' doesn't exist")
        }
    }

    function NotReady() {
        if (getCookie('dev')!='true') {
            document.body.insertAdjacentHTML('afterbegin', `
            <noindex id="NotReady" class="popup" style="text-align: center;">
                <button data-popup-close class="popup__back"></button>
                <button data-popup-close class="popup__x" title="Close popup">x</button>
                <p>Здесь появится новая версия сайта <a href="https://vk.com/bouhartsev" style="color: blue">Матвея Бухарцева</a>
                <br>The site is being developed</p>
                <button data-popup-close class="popup__button">OK</button>
                <button data-popup-close class="popup__button" onclick="document.cookie='dev=true;path=/;'">Больше не показывать</button>
            </noindex>
            `);
            togglePopup(null, '#NotReady');
            document.cookie="dev=false;path=/;";
        }
        else {
            console.log('The site is being developed');
        }
    }

    console.log("loading...");
	NotReady();

    isBurger();
    window.addEventListener('resize', isBurger);
    document.querySelector("#burger").addEventListener('click',clickBurger);

    document.querySelectorAll('[data-popup-open], [data-popup-close]').forEach(el => el.addEventListener('click', togglePopup));
    togglePopup(null, window.location.hash.split('?')[0]);
  });