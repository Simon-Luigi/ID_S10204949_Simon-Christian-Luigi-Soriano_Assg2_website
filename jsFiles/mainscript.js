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
  let setCode = response.sets[i].code;
  let setImage = response.sets[i].logoUrl;
  let setName = response.sets[i].name;
  let setReleaseDate = response.sets[i].releaseDate;
  let setSymbol = response.sets[i].symbolUrl;
  let setData = `<div class = "box col-md-4" onclick = "location.href='./chosenset.html?setCode=${setCode}';">` + `<img src = "${setImage}" />` + `<h2>${setName} Set</h2>` + `<h3>Release date : ${setReleaseDate}</h3>` + `<img src = "${setSymbol}" />` + "</div>";
  $("#InitSets").append(setData);
  console.log(setData);
  };
};

