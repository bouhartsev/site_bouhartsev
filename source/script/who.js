function NotReady() {
    var NotReadyDiv = document.createElement('div');
    NotReadyDiv.style = "width: 100%; height: 100vh; font-size: 50px; padding: 30px; box-sizing: border-box;";
    NotReadyDiv.innerHTML = 'Здесь появится сайт <a href="https://vk.com/bouhartsev" style="color: blue">Матвея Бухарцева</a>';
    document.body.prepend(NotReadyDiv);
}

$(window).ready(Load);
function Load() {
    console.log("Load");
	NotReady();
}
