var loginViewControl = function (user, password, role) {

    const data = {};
    
    data.User = user;
    data.Password = password;

    console.log("role:");
    console.log(role);
    if (role == 1) {
        new LoginController().loginAthlete(data).then(fullfill => {
            if(fullfill.length > 0) {
                console.log(fullfill[0].idAthlete);
                var aux = fullfill[0].idAthlete;
                var queryString = "?id=" + aux;
                window.location.href = "./index.html" + queryString;
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
                console.log(fullfill);
                //window.location.replace('index.html');
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