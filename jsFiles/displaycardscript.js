var setCode = window.location.search;
setCode = setCode.replace("?setCode=", '');
console.log(setCode);

var getCards = {
  "url": `https://api.pokemontcg.io/v1/cards?setCode=${setCode}&page=0&pageSize=300`,
  "method": "GET",
  "timeout": 0,
};

$(document).ready(function() {
  $.ajax(getCards).done(function (response) {
    InputSetName(response);
    DisplayCards(response);
  });
  FilterCards();
});
  

function DisplayCards(response){
    
    for (var i = 0; i < Object.keys(response.cards).length - 1; i++){
        var cardId = response.cards[i].id
        var cardImage = response.cards[i].imageUrlHiRes
        var cardType = response.cards[i].supertype.toLowerCase();
        var cardData = `<div class = "text-center col-md-3 ${cardType}" onclick = "location.href='./chosencard.html?card=${cardId}';">` + `<img class = "pokemonCard" src = "${cardImage}" />` + "</div>";
        $("#InitCards").append(cardData);
        console.log(cardId)
        console.log(cardData)
    }
}

function FilterCards(){
  $('input[type="checkbox"]').click(function () { 
    var inputValue = $(this).attr("value"); 
    $("." + inputValue).toggle(); 
  }); 
}
function InputSetName(response){
  const CHOSENSET = response.cards[0].set;
  $("#ChosenSet").html(`${CHOSENSET} Set`);
}