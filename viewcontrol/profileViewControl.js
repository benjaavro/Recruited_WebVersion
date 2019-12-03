var getProfileStats = function (user, role) {
    const data = {};

    data.Id = user;
    data.Role = role;

    new ProfileController().getAthleteStats(data).then(fullfill => {
        if(fullfill.length > 0) {
            console.log("fullfill length: ");
            console.log(fullfill.length);

            for (i = 0; i < fullfill.length; i++) {
                $("#table-body").append("<tr>\n" +
                                            "<th>" + fullfill[i].idRecord + "</th>\n" +
                                            "<td>" + fullfill[i].name + "</td>\n" +
                                            "<td>" + fullfill[i].content + "</td>\n" +
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

var getProfileData = function (user, role) {

    const data = {};

    data.Id = user;
    data.Role = role;


    if (role == 1){
        new ProfileController().getDataAthlete(data).then(fullfill => {
        if(fullfill.length > 0) {
            $("#name").append(fullfill[0].name);
            $("#name-title").append(fullfill[0].name);
            $("#description").append(fullfill[0].description);
            $("#sport").append(fullfill[0].sport);
            $("#mail").append(fullfill[0].mail);
            $("#phone").append(fullfill[0].phoneNumber);
            $("#location").append(fullfill[0].address);
            $("#institution").append(fullfill[0].institution);
            $("#age").append(fullfill[0].age);
        } else {
            $("#modal-text").text("Incorrect! Verify username and password.");
            $("#myModal").modal();
        }
    }).catch(err => {
        $("#modal-text").text("SERVER ERROR :/");
        $("#myModal").modal();
    })

    } 

    else {
        new ProfileController().getDataCoach(data).then(fullfill => {
        if(fullfill.length > 0) {
            $("#name").append(fullfill[0].name);
            $("#name-title").append(fullfill[0].name);
            $("#description").append(fullfill[0].description);
            $("#sport-tag").css('display', 'none');
            $("#mail").append(fullfill[0].mail);
            $("#phone").append(fullfill[0].phoneNumber);
            $("#location").append(fullfill[0].address);
            $("#institution").append(fullfill[0].institution);
            $("#age-tag").css('display', 'none');
        } else {
            $("#modal-text").text("Incorrect! Verify username and password.");
            $("#myModal").modal();
        }
    }).catch(err => {
        $("#modal-text").text("SERVER ERROR :/");
        $("#myModal").modal();
    })

    }

    
}

var getProfileInfo = function (user, role) {
    const data = {};

    data.Id = user;
    data.Role = role;

    if(role==1){

         new ProfileController().getDataAthlete(data).then(fullfill => {
        if(fullfill.length > 0) {
            $("#age").val(function(){
                return fullfill[0].age});
            $("#phone").val(function(){
                return fullfill[0].phoneNumber});
            $("#location").val(function(){
                return fullfill[0].address});
            $("#institution").val(function(){
                return fullfill[0].institution});
            $("#description").val(function(){
                return fullfill[0].description});
            $("#sport").val(function(){
                return fullfill[0].sport});
            $("#password").val(function(){
                return fullfill[0].password});
        } else {
            $("#modal-text").text("Incorrect! Verify username and password.");
            $("#myModal").modal();
        }
    }).catch(err => {
        $("#modal-text").text("SERVER ERROR :/");
        $("#myModal").modal();
    })

    } else{
       
        

         new ProfileController().getDataCoach(data).then(fullfill => {
        if(fullfill.length > 0) {

            $("#age").css('display', 'none');
            $("#age-1").css('display', 'none');
            $("#age-2").css('display', 'none');
            $("#phone").val(function(){
                return fullfill[0].phoneNumber});
            $("#location").val(function(){
                return fullfill[0].address});
            $("#institution").val(function(){
                return fullfill[0].institution});
            $("#description").val(function(){
                return fullfill[0].description});
           $("#sport").css('display', 'none');
            $("#sport-1").css('display', 'none');
            $("#sport-2").css('display', 'none');
            $("#password").val(function(){
                return fullfill[0].password});
        } else {
            $("#modal-text").text("Incorrect! Verify username and password.");
            $("#myModal").modal();
        }
    }).catch(err => {
        $("#modal-text").text("SERVER ERROR :/");
        $("#myModal").modal();
    })
    }

   
}

var saveProfileInfo = function (user, role) {
    const data = {};
    data.Id = user;

    var auxAge = $("#age").val();
    var auxPhone = $("#phone").val();
    var auxLocation = $("#location").val();
    var auxInstitution = $("#institution").val();
    var auxDescription = $("#description").val();
    var auxSport = $("#sport").val();
    var auxPassword = $("#password").val();

    if(role==1){
        new ProfileController().getDataAthlete(data).then(fullfill => {
        data.Name = fullfill[0].name;
        data.Age= fullfill[0].age;
        data.Phone = fullfill[0].phoneNumber;
        data.Location = fullfill[0].address;
        data.Institution = fullfill[0].institution;
        data.Description = fullfill[0].description;
        data.Sport = fullfill[0].sport;
        data.Password = fullfill[0].password;

        if(auxAge === data.Age) {
            console.log("no changes Age :)");
        } else {
            data.Age = auxAge;
        }

        if(auxPhone === data.Phone) {
            console.log("no changes Phone :)");
        } else {
            data.Phone = auxPhone;
        }

        if(auxLocation === data.Location) {
            console.log("no changes Location :)");
        } else {
            data.Location = auxLocation;
        }

        if(auxInstitution === data.Institution) {
            console.log("no changes Instition :)");
        } else {
            data.Institution = auxInstitution;
        }

        if(auxDescription === data.Description) {
            console.log("no changes Description:)");
        } else {
            data.Description = auxDescription;
        }

        if(auxSport === data.Sport) {
            console.log("no changes Sport :)");
        } else {
            data.Sport = auxSport;
        }

        if(auxPassword === data.Password) {
            console.log("no changes Password :)");
        } else {
            data.Password = Password;
        }

        console.log(data.Description);

        new ProfileController().updateDataAthlete(data).then(fullfill => {
            if(fullfill == 1) {
                console.log("Good jab");
            } else {
                $("#modal-text").text("Can't update info, try later");
                $("#myModal").modal();
            }
        }).catch(err => {
            $("#modal-text").text("SERVER ERROR :/ WTF");
            $("#myModal").modal();
        });
    });

    } else{



        new ProfileController().getDataCoach(data).then(fullfill => {
        data.Name = fullfill[0].name;
        //data.Age= fullfill[0].age;
        data.Phone = fullfill[0].phoneNumber;
        data.Location = fullfill[0].address;
        data.Institution = fullfill[0].institution;
        data.Description = fullfill[0].description;
       // data.Sport = fullfill[0].sport;
        data.Password = fullfill[0].password;

        /*if(auxAge === data.Age) {
            console.log("no changes Age :)");
        } else {
            data.Age = auxAge;
        }*/

        if(auxPhone === data.Phone) {
            console.log("no changes Phone :)");
        } else {
            data.Phone = auxPhone;
        }

        if(auxLocation === data.Location) {
            console.log("no changes Location :)");
        } else {
            data.Location = auxLocation;
        }

        if(auxInstitution === data.Institution) {
            console.log("no changes Instition :)");
        } else {
            data.Institution = auxInstitution;
        }

        if(auxDescription === data.Description) {
            console.log("no changes Description:)");
        } else {
            data.Description = auxDescription;
        }

        /*if(auxSport === data.Sport) {
            console.log("no changes Sport :)");
        } else {
            data.Sport = auxSport;
        }*/

        if(auxPassword === data.Password) {
            console.log("no changes Password :)");
        } else {
            data.Password = Password;
        }


        console.log(data.Description);

        new ProfileController().updateDataCoach(data).then(fullfill => {
            console.log("fullfill: ");
            console.log(fullfill);
            if(fullfill == 1) {
                console.log("Good jab");
            } else {
                $("#modal-text").text("Can't update info, try later");
                $("#myModal").modal();
            }
        }).catch(err => {
            $("#modal-text").text("SERVER ERROR :/ WTF");
            $("#myModal").modal();
        });
    });
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