$(document).ready(function() {
    var netflixCategories = [];
    var sortedList = [];
    var randomMovie = "";
    var movieChoice = "";
    var movieInfo = "";

    $("#clickBtn").on("click", function() {
        var inputGenerated = $("#generated").val();
        var movieTitle = "https://netflixroulette.net/api/api.php?actor=" + inputGenerated;

        if (movieTitle !== '' || typeof movieTitle !== 'undefined') {
            $.ajax({
                url: movieTitle,
                method: "GET"
            }).done(function(response) {
                netflixCategories = [];

                //loop over the netflix objects to grab and store the categories
                for (var i = 0; i < response.length; i++) {
                    netflixCategories.push(response[i].category);
                }

                $.each(netflixCategories, function(i, el) {
                    if ($.inArray(el, sortedList) === -1) sortedList.push(el);
                });

                if (sortedList.length > 0) {

                    var choice = [];

                    choice = $.grep(response, function(movie, index) {
                        console.log(movie.category)
                            //change sorted list to whatever the front-end input is.
                        return movie.category == sortedList[2];
                    });

                    console.log(choice);
                    var random = Math.floor((Math.random() * choice.length) + 1);
                    console.log(random);
                    randomMovie = choice[random - 1];
                    console.log(randomMovie);
                    movieChoice = randomMovie.show_title;
                    console.log(movieChoice);
                    movieInfo = "http://www.omdbapi.com/?t=" + movieChoice + "&apikey=40e9cece";
                    console.log(movieInfo);

                };

                $.ajax({
                    url: movieInfo,
                    method: "GET"
                }).done(function(response) {
                    console.log(response);
                    $("#actor-info").html(response.Actors);
                    $("#imbd-score").append(response.Ratings[0].Value);
                    $("#rotten-score").append(response.Ratings[1].Value);
                    $("#meta-score").append(response.Ratings[2].Value);
                    $("#plot").html(response.Plot);
                    $("#artwork").attr("src", response.Poster);
                    $("#rating").html(response.Rated);
                    $("#movie-name").html(response.Title);
                    $("#director-info").html(response.Director);

                });


                $.ajax({
                    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + movieChoice + " trailer" + "&key=AIzaSyB8g6i8y1SPFbIcJw9flTwk7VEFXYWA5MY",
                    context: document.body
                }).done(function(response) {
                    console.log(response);

                    var videoId = response.items[0].id.videoId;

                    var embedCode = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/" + videoId + "\" frameborder=\"0\" allowfullscreen></iframe>";

                    $('#list-of-movie-trailers').html(embedCode);
                });


            });
        };
    });
});