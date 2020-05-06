$(document).ready(function() {
    $(".modal-trigger").on("click", clickButton)
    
    
    function clickButton(){
        $("#modal1").modal()
        var substitute = $("#searchThree").val();
        console.log(substitute);
        var key = "53c7da5d7c4c4b5482e0a2adfc4ad950"
        var queryURL = "https://api.spoonacular.com/food/ingredients/substitutes?apiKey=" + key + "&ingredientName=" + substitute
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response.status)
            $(".modal-content").empty()
 

            if(response.status === "success") {
                var subArr = response.substitutes;
                var title = $("<h4>").text("Substitutes for " + substitute)
                for(var i = 0; i < subArr.length; i++){
                    var newDiv = $("<div>").text(response.substitutes[i]);
                    $(".modal-content").prepend(title).append(newDiv)
                }
                
            } else if(response.status === "failure") {
                var errorMsg = $("<div>").text(response.message)
                $(".modal-content").prepend(errorMsg)

            }

            
            
        })
        
    };
    function findGrocery(){
    var apiKey = "pk.eyJ1Ijoic2hrZTA4MTkiLCJhIjoiY2s5dW9icXpqMDN6MjNucGVqY3dkYXhtcSJ9.XcBVX3QPyZsx5WuBzwI8_g"
    var queryURL ="https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=" + apiKey
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)

        })



    }
    findGrocery()

    })