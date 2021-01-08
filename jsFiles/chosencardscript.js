var chosenCard = window.location.search;
chosenCard = chosenCard.replace("?card=", ''); 
console.log(chosenCard);

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
    let chosenSetName = data.card.id.substr(0, data.card.id.indexOf('-')); 
    console.log(chosenSetName)
    $(".chkSet").attr("onclick", `location.href = './chosenset.html?setCode=${chosenSetName}'`);
}

function InitializeChosenCard(data){
    //give all neccessary card data variables
    let cardName = data.card.name;
    let cardImage = data.card.imageUrlHiRes;
    let cardArtist = data.card.artist;
    let cardSeries = data.card.series;
    let cardRarity = data.card.rarity;
    let cardType = data.card.supertype;
    let cardId = data.card.id;
    let cardPokedex = data.card.nationalPokedexNumber;
    let cardSubType = data.card.subtype;
    
    let cardData = [cardName,cardImage,cardArtist,cardSeries,cardRarity,cardType,cardId,cardPokedex,cardSubType];
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
        $(".cardType").html("N/A");
        $(".cardArtist").html(`Artist: ${CARDDATA[2]}`);
        $(".cardRarity").html(`Rarity: ${CARDDATA[4]}`);
        $(".cardId").html(`Card Id: ${CARDDATA[6]}`);
        $(".setName").html(`Card Series: ${CARDDATA[3]}`);
        $(".chosenCardIcon").append('<img src = "./images/trainerIcon.png" />')
    }else if (CARDDATA[5] === "Pokémon"){
        let cardElement = data.card.types[0];
        let typing = cardElement.toLowerCase();
        $(".chosenCard").attr("src",`${CARDDATA[1]}`);
        $(".chosenCardName").html(`${CARDDATA[0]}`);
        $(".chosenCardClass").html(`${CARDDATA[5]} - ${CARDDATA[8]}`);
        $(".pokedexNum").html(`National Pokedex Number: ${CARDDATA[7]}`);
        $(".cardArtist").html(`Artist: ${CARDDATA[2]}`);
        $(".cardRarity").html(`Rarity: ${CARDDATA[4]}`);
        $(".cardId").html(`Card Id: ${CARDDATA[6]}`);
        $(".setName").html(`Card Series: ${CARDDATA[3]}`);
        $(".chosenCardIcon").addClass(`energyType ${typing}`);
    }
    else{ //card is energy type
        $(".chosenCard").attr("src",`${CARDDATA[1]}`);
        $(".chosenCardName").html(`${CARDDATA[0]}`);
        $(".chosenCardClass").html(`${CARDDATA[5]} - ${CARDDATA[8]}`);
        $(".pokedexNum").html("N/A");
        $(".cardType").html("N/A");
        $(".cardArtist").html(`Artist: ${CARDDATA[2]}`);
        $(".cardRarity").html(`Rarity: ${CARDDATA[4]}`);
        $(".cardId").html(`Card Id: ${CARDDATA[6]}`);
        $(".setName").html(`Card Series: ${CARDDATA[3]}`);
        $(".chosenCardIcon").append('<img src = "./images/energyIcon.png" />');
    }

    InputCardRules(data);
}

function InputCardRules(data){
    let chkCard = InitializeChosenCard(data);
    if (chkCard[5] === "Trainer"){
        $("#rulesOrAttacks").append("<h3>Rules</h3>");
        for (i = 0; i <= Object.keys(data.card.text).length - 1; i++){
            $("#rulesOrAttacks").append(`<p>${data.card.text[i]}</p>`);
            $("#rulesOrAttacks").append(`<br>`);
            
        }

    }else if (chkCard[5] === "Pokémon"){
        for (i = 0; i <= Object.keys(data.card.attacks).length - 1; i++){
            if (data.card.attacks[i].damage === ""){
                $("#rulesOrAttacks").append(`<h3>${data.card.attacks[i].name}</h3>`);
            }
            else{
                $("#rulesOrAttacks").append(`<h3>${data.card.attacks[i].name} | ${data.card.attacks[i].damage}</h3>`);
            }
            $("#rulesOrAttacks").append(`<p>${data.card.attacks[i].text}</p>`);
            console.log(i);
        }
    }
    else{ //card is energy type

    }

}

