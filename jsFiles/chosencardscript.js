var chosenCard = location.search;
var chosenCard = chosenCard.replace("?card=",''); 

var getChosenCard = {
    "url": `https://api.pokemontcg.io/v1/cards/${chosenCard}`,
    "method": "GET",
    "timeout": 0,
};


$(document).ready(function() {
    $.ajax(getChosenCard).done(function (data) {
        InputCardValues(data);
        ChangeOnClick(data);
    });
  });
    
function ChangeOnClick(data){
    var chosenSetName = data.card.id.substr(0, data.card.id.indexOf('-')); 
    $(".chkSet").attr("onclick", `location.href = './chosenset.html?setCode=${chosenSetName}'`);
}

function InitializeChosenCard(data){
    //give all neccessary card data variables
    var cardName = data.card.name;
    var cardImage = data.card.imageUrlHiRes;
    var cardArtist = data.card.artist;
    var cardSeries = data.card.series;
    var cardRarity = data.card.rarity;
    var cardType = data.card.supertype;
    var cardId = data.card.id;
    var cardPokedex = data.card.nationalPokedexNumber;
    var cardSubType = data.card.subtype;
    
    var cardData = [cardName,cardImage,cardArtist,cardSeries,cardRarity,cardType,cardId,cardPokedex,cardSubType];
    return cardData;
}
/*0 = name, 1 = image, 2 = artist, 3 = series name, 4 = rarity, 5 = card class, 6 = Id, 7 = pokedex, 8 = subtype*/
function InputCardValues(data){
    const CARDDATA = InitializeChosenCard(data);
    console.log(CARDDATA);
    if (CARDDATA[5] === "Trainer"){
        $(".chosenCard").attr("src",`${CARDDATA[1]}`);
        $(".chosenCardName").html(`${CARDDATA[0]}`);
        $(".chosenCardClass").html(`${CARDDATA[5]} - ${CARDDATA[8]}`);
        $(".pokedexNum").html("N/A");
        $(".cardArtist").html(`${CARDDATA[2]}`);
        $(".cardRarity").html(`${CARDDATA[4]}`);
        $(".cardId").html(`${CARDDATA[6]}`);
        $(".setName").html(`${CARDDATA[3]}`);
        $(".chosenCardIcon").append('<img class = "trainerIcon" src = "./images/trainerIcon.png" />')
    }else if (CARDDATA[5] === "Pokémon"){
        var cardElement = data.card.types[0];
        var typing = cardElement.toLowerCase();
        $(".chosenCard").attr("src",`${CARDDATA[1]}`);
        $(".chosenCardName").html(`${CARDDATA[0]}`);
        $(".chosenCardClass").html(`${CARDDATA[5]} - ${CARDDATA[8]}`);
        $(".pokedexNum").html(`${CARDDATA[7]}`);
        $(".cardArtist").html(`${CARDDATA[2]}`);
        $(".cardRarity").html(`${CARDDATA[4]}`);
        $(".cardId").html(`${CARDDATA[6]}`);
        $(".setName").html(`${CARDDATA[3]}`);
        $(".chosenCardIcon").addClass(`energyTypeIcon energyType ${typing}`);
    }
    else{ //card is energy type
        $(".chosenCard").attr("src",`${CARDDATA[1]}`);
        $(".chosenCardName").html(`${CARDDATA[0]}`);
        $(".chosenCardClass").html(`${CARDDATA[5]} - ${CARDDATA[8]}`);
        $(".pokedexNum").html("N/A");
        if (typeof CARDDATA[2] === 'undefined'){
            $(".cardArtist").html("N/A");
        }
        else{
            $(".cardArtist").html(`${CARDDATA[2]}`);
        }
        $(".cardRarity").html(`${CARDDATA[4]}`);
        $(".cardId").html(`${CARDDATA[6]}`);
        $(".setName").html(`${CARDDATA[3]}`);
        $(".chosenCardIcon").append('<img class = "energyIcon" src = "./images/energyIcon.png" />');
    }

    InputCardRules(data);
}

function InputCardRules(data){
    var chkCard = InitializeChosenCard(data);
    if (chkCard[5] === "Trainer"){
        $("#rulesOrAttacks").append('<p class = "text-secondary rules" >Rules</p>');
        for (i = 0; Object.keys(data.card.text).length - 1 >= i; i++){
            $("#rulesOrAttacks").append(`<p class = "mb-4 ruleDesc">${data.card.text[i]}</p>`);
            console.log(i)
        }
    }else if (chkCard[5] === "Pokémon"){
        for (i = 0; i <= Object.keys(data.card.attacks).length - 1; i++){
            if (data.card.attacks[i].damage === ""){
                $("#rulesOrAttacks").append(`<p class = "attackName pb-2 text-secondary">${data.card.attacks[i].name}</p>`);
            }
            else{
                $("#rulesOrAttacks").append(`<p class = "attackName text-secondary">${data.card.attacks[i].name} | ${data.card.attacks[i].damage}</p>`);
            }
            $("#rulesOrAttacks").append(`<p class = "pb-2 attackDesc">${data.card.attacks[i].text}</p>`);
        }
    }
    else{ //card is energy type

    }

}

