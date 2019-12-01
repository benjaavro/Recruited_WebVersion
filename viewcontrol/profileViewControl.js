var getProfileData = function (user, role) {

    const data = {};

    data.Id = user;
    data.Role = role;

    new ProfileController().getDataAthlete(data).then(fullfill => {
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

var openProfile = function (user, role) {
    var queryString = "?id=" + user;
    var roleString = "&role=" + role;
    window.location.href = "./profile.html" + queryString + roleString;
}

var openHome = function (user, role) {
    var queryString = "?id=" + user;
    var roleString = "&role=" + role;
    window.location.href = "./index.html" + queryString + roleString;
}

var openPosts = function (user) {
    var queryString = "?id=" + user;
    var roleString = "&role=" + role;
    window.location.href = "./posts.html" + queryString + roleString;
}

var openOffers = function (user) {
    var queryString = "?id=" + user;
    var roleString = "&role=" + role;
    window.location.href = "./offers.html" + queryString + roleString;
}

var openSettings = function (user) {
    var queryString = "?id=" + user;
    var roleString = "&role=" + role;
    window.location.href = "./settings.html" + queryString + roleString;
}