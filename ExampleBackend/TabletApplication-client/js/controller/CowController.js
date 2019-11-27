const axios = require('axios');

class CowController{
    createCow(cow){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/animal',cow)
                .then(function(success){
                    console.log(success);
                    resolve(success);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                })
        });
    }

    getCowsForSection(sectionLookup){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/animal/sid/'+sectionLookup)
            .then(response=>{
                resolve(response.data)
            }).catch(err=>{
                reject(err);
            })
        });
    }
}

module.exports = CowController;