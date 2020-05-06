$(document).ready(function(){

    $("#search-ngredient").on("click", function(event){

    $("#recipe-output").empty();

    //&from=0&to=3&calories=591-722&health=alcohol-free",
    var apiKey = "7c3c3f02da9149c942ed7a93944b5035"

    var ingredient = $("#searchOne").val();
    console.log(ingredient);
    

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.edamam.com/search?q=" + ingredient + "&app_id=0251bbae&app_key=" + apiKey, 
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
            "x-rapidapi-key": "55e56afa53mshc300cdc3d0931f1p1a2061jsnf2824df2c73d"
        }
    }

    
    $.ajax(settings).then(function(response){
        console.log(response);

        if (response.count === 0){

            $("#recipe-output").text("No Recipes Found");

        };

     for (var i =0; i < response.hits.length; i++){
        
        var recipeName = response.hits[i].recipe.label;
        var recipe = response.hits[i].recipe.url;
        var recipeImage = response.hits[i].recipe.image;

        var recipeLink = $("<a>");
        recipeLink.attr("href", recipe);
        recipeLink.attr("target", "_blank");
        recipeLink.text("Link to Recipe");

        var img = $("<img>");
        img.attr("src", recipeImage);

        var label = $("<div>");
        var imgDiv = $("<div>");
        imgDiv.append(img);
        label.append(imgDiv, recipeName+ ": ", recipeLink);
        $("#recipe-output").append(label);
        
    };
    
    



    });

})

        
    




});