class ProfileController {
    getDataAthlete(data) {
        return new Promise((resolve, reject) => { axios.post('http://10.25.241.57:3000/profile/Athlete',data).then(function(success) {
            console.log(success);
            resolve(success.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        })
        });
    }

    updateDataAthlete(data) {
        console.log("updating to backend");
        console.log(data);
        return new Promise((resolve, reject) => { axios.post('http://10.25.241.57:3000/profile/AthleteEdit',data).then(function(success) {
            console.log(success);
            resolve(success.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        })
        });
    }
}
