function NotReady() {
    var NotReadyDiv = document.createElement('div');
    NotReadyDiv.style = "width: 100%; height: 100vh; font-size: 50px; padding: 30px; box-sizing: border-box;";
    NotReadyDiv.innerHTML = 'Здесь появится сайт <a href="https://vk.com/bouhartsev">Матвея Бухарцева</a>';
    document.body.prepend(NotReadyDiv);
}

var heightHeaderFixed=0.1;

function Load() {
    console.log("Load")
    a=1;
    NotReady();
}

$(window).scroll(HeaderOnScroll);

function HeaderOnScroll() {
    //Change header to fixed and reverse
    if (($('#about').offset().top-window.pageYOffset <= heightHeaderFixed*window.innerHeight) && !($('#header').hasClass("headerFixed"))) {
        $('#header').before('<div id="emptyHeader"></div>');
        $('#emptyHeader').height($('#header').height());
        $('#header').addClass("headerFixed");
        //window.pageYOffset = 0;
    }
    else if ($('#about').offset().top-window.pageYOffset > heightHeaderFixed*window.innerHeight) {
        $('#header').removeClass("headerFixed");
        $('#emptyHeader').remove();
    }
}