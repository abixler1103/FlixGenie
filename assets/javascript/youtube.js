$(document).ready(function() {

    $('.movie-buttons').on("click", function() {
        var movieName = $(this).attr('data-attribute');

        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + movieName + " trailer" + "&key=AIzaSyB8g6i8y1SPFbIcJw9flTwk7VEFXYWA5MY",
            context: document.body
        }).done(function(response) {
            console.log(response);

            var videoId = response.items[0].id.videoId;

            var embedCode = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/" + videoId + "\" frameborder=\"0\" allowfullscreen></iframe>";

            $('#list-of-movie-trailers').html(embedCode);
        });
    });

});

//test2
