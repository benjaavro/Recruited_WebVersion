

var getListAsAthlete = function (user) {
    const data = {};

    data.Id = user;

    new OffersController().getDataAthlete(data).then(fullfill => {
        if(fullfill.length > 0) {
            for (i = 0; i < fullfill.length; i++) {
                $("#table-body").append("<tr>\n" +
                    "<th>" + fullfill[i].idCoach + "</th>\n" +
                    "<td>" + fullfill[i].name + "</td>\n" +
                    "</tr>");
            }
        } else {
            //$("#modal-text").text("Incorrect! Verify username and password.");
            //$("#myModal").modal();
        }
    }).catch(err => {
        $("#modal-text").text("SERVER ERROR :/");
        $("#myModal").modal();
    });
}

var getListAsCoach = function (user) {
    const data = {};

    data.Id = user;

    new OffersController().getDataCoach(data).then(fullfill => {
        if(fullfill.length > 0) {
            console.log("fullfill length: ");
            console.log(fullfill.length);

            for (i = 0; i < fullfill.length; i++) {
                $("#table-body").append("<tr>\n" +
                    "<th>" + fullfill[i].Athlete_idAthlete + "</th>\n" +
                    "<td>" + fullfill[i].name + "</td>\n" +
                    "</tr>");
            }
        } else {
            $("#modal-text").text("Incorrect! Verify username and password.");
            $("#myModal").modal();
        }
    }).catch(err => {
        $("#modal-text").text("SERVER ERROR :/");
        $("#myModal").modal();
    });
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