var profileViewControl = function (user) {

    const data = {};
    
    data.User = user;

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