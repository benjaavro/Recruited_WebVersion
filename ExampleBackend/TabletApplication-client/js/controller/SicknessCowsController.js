const axios = require('axios');

class SicknessCowsController{

    createSickness(sickness){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/sicknesscows/save',sickness)
                .then(function(success){
                    console.log(success);
                    resolve(success);
                }).catch(function(err){
                console.log(err);
                reject(err);
            })
        })
    }

    getLatestSicknes(sicknesId, earringId){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/sicknesscows/'+sicknesId+'/'+earringId)
                .then(function(success){
                    console.log(success);
                    resolve(success.data);
                }).catch(function(err){
                console.log(err);
                reject(err);
            })
        })
    }
    // getLatestSicknes(sicknesId, earringId){
    //     const selectSql = `SELECT * FROM SicknessCows
    //         WHERE numIncidente IN(
    //             SELECT MAX(numIncidente) FROM SicknessCows
    //                 WHERE sicknessId=? AND animalEarringId=?)`;
    //
    //     const params = [sicknesId,earringId];
    // }
}


module.exports = SicknessCowsController;