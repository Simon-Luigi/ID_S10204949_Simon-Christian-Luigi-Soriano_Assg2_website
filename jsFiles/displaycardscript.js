var setCode = window.location.search;
setCode = setCode.replace("?setCode=", '');
console.log(setCode);

var getCards = {
  "url": `https://api.pokemontcg.io/v1/cards?setCode=${setCode}&page=0&pageSize=300`,
  "method": "GET",
  "timeout": 0,
};


$.ajax(getCards).done(function (response) {
  DisplayCards(response);
});

function DisplayCards(response){
    
    for (var i = 0; i < Object.keys(response.cards).length - 1; i++){
        let cardId = response.cards[i].id
        let cardImage = response.cards[i].imageUrl
        let cardData = `<div class = "col-md-3" onclick = "location.href='./chosencard.html?card=${cardId}';">` + `<img class = "fullsize" src = "${cardImage}" />` + "</div>";
        $("#InitCards").append(cardData);
        console.log(cardId)
        console.log(i)
    }
}

