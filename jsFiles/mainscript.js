var getSet = {
    "url": "https://api.pokemontcg.io/v1/sets",
    "method": "GET",
    "timeout": 0
};
  
$.ajax(getSet).done(function (response) {
  DisplaySets(response);
})
function DisplaySets(response){

  for (var i = Object.keys(response.sets).length - 1; i >= 0; i--){
  let setCode = response.sets[i].code;
  let setImage = response.sets[i].logoUrl;
  let setName = response.sets[i].name;
  let setReleaseDate = response.sets[i].releaseDate;
  let setCards = response.sets[i].totalCards;
  let setData = `<div class = "box col-md-4" onclick = "location.href='./chosenset.html?=set=${setCode}';">` + `<img src = "${setImage}" />` + `<h2>${setName} set</h2>` + `<h3>${setCards} Cards</h3>` + `<h3>Release date : ${setReleaseDate}</h3>` + "</div>";
  $("#InitSets").append(setData);
  console.log(setData);
  };
};


