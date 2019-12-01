class LoginController {
    loginAthlete(data) {

        console.log("Hello there " + axios.post);

        return new Promise((resolve, reject) => { axios.post('http://192.168.1.76:3000/usr/loginAthlete',data).then(function(success) {
                console.log(success);
                resolve(success.data);
            }).catch(function(err){
                console.log(err);
                reject(err);
            })
        });
    }

    loginCoach(data) {
        console.log("Hello there " + axios.post);

        return new Promise((resolve, reject) => { axios.post('http://192.168.1.76:3000/usr/loginCoach',data).then(function(success) {
            console.log(success);
            resolve(success.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        })
        });
    }
}

//module.exports = LoginController