$(document).ready(function() {
    var catBtns = [];
    var netflixCategories = [];
    var sortedList = [];
    var randomMovie = "";
    var movieChoice = "";
    var movieInfo = "";
    var btnselection = "";

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
                        console.log(sortedList[i]);
                    });
                    renderButtons();

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
            });
        };

        //Function which creates the buttons
        function renderButtons() {

            // Deleting the movies prior to adding new movies
            // (this is necessary otherwise you will have repeat buttons)
            $("#clickBtn").empty();
            // Looping through the array of movies
            for (var i = 0; i < sortedList.length; i++) {
                // Then dynamicaly generating buttons for each movie in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)

                var a = $("<button>");
                // Adding a class of movie to our button

                if (sortedList[i] === "Action & Adventure") {
                    a.addClass(sortedList[i]);
                    // Adding a data-attribute
                    a.attr("data-name", sortedList[i]);
                    // Providing the initial button text
                    a.text(sortedList[i]);
                }
                // Adding the button to the buttons-view div
                $("#buttons-view").append(a);

                catBtns.push(a);
            }

            for (var i = 0; i < catBtns.length; i++) {
                console.log(catBtns[i][0].className);

                $("body").on("click", "." + catBtns[i][0].className, function() {

                    console.log("You have clicked me: " + catBtns[i].className)
                });
            }
        }


        // This function handles events where a movie button is clicked



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
    });

});
