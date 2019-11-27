const axios = require('axios')

class MeasuresController{
    measureAnimal(item){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/measures/save',item)
                .then(function(success){
                    console.log(success);
                    resolve(success);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                })
        });
    }

    getAnimalMeasures(sectionLookup){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/measures/'+sectionLookup)
                .then(function(success){
                    console.log(success);
                    resolve(success.data);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                })
        });
    }

}

module.exports = MeasuresController;