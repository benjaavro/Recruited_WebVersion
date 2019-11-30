var loginViewControl = function (user, password, role) {

    const data = {};
    
    data.User = user;
    data.Password = password;
    
    if (role == 1) {

        new LoginController().loginAthlete(data).then(fullfill => {
            if(fullfill.length > 0) {
                window.location.replace('index.html');
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
                window.location.replace('index.html');
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