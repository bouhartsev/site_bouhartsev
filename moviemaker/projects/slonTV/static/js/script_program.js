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
    console.log("working")
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
    var date_yesterday = (Day_today - 1) + "." + Month_today + "." + Year_today;
    var date_tomorrow = (Day_today + 1) + "." + Month_today + "." + Year_today;

    temp = events[0];

    if (date_now == events[0]) temp = events[0] + ' (Сегодня)';
    else if (date_yesterday == events[0]) temp = events[0] + ' (Вчера)';
    else if (date_tomorrow == events[0]) temp = events[0] + ' (Завтра)';

    $("#day1").append(temp);
    counter = 1;
    for (; events[counter] != " "; counter++) {
        $("#program-list-day1").append('<p>' + events[counter] + '</p>')
    }

    
    counter++;
    temp = events[counter];

    if (date_now == events[counter]) temp = events[counter] + ' (Сегодня)';
    else if (date_yesterday == events[counter]) temp = events[counter] + ' (Вчера)';
    else if (date_tomorrow == events[counter]) temp = events[counter] + ' (Завтра)';
    
    $("#day2").append(temp);
    
    counter++;
    
    for (; counter < events.length; counter++) {
        $("#program-list-day2").append('<p>' + events[counter] + '</p>')
    }
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
