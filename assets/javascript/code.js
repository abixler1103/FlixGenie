$(document).ready(function() {
    var netflixCategories = [];
    var sortedList = [];

    var inputGenerated = $("#generated").val();
    console.log(inputGenerated);
    var movieInfo = "http://www.omdbapi.com/?t=" + "Inside Out" + "&apikey=40e9cece";
    var movieTitle = "https://netflixroulette.net/api/api.php?actor=" + inputGenerated;


    $.ajax({
        url: movieInfo,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        $("#actors").html(response.Actors);
        $("#genre").html(response.Genre);
        $("#ratings").append(response.Ratings[0].Value);
        $("#ratings").append(response.Ratings[1].Value);
        $("#ratings").append(response.Ratings[2].Value);
        $("#plot").html(response.Plot);
        $("#poster").attr("src", response.Poster);
        $("#rated").html(response.Rated);
        $("#title").html(response.Title);

    });



    $("#clickBtn").on("click", function() {
        var inputGenerated = $("#generated").val();
        var movieInfo = "http://www.omdbapi.com/?t=" + inputGenerated + "&apikey=40e9cece";
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
                }

                // console.log(response);
                // console.log(netflixCategories);
                // console.log(sortedList);

            });
        }

        $.ajax({
            url: movieInfo,
            method: "GET"
        }).done(function(response) {
            //console.log(response);
            $("#actors").html(response.Actors);
            $("#genre").html(response.Genre);
            // $("#ratings").append(response.Ratings[0].Value);
            // $("#ratings").append(response.Ratings[1].Value);
            // $("#ratings").append(response.Ratings[2].Value);
            $("#plot").html(response.Plot);
            $("#poster").attr("src", response.Poster);
            $("#rated").html(response.Rated);
            $("#title").html(response.Title);

        });
    })
})
