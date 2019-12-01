var getProfileData = function (user) {

    const data = {};

    data.Id = user;

    new ProfileController().getDataAthlete(data).then(fullfill => {
        //console.log("fullfill: ");
        if(fullfill.length > 0) {
            //console.log(fullfill[0]);
            $("#name").append(fullfill[0].name);
            $("#name-title").append(fullfill[0].name);
            $("#description").append(fullfill[0].description);
            $("#sport").append(fullfill[0].sport);
            $("#mail").append(fullfill[0].mail);
            $("#phone").append(fullfill[0].phoneNumber);
            $("#location").append(fullfill[0].address);
            $("#institution").append(fullfill[0].institution);
        } else {
            $("#modal-text").text("Incorrect! Verify username and password.");
            $("#myModal").modal();
        }
    }).catch(err => {
        $("#modal-text").text("SERVER ERROR :/");
        $("#myModal").modal();
    })
}

var openProfile = function (user) {
    var queryString = "?id=" + user;
    window.location.href = "./profile.html" + queryString;

    console.log(queryString);
}

var openHome = function (user) {
    var queryString = "?id=" + user;
    window.location.href = "./index.html" + queryString;

    console.log(queryString);
}

var openPosts = function (user) {
    var queryString = "?id=" + user;
    window.location.href = "./posts.html" + queryString;

    console.log(queryString);
}

var openOffers = function (user) {
    var queryString = "?id=" + user;
    window.location.href = "./offers.html" + queryString;

    console.log(queryString);
}

var openSettings = function (user) {
    var queryString = "?id=" + user;
    window.location.href = "./settings.html" + queryString;

    console.log(queryString);
}