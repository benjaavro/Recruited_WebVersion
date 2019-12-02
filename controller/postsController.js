class PostsController {
    postAthlete(data) {
        return new Promise((resolve, reject) => { axios.post('http://192.168.1.76:3000/post/insert',data).then(function(success) {

            console.log("entered backend");
            console.log(success);
            resolve(success.data);
        }).catch(function(err){

            console.log("entered with failure");
            console.log(err);
            reject(err);
        })
        });
    }

    postCoach(data) {
        return new Promise((resolve, reject) => { axios.post('http://192.168.1.76:3000/usr/loginAthlete',data).then(function(success) {
            console.log(success);
            resolve(success.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        })
        });
    }
}