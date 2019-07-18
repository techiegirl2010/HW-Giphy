
$(document).ready(function () {

    //Create an array of strings, 
    var animals = ["cat", "bat", "dog", "rabbit", "crab", "bird", "tiger", "lion", "fish", "raccoon", "opossum", "pig", "cow"];

    //Function for generating buttons
    function generateButtons() {
        console.log("generate buttons");

        //Deleting buttons prior to adding new ones... so no duplicates.
        $("#animal-buttons").empty();

        //Loop through array of animals   
        for (var i = 0; i < animals.length; i++) {
            //Generate buttons for each animal in the array
            var a = $("<button>");
            // <button class="top-button" data-type=cat>cat</button>
            //Add class
            a.addClass("top-button");
            //Add data-attribute with value of animal at index i
            a.attr("data-type", animals[i]);
            //Add text for button with value at index i
            a.text(animals[i]);
            //Add buttons to HTML
            $("#animal-buttons").append(a);

        }
    }
    generateButtons();
    $(document).on("click", "#add-animal", function () {
        event.preventDefault()
        var animalName = $("input").val();
        animals.push(animalName);
        generateButtons();
    })
    // 2. Your app should take the topics in this array and create buttons in your HTML.
    // * Try using a loop that appends a button for each string in the array. 


    //  3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. 
    // Getting gifs from api... onto html
    $(".top-button").on("click", function () {
        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=mvnYxlz79dRjobYk0GyTf3rpY5wWCVvZ&limit=10";

        // Add Ajax
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(results)
            for(var i=0; i<results.length; i++){
                var animalDiv = $("<div>");
                var rating = results[i].rating;
                var p =$("<p>").text("Rating: " +rating);

                var animate = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animate);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#gify-holder").append(animalDiv);
            }

        });

    })


    // for (var i = 0; i < results.length i++) {
    //     var




    // }

$(document).on("click", ".animal-image", function(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

})

    // 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing. 
    

    //  5. Under every gif, display its rating (PG, G, so on).
    // * This data is provided by the GIPHY API.


    // * Only once you get images displaying with button presses should you move on to the next step.
    //  6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page. 





    //  ### Bonus Goals

    // 1. Ensure your app is fully mobile responsive.

    // 2. Allow users to request additional gifs to be added to the page.
    // * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

    // 3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

    // 4. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

    // 5. Allow users to add their favorite gifs to a `favorites` section.
    // * This should persist even when they select or add a new topic.
    // * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies). 


})
