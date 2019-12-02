var getAllPosts = function() {
    new PostsController().getPost().then(fullfill => {
        if(fullfill.length > 0) {
            console.log(fullfill);
            console.log(fullfill.length);

            for (i = fullfill.length - 1; i >= 0; i--) {
                $("#col-center").append("<div class=\"card\">\n" +
                    "                       <div class=\"card-body\">\n" +
                    "                           <h5 class=\"card-title\" id=\"post-owner\">" + fullfill[i].Athlete_idAthlete + "</h5>\n" +
                    "                           <h6 class=\"card-subtitle mb-2 text-muted\" id=\"post-date\">" + fullfill[i].date + "</h6>\n" +
                    "                           <p class=\"card-text\" id=\"post-content\">" + fullfill[i].description + "</p>\n" +
                    "                       </div>\n" +
                    "                   </div>");
            }

        } else {
            //$("#modal-text").text("Incorrect! Verify username and password.");
            //$("#myModal").modal();
        }
    }).catch(err => {
        //$("#modal-text").text("SERVER ERROR :/");
        //$("#myModal").modal();
    });
}

var openProfile = function (user, role) {
    var queryString = "?id=" + user;
    var roleString = "&role=" + role;
    window.location.href = "./profile.html" + queryString + roleString;
}

var postsViewControl = function (text, user, date, role) {
    const data = {};

    data.Id = user;
    data.Date = date;
    data.Description = text;
    data.Role = role;

    if (role == 1) {
        console.log("step 2...");
        new PostsController().postAthlete(data).then(fullfill => {
            if (fullfill.length > 0) {
                console.log(fullfill[0]);

                $("#modal-text").text("Write something bruh...");
                $("#myModal").modal();
            } else {
                var queryString = "?id=" + user;
                var roleString = "&role=" + role;
                window.location.href = "./index.html" + queryString + roleString;
            }
        }).catch(err => {
            $("#modal-text").text("SERVER ERROR :/");
            $("#myModal").modal();
        })
    }
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