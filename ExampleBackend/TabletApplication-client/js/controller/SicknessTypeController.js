const axios = require('axios');

class SicknessTypeController{
    // getSickness(){
    //     const sql = `SELECT * FROM SicknessTypes`;
    // }

    getSickness(){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/sickness')
                .then(function (response){
                    console.log(response);
                    resolve(response.data);
                })
                .catch(function (err){
                    console.log(err);
                    reject(response);
                })
        });
    }
}

module.exports = SicknessTypeController;