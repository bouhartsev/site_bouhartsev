document.addEventListener("DOMContentLoaded", function () {
	// YouTube adaptive

	function YouTubeVideoHeight() {
		document
			.querySelectorAll("#videos iframe")
			.forEach((elem) => (elem.height = "" + elem.offsetWidth / 1.777));
	}

	YouTubeVideoHeight();
	window.addEventListener("resize", YouTubeVideoHeight);

	// ------------------------------------------------------------------------------- //

	// Печатная машинка

	let CharTimeout = 50; // скорость печатания
	let DefTimeout = 2000; // время ожидания перед переключением
	let CurrentTimeout; // Текущий таймер

	// Список определений
	let Summaries = [];
	// Rоличество элементов массива
	let massiveItemCount = 0;
	// Определяем значения запуска
	let CurrentDef = -1;
	let CurrentLength = 0;
	// Расположение объекта
	let AnchorObject = document.getElementById("typewriter");

	// Генератор подстановки знака
	function znak() {
		if (CurrentLength == DefSummary.length) return "";
		else return "|";
	}

	let adding;

	// Основной цикл тиккера
	function runTheTypewriter() {
		let myTimeout;

		// Переход к следующему элементу
		if (CurrentLength == 0) {
			adding = true;
			CurrentDef++;
			CurrentDef = CurrentDef % massiveItemCount;
			DefSummary = Summaries[CurrentDef].replace(/"/g, "-");
		}
		// Располагаем текущий текст с печатанием
		AnchorObject.innerHTML = DefSummary.substring(0, CurrentLength) + znak();
		// Преобразуем длину для подстроки и определяем таймер
		if (CurrentLength != DefSummary.length) {
			if (adding) CurrentLength++;
			else CurrentLength--;
			myTimeout = CharTimeout;
		} else {
			adding = false;
			myTimeout = DefTimeout;
			CurrentLength--;
		}
		// Повторяем цикл с учетом задержки
		CurrentTimeout = setTimeout(runTheTypewriter, myTimeout);
	}

	function setupTheTypewriter() {
		Summaries = JSON.parse(
			AnchorObject
				?.getAttribute("data-array")
				?.replace(/[']/g, '"') || ""
		);
		massiveItemCount = Number(Summaries?.length);
		CurrentLength = 0;
		CurrentTimeout && clearTimeout(CurrentTimeout);
		runTheTypewriter();
	}

	window.i18n?.toLaunchAfter?.push(setupTheTypewriter);

	setupTheTypewriter();

	// ------------------------------------------------------------------------------- //

	async function getPinnedProjects(username) {
		// fetch('https://gh-pinned-repos-5l2i19um3.vercel.app/?username='+username).then(response => {console.log(response.results())});
		let response = await fetch(
			"https://gh-pinned-repos.egoist.sh/?username=" + username
		);
		if (response.ok) {
			// если HTTP-статус в диапазоне 200-299
			let json = await response.json();
			return json;
		} else {
			console.log("Ошибка HTTP: " + response.status);
			return [];
		}
	}
	getPinnedProjects("bouhartsev").then((projects) => {
		let parent = document.createElement("ul");
		parent.classList.add("cards");
		let element = null;
		for (project of projects) {
			let card = "";
			// if (project['repo']) card += '<strong><a href="#project_'+project['repo']+'" class="link_color">'+project['repo']+'</a></strong>';
			if (project["repo"])
				card +=
					'<strong><a href="https://github.com/bouhartsev/' +
					project["repo"] +
					'" class="link_uni">' +
					project["repo"] +
					"</a></strong>";
			if (project["description"])
				card += "<p>" + project["description"] + "</p>";
			if (project["language"])
				card += "<span>" + project["language"] + "</span>";
			element = document.createElement("li");
			element.innerHTML = card;
			parent.append(element);
		}
		document.querySelector("#projects>a").before(parent);
	});

	// ------------------------------------------------------------------------------- //
});
