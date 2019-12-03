class OffersController {
    addToList(data) {
        return new Promise((resolve, reject) => { axios.post('http://10.25.241.57:3000/list/insertList',data).then(function(success) {
            console.log(success);
            resolve(success.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        })
        });
    }

    getDataCoach(data) {
        return new Promise((resolve, reject) => { axios.post('http://10.25.241.57:3000/list/getList',data).then(function(success) {
            console.log(success);
            resolve(success.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        })
        });
    }

    getDataAthlete(data) {
        //console.log("entered to get Athlete list");
        return new Promise((resolve, reject) => { axios.post('http://10.25.241.57:3000/list/getCoach',data).then(function(success) {
            console.log(success);
            resolve(success.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        })
        });
    }
}