var time_events = [0];
var time_event = 0;
var time_next_event = 0;
var date_day1 = "";
var date_day2 = "";

var events = [0, 0, 0, 0];

var string_now = " ";
var string_next = " ";
var string_next_next = " ";

var counter = 0;
var day1_stop = 0;
var day2_stop = 0;
var day1 = false;
var day2 = false;
var temp = 0;
var control = 0;

var local_storage = false;


//localStorage.clear();
if (localStorage.length) {
    if ((new Date().getTime() - localStorage.getItem("last_update")) > 300000) local_storage = false;
    else {
        local_storage = true;
        for (var i = 0; i < localStorage.getItem("num_events"); i++) events[i] = localStorage.getItem("events" + i);
        console.log("Load data");
    }
} else local_storage = false;

function load_data() {
    $.get("controllers/program.txt", function (data) {
        events = data.split('\n');
        for (var i = 0; i < events.length - 1; i++) {
            if (events[i].length != 1) {
                events[i] = events[i].slice(0, -1);
            } else events[i] = " ";
        } 
        for (var i = 0; i < events.length; i++) localStorage.setItem("events" + i, events[i]);
        localStorage.setItem("last_update", new Date().getTime());
        localStorage.setItem("num_events", events.length);
        console.log("Update and load data");

        Start2();
    });
    setTimeout("load_data()", 300000);
}

function Start() {
    if (local_storage === false) load_data();
    else {
        setTimeout("load_data()", 300000);
        Start2();
    }
}

function Start2() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var time_now = hours * 60 + minutes;
    var Day_today = date.getDate();
    if (Day_today < 10) Day_today = "0" + Day_today;
    var Month_today = date.getMonth();
    Month_today++;
    if (Month_today < 10) Month_today = "0" + Month_today;
    var Year_today = date.getFullYear();
    var date_now = Day_today + "." + Month_today + "." + Year_today;
    counter = 0;

    date_day1 = events[counter];
    counter++;


    for (; events[counter] != " "; counter++) {
        time_events.push(60 * Number.parseInt(events[counter][0] + events[counter][1]) + Number.parseInt(events[counter][3] + events[counter][4]));
    }

    time_events.push(0);
    time_events.push(0);
    day1_stop = counter++;
    date_day2 = events[counter++];

    for (; counter < events.length; counter++) {
        time_events.push(60 * Number.parseInt(events[counter][0] + events[counter][1]) + Number.parseInt(events[counter][3] + events[counter][4]));
    }

    day2_stop = counter;
    time_events.push(0);

    Set_Date();

    Check();
}

function Check() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var time_now = hours * 60 + minutes;
    var Day_today = date.getDate();
    if (Day_today < 10) Day_today = "0" + Day_today;
    var Month_today = date.getMonth();
    Month_today++;
    if (Month_today < 10) Month_today = "0" + Month_today;
    var Year_today = date.getFullYear();
    var date_now = Day_today + "." + Month_today + "." + Year_today;
    temp = 0;
    let indicator = document.getElementById("indicator");
    let placeholder_text = document.getElementById("broadcast-placeholder");
    var element_now = document.getElementById('now');
    var element_next = document.getElementById('next');
    var element_next_next = document.getElementById('next_next');
    
    if (day1) {
        counter = 0;
        if (time_now < time_events[1] - 5) {
            //трансляция ещё не началась
            placeholder_text.innerHTML = '<p>Трансляция ещё не началась. Она пройдёт сегодня на <a class="golden-link" href="https://www.youtube.com/channel/UCfW0B-pFXXKGEVGfNHhIHcg">этом</a> канале.</p>';
            control = 0;
        } else if (time_now < time_events[1]) {
            //трансляция скоро начнётся
            Timer();
            control = 0;
        } else if (time_now < time_events[day1_stop - 1]) {
            for (var i = 1; i < day1_stop && !counter; i++) {
                if (time_now >= time_events[i] && time_now < time_events[i + 1]) {
                    counter = i;
                }
            }
            string_now = events[counter];
            time_event = time_events[counter];
            time_next_event = time_events[counter + 1];

            temp = counter;

            if (counter <= day1_stop - 3) {
                temp++;
                string_next = events[temp];
                temp++;
                string_next_next = events[temp];
            } else if (counter == day1_stop - 2) {
                temp++;
                string_next = events[temp];
                string_next_next = " ";
            }
            control = 1;
        } else {
            //трансляция уже закончилась. следующий эфир начнётся завтра
            placeholder_text.innerHTML = "<p>Трансляция завершилась. Следующий эфир начнётся завтра.</p>";
            control = 0;
        }

        // Все возможные случаи: 2 после, 1 после, нет после, трансляция не происходит. Чтобы работала линия!
    } else if (day2) {
        //второй день
        counter = 0;
        if (time_now < time_events[day1_stop + 2] - 5) {
            //трансляция ещё не началась
            placeholder_text.innerHTML = '<p>Трансляция ещё не началась. Она пройдёт сегодня на <a class="golden-link" href="https://www.youtube.com/channel/UCfW0B-pFXXKGEVGfNHhIHcg">этом</a> канале.</p>';
            control = 0;
        } else if (time_now < time_events[day1_stop + 2]) {
            //трансляция скоро начнётся
            Timer();
            control = 0;
        } else if (time_now < time_events[day2_stop - 1]) {
            for (var i = day1_stop + 2; i < day2_stop && !counter; i++) {
                if (time_now >= time_events[i] && time_now < time_events[i + 1]) {
                    counter = i;
                }
            }
            string_now = events[counter];
            time_event = time_events[counter];
            time_next_event = time_events[counter + 1];

            temp = counter;

            if (counter <= day2_stop - 3) {
                temp++;
                string_next = events[temp];
                temp++;
                string_next_next = events[temp];
            } else if (counter == day2_stop - 2) {
                temp++;
                string_next = events[temp];
                string_next_next = " ";
            }
            control = 1;
        } else {
            //трансляция уже закончилась.
            placeholder_text.innerHTML = '<p>Трансляция завершилась. Смотрите <a class="golden-link" href="https://www.youtube.com/channel/UCfW0B-pFXXKGEVGfNHhIHcg">здесь</a> запись.</p>';
            control = 0;
        }
    } else {
        //трансляция не происходит

        placeholder_text.innerHTML = '<p>Трансляция отсутствует. Проверьте программу или смотрите <a class="golden-link" href="https://www.youtube.com/channel/UCfW0B-pFXXKGEVGfNHhIHcg">здесь</a> запись.</p>';
        control = 0;
    }

    if (control == 1) {
        document.getElementById("broadcast-placeholder").style.display = "none";
        document.getElementById("broadcast-wrapper").style.display = "flex";
        
        element_now.innerHTML = string_now;
        if (string_next != " ") element_next.innerHTML = string_next;
        else element_next.innerHTML = "";
        if (string_next_next != " ") element_next_next.innerHTML = string_next_next;
        else element_next_next.innerHTML = "";
    } else {
        document.getElementById("broadcast-wrapper").style.display = "none";
        document.getElementById("broadcast-placeholder").style.display = "flex";
    }

    Watch();
    setTimeout("Check()", 20000);
}

function Watch() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var time_now = hours * 3600 + minutes * 60 + seconds;


    if (control) {
        var percent = (time_now - time_event * 60) / (time_next_event * 60 - time_event * 60) * 100;
        if (percent < 5) percent = 5;
        document.getElementById("scale").style.width = percent + "%";
    }

    setTimeout("Watch()", 1000);
}

function Set_Date() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var time_now = hours * 60 + minutes;
    var Day_today = date.getDate();
    if (Day_today < 10) Day_today = "0" + Day_today;
    var Month_today = date.getMonth();
    Month_today++;
    if (Month_today < 10) Month_today = "0" + Month_today;
    var Year_today = date.getFullYear();
    var date_now = Day_today + "." + Month_today + "." + Year_today

    //    var element_day1 = document.getElementById('date_day1');
    //    var element_day2 = document.getElementById('date_day2');

    if (date_now == date_day1) {
        //        element_day1.innerHTML = "Сегодня ("+ date_day1 + ")";
        //        element_day2.innerHTML = "Завтра ("+ date_day2 + ")";
        day1 = true;
        day2 = false;
    } else if (date_now == date_day2) {
        //        element_day1.innerHTML = "Вчера ("+ date_day1 + ")";
        //        element_day2.innerHTML = "Сегодня ("+ date_day2 + ")";
        day1 = false;
        day2 = true;
    } else {
        day1 = false;
        day2 = false;
    }
}

function Timer() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var time_now = hours * 3600 + minutes * 60 + seconds;
    let placeholder_text = document.getElementById("broadcast-placeholder");

    var difference = time_events[1] * 60 - time_now;
    if (day2) difference = time_events[day1_stop + 2] * 60 - time_now;
    minutes = parseInt(difference / 60);
    seconds = difference % 60;
    if (seconds < 10) seconds = "0" + seconds;
    if (minutes < 10) minutes = "0" + minutes;

    placeholder_text.innerHTML = "Трансляция начнётся через " + minutes + ":" + seconds;

    if (difference > 0) setTimeout(Timer, 1000);
    else Check();
}
