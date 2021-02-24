function YouTubeVideoHeight() {
    $('#videos iframe').css('height', $('#videos iframe').outerWidth() / 1.777);
}

$(window).resize(YouTubeVideoHeight);
$(window).ready(YouTubeVideoHeight);
