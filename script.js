$(document).ready(function() {
    $("#button").on("click", clickButton)
    
    function clickButton(){
        var substitute = $("input").val();
        var key = "53c7da5d7c4c4b5482e0a2adfc4ad950"
        var queryURL = "https://api.spoonacular.com/food/ingredients/substitutes?apiKey=" + key + "&ingredientName=" + substitute
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var subArr = response.substitutes;
            for(var i = 0; i < subArr.length; i++){
            var newDiv = $("<div>").text(response.substitutes[i]);
            $("#display-here").append(newDiv)
            }
        })

    };



    })