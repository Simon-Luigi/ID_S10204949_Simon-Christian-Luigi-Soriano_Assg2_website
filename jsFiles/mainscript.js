var getSet = {
    "url": "https://api.pokemontcg.io/v1/sets",
    "method": "GET",
    "timeout": 0
};


$(document).ready(function() {
  $.ajax(getSet).done(function (response) {
    DisplaySets(response);
  })
});

function DisplaySets(response){

  for (var i = Object.keys(response.sets).length - 1; i >= 0; i--){
  var setCode = response.sets[i].code;
  var setImage = response.sets[i].logoUrl;
  var setName = response.sets[i].name;
  var setReleaseDate = response.sets[i].releaseDate;
  var setSymbol = response.sets[i].symbolUrl;
  var setData = `<div class = "card mx-auto setGrow" style = "width: 20rem;" onclick = "location.href='./chosenset.html?setCode=${setCode}';">` + 
  '<div class = "card-img">' + `<img src = "${setImage}" />` + "</div>" + '<div class = "card-content">' +
  '<div class = "media">' +  '<div class = "media-content">' + `<h5 class = "card-title">${setName} Set</h5>` +
  `<p class = "card-text text-secondary">Released: ${setReleaseDate}</p>` + "</div>" + '<div class = "media-right">'  +
  `<img class = "symbol" src = "${setSymbol}" />` + "</div> </div> </div> </div>" ;
  $("#InitSets").append(setData);
  console.log(setData);
  };
};

