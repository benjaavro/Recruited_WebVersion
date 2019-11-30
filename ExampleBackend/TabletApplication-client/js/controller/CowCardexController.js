const axios = require('axios');

class CowCardexController{
    createCowCardex(payload){
        console.log(payload);
        
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/animalcardex/create',payload)
                .then(function(success){
                    console.log(success);
                    resolve(success);
                }).catch(function(err){
                    console.log(err.response);
                    reject(err);
                })
        });
    }

    getCowForId(id){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/animalcardex/forearringid/'+id)
            .then(function (response) {
                resolve(response.data);
            }).catch(function(err){
                reject(err.data);
            })
        });
    }
}

module.exports = CowCardexController;