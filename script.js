//function that stores the information in local storage
$(document).ready(function () {
    var recipes = [];
    var currentRecipeIndex = 0;
  
    $("#search-ingredient").on("click", function (event) {
      $("#recipe-output").empty();
  
      //&from=0&to=3&calories=591-722&health=alcohol-free",
      var apiKey = "7c3c3f02da9149c942ed7a93944b5035";
  
      var ingredient = $("#searchOne").val();
      console.log(ingredient);
  
      var settings = {
        async: true,
        crossDomain: true,
        url:
          "https://api.edamam.com/search?q=" +
          ingredient +
          "&app_id=0251bbae&app_key=" +
          apiKey,
        method: "GET",
        headers: {
          "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
          "x-rapidapi-key": "55e56afa53mshc300cdc3d0931f1p1a2061jsnf2824df2c73d",
        },
      };
      function displayRecipe(recipeIndex) {
        var recipeName = recipes[recipeIndex].recipe.label;
        var recipe = recipes[recipeIndex].recipe.url;
        var recipeImage = recipes[recipeIndex].recipe.image;
  
        var recipeLink = $("<a>");
        recipeLink.attr("href", recipe);
        recipeLink.attr("target", "_blank");
        recipeLink.text("Link to Recipe");
  
        var img = $("<img>");
        img.attr("src", recipeImage);
        //Created a button that will take us to the next recepie
        var nextButton = $("<button/>", {
          text: "Next",
          click: function () {
            currentRecipeIndex++;
            displayRecipe(currentRecipeIndex);
          },
        });
        //if statement that disables the button when the array reaches the last object
        if (currentRecipeIndex == recipes.length - 1) {
          nextButton.prop("disabled", true);
        }
  
        var label = $("<div>");
        var imgDiv = $("<div>");
        imgDiv.append(img);
        label.append(imgDiv, recipeName + ": ", recipeLink);
        $(".card-action").html(nextButton);
        $("#recipe-output").html(label);
      }
  
      $.ajax(settings).then(function (response) {
        console.log(response);
  
        if (response.count === 0) {
          $("#recipe-output").text("No Recipes Found");
        }
  
        recipes = response.hits;
        displayRecipe(currentRecipeIndex);
      });
    });
  
    $(".modal-trigger").on("click", clickButton);
    function clickButton() {
      $("#modal1").modal();
      var substitute = $("#searchThree").val();
      console.log(substitute);
      var key = "53c7da5d7c4c4b5482e0a2adfc4ad950";
      var queryURL =
        "https://api.spoonacular.com/food/ingredients/substitutes?apiKey=" +
        key +
        "&ingredientName=" +
        substitute;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response.status);
        $(".modal-content").empty();
        if (response.status === "success") {
          var subArr = response.substitutes;
          var title = $("<h4>").text("Substitutes for " + substitute);
          for (var i = 0; i < subArr.length; i++) {
            var newDiv = $("<div>").text(response.substitutes[i]);
            $(".modal-content").prepend(title).append(newDiv);
          }
        } else if (response.status === "failure") {
          var errorMsg = $("<div>").text(response.message);
          $(".modal-content").prepend(errorMsg);
        }
      });
    }
  });