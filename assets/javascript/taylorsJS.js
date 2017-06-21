var catBtns = [];
var netflixCategories = [];
var sortedList = [];
var choice = [];
var randomMovie = "";
var movieChoice = "";
var movieInfo = "";
var btnselection = "";
var netflixResponse = [];

$(document).ready(function() {

    GrabUrlFromStorage();

    var config = {
        apiKey: "AIzaSyDdSc475_ROupGHmwtJupWsAsBfrmBgyYs",
        authDomain: "netflix-project.firebaseapp.com",
        databaseURL: "https://netflix-project.firebaseio.com",
        projectId: "netflix-project",
        storageBucket: "",
        messagingSenderId: "243336765650"
    };
    firebase.initializeApp(config);

    $("#clickBtn").on("click", function() {
        event.preventDefault();
        var inputGenerated = $("#generated").val();
        var movieTitle = "https://netflixroulette.net/api/api.php?actor=" + inputGenerated;

        if (movieTitle !== '' || typeof movieTitle !== 'undefined') {
            $.ajax({
                url: movieTitle,
                method: "GET"
            }).done(function(response) {
                netflixResponse = response;
                netflixCategories = [];

                console.log(response);

                //loop over the netflix objects to grab and store the categories
                for (var i = 0; i < response.length; i++) {
                    netflixCategories.push(response[i].category);
                }

                $.each(netflixCategories, function(i, el) {
                    if ($.inArray(el, sortedList) === -1) sortedList.push(el);
                });

                if (sortedList.length > 0) {

                    renderButtons(sortedList);
                    //render the category buttons
                }
            });
        }
    });

    function GetChoice(category) {

        var choices = $.grep(netflixResponse, function(movie, index) {

            //change sorted list to whatever the front-end input is.
            return movie.category == category[0].innerText;
        });

        return choices;
    }

    //Find movie by url
    function GetMovie(url) {
        $.ajax({
            url: url,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            if (response.Response !== 'False') {

                $("#actor-info").html(response.Actors);
                $("#plot").html(response.Plot);
                $("#artwork").attr("src", response.Poster);
                $("#rating").html(response.Rated);
                $("#movie-name").html(response.Title);
                $("#director-info").html(response.Director);
                $("#ratings").append(response.Ratings[0].Value);
                $("#ratings").append(response.Ratings[1].Value);
            } else {
                $("#error").html("This movie information is unavailable! We have generated a trailer for your viewing pleasure!");
            }
            //alert the user if you want
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

        var database = firebase.database();

        database.ref().push({
            movieName: movieChoice
        });
    }

    //Function which creates the buttons
    function renderButtons(sortedList) {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#clickBtn").empty();

        // Looping through the array of movies
        for (var i = 0; i < sortedList.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)

            var a = $("<button>");
            // Adding a class of movie to our button

            a.text(sortedList[i]);

            switch (sortedList[i]) {
                case "Action & Adventure":
                    sortedList[i] = "Action"
                    break;
                case "Children & Family Movies":
                    sortedList[i] = "Family"
                    break;
                case "Classic Movies":
                    sortedList[i] = "Classic"
                    break;
                case "Oscar-winning Movies":
                    sortedList[i] = "Oscar"
                    break;
                case "Romantic Movies":
                    sortedList[i] = "Romantic"
                    break;
                case "Sci-fi & Fantasy":
                    sortedList[i] = "Fantasy"
                    break;
                case "Horror Movies":
                    sortedList[i] = "Horror"
                default:
                    sortedList[i] = sortedList[i];
            }

            a.addClass(sortedList[i]);
            // Adding a data-attribute
            a.attr("data-name", sortedList[i]);
            // Providing the initial button text

            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);

            catBtns.push(a);
        }

        //
        for (var i = 0; i < catBtns.length; i++) {

            //when you click one of the category buttons
            $("body").on("click", "." + catBtns[i][0].className, function(event) {

                //category that was selected
                var category = $(event.target);

                //pass category into the get movie choice function
                var movies = GetChoice(category);

                console.log(movies);

                //now choose a movie at random
                var selectedMovieUrl = GetMovieRandom(movies);

                //SESSION STORAGE THE URL
                localStorage.setItem("movieURL", selectedMovieUrl);
                // now lets really go get that shit
                //GetMovie(selectedMovieUrl);
            });

        }
    }

    //chooses a random movie
    function GetMovieRandom(movies) {

        var random = Math.floor((Math.random() * movies.length) + 1);

        randomMovie = movies[random - 1];

        movieChoice = randomMovie.show_title;

        movieInfo = "http://www.omdbapi.com/?t=" + movieChoice + "&apikey=40e9cece";

        return movieInfo;
    }

    //
    function GrabUrlFromStorage() {

        var movieUrl = localStorage.getItem("movieURL");


        if (movieUrl !== null && typeof movieUrl !== "undefined") {
            // this where your get movie call should go
            console.log(movieUrl);
        }

        localStorage.removeItem("movieURL")
    }
});
