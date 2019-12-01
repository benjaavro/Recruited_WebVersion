var signupViewControl    = function (role, name, email, phone, location, institution, age, sex, password, sport) {
    const data = {};

    data.Role = role;
    data.Name = name;
    data.Email = email;
    data.Phone = phone;
    data.Location = location;
    data.Institution = institution;
    data.Age = age;
    data.Sex = sex;
    data.Password = password;
    data.Sport = sport;

    //console.log("entra");
    if (role == 1) {
        new SignupController().signupAthlete(data).then(fullfill => {
            if(fullfill > 0) {
                window.location.replace('login.html');
            } else {
                console.log("fullfill: " + fullfill);
                console.log(fullfill.length);

                $("#modal-text").text("Fill correctly all text fields A");
                $("#myModal").modal();
            }
        }).catch(err => {
            $("#modal-text").text("SERVER ERROR: This email is already used.");
            $("#myModal").modal();
        })
    } else {
        new SignupController().signupCoach(data).then(fullfill => {
            if(fullfill > 0) {
                window.location.replace('login.html');
            } else {
                console.log("fullfill: ");
                console.log(fullfill);
                console.log(fullfill.length);

                $("#modal-text").text("Fill correctly all text fields C");
                $("#myModal").modal();
            }
        }).catch(err => {
            $("#modal-text").text("SERVER ERROR: This email is already used.");
            $("#myModal").modal();
        })
    }
}