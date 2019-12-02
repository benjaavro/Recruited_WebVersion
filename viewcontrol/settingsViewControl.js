var createStat = function (user, role, statName, statValue) {
    const data = {};

    data.Name = statName;
    data.Content = statValue;
    data.Id = user;

    console.log(data);
    new SettingsController().registerStat(data).then(fullfill => {
        console.log("Im ok");
        console.log(fullfill);
        if(fullfill == 1) {
            console.log("Stat added correctly");
            var queryString = "?id=" + user;
            var roleString = "&role=" + role;
            window.location.href = "./profile.html" + queryString + roleString;
        } else {
            $("#modal-text").text("Fill correctly all text fields");
            $("#myModal").modal();
        }
    }).catch(err => {
        $("#modal-text").text("SERVER ERROR: Not able to send request to server.");
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

var openPosts = function (user, role) {
    var queryString = "?id=" + user;
    var roleString = "&role=" + role;
    window.location.href = "./posts.html" + queryString + roleString;
}

var openOffers = function (user, role) {
    var queryString = "?id=" + user;
    var roleString = "&role=" + role;
    window.location.href = "./offers.html" + queryString + roleString;
}

var openSettings = function (user, role) {
    var queryString = "?id=" + user;
    var roleString = "&role=" + role;
    window.location.href = "./settings.html" + queryString + roleString;
}