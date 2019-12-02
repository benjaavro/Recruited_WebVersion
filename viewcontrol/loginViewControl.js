var loginViewControl = function (user, password, role) {

    const data = {};
    
    data.User = user;
    data.Password = password;
    data.Role = role;

    if (role == 1) {
        new LoginController().loginAthlete(data).then(fullfill => {
            if(fullfill.length > 0) {
                console.log(fullfill[0].idAthlete);
                var aux = fullfill[0].idAthlete;
                var aux2 = 1;
                var queryString = "?id=" + aux;
                var roleString = "&role=" + aux2;
                window.location.href = "./index.html" + queryString + roleString;
            } else {
                $("#modal-text").text("Incorrect! Verify usename and password.");
                $("#myModal").modal();
            }
        }).catch(err => {
            $("#modal-text").text("SERVER ERROR :/");
            $("#myModal").modal();
        })
    } else {
        new LoginController().loginCoach(data).then(fullfill => {
            if(fullfill.length > 0) {
                console.log(fullfill[0].idCoach);
                var aux = fullfill[0].idCoach;
                var aux2 = 2;
                var queryString = "?id=" + aux;
                var roleString = "&role=" + aux2;
                window.location.href = "./index.html" + queryString + roleString;
            } else {
                $("#modal-text").text("Incorrect! Verify usename and password.");
                $("#myModal").modal();
            }
        }).catch(err => {
            $("#modal-text").text("SERVER ERROR :/");
            $("#myModal").modal();
        })
    }
}