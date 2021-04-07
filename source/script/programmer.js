$(document).ready(function() {
    function YouTubeVideoHeight() {
        $('#videos iframe').css('height', $('#videos iframe').outerWidth() / 1.777);
    }

    YouTubeVideoHeight();
    $(window).resize(YouTubeVideoHeight);
});