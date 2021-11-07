document.addEventListener("DOMContentLoaded", function() {

	// YouTube adaptive

    function YouTubeVideoHeight() {
		document.querySelectorAll('#videos iframe').forEach(elem => elem.height=''+(elem.offsetWidth / 1.777));
    }

    YouTubeVideoHeight();
    window.addEventListener('resize', YouTubeVideoHeight);

	// ------------------------------------------------------------------------------- //

    // Печатная машинка

    let CharTimeout = 50; // скорость печатания
	let DefTimeout = 2000; // время ожидания перед переключением
	
	// Список определений
	let Summaries = new Array();
	Summaries = ['программист',
		'разработчик',
		'веб-разработчик',
		'фулстек-разработчик',
		'фронтенд-разработчик',
		'бэкенд-разработчик',
		'разработчик консольных приложений',
		'.NET-разработчик'];

	let massiveItemCount = Number(Summaries.length); //количество элементов массива
	// Определяем значения запуска
	let CurrentDef = -1;
	let CurrentLength = 0;
	// Расположение объекта
	let AnchorObject = document.getElementById("typewriter");

	// Генератор подстановки знака
	function znak(){
		if (CurrentLength == DefSummary.length) return "";
		else return "|";
	}

    let adding;
	// Основной цикл тиккера
	function runTheTypewriter(){
		let myTimeout;

		// Переход к следующему элементу
		if (CurrentLength == 0){
            adding = true;
			CurrentDef++;
			CurrentDef = CurrentDef % massiveItemCount;
			DefSummary = Summaries[CurrentDef].replace(/"/g,'-');
		}
		// Располагаем текущий текст с печатанием
		AnchorObject.innerHTML = DefSummary.substring(0,CurrentLength) + znak();
		// Преобразуем длину для подстроки и определяем таймер
		if(CurrentLength != DefSummary.length){
			if (adding) CurrentLength++;
		    else CurrentLength--;
            myTimeout = CharTimeout;
		}
        else {
            adding = false;
            myTimeout = DefTimeout;
            CurrentLength--;
        }
		// Повторяем цикл с учетом задержки
		setTimeout(runTheTypewriter, myTimeout);
	}

	runTheTypewriter();

	// ------------------------------------------------------------------------------- //

	async function getPinnedProjects(username) {
		// fetch('https://gh-pinned-repos-5l2i19um3.vercel.app/?username='+username).then(response => {console.log(response.results())});
		let response = await fetch('https://gh-pinned-repos-5l2i19um3.vercel.app/?username='+username);
		if (response.ok) { // если HTTP-статус в диапазоне 200-299
			let json = await response.json();
			return json;
		}
		else {
			console.log("Ошибка HTTP: " + response.status);
			return []
		}
	}
	getPinnedProjects('bouhartsev').then((projects) => {
		let parent = document.createElement('ul');
		parent.classList.add('cards');
		let element=null;
		for (project of projects) {
			let card = '';
			if (project['repo']) card += '<strong><a href="#project_'+project['repo']+'" class="link_color">'+project['repo']+'</a></strong>';
			if (project['description']) card += '<p>'+project['description']+'</p>';
			if (project['language']) card += '<span>'+project['language']+'</span>';
			element = document.createElement('li');
			element.innerHTML = card;
			parent.append(element);
		}
		document.querySelector('#projects>a').before(parent);
	})


	// ------------------------------------------------------------------------------- //

});