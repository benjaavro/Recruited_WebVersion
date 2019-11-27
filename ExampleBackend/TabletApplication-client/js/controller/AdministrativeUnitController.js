const axios = require('axios');

class RanchAndSectionController{
    getRanches(){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/ranch')
            .then(function(response){
                console.log(response);
                resolve(response.data);
            }).catch(function(err){
                console.log(err);
                reject(response);
            })
        });
    }

    getSections(ranch){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/ranch/section/'+ranch)
            .then(function(response){
                console.log(response);
                resolve(response.data);
            }).catch(function(err){
                console.log(err);
                reject(response);
            })
        });
    }

    getCostCenters(ranch){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/ranch/costcenter/'+ranch)
            .then(function(response){
                console.log(response);
                resolve(response.data);
            }).catch(function(err){
                console.log(err);
                reject(response);
            })
        })
    }

    getCostCentersForRanch(ranch){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/ranch/user/'+ranch)
            .then(function(response){
                console.log(response);
                resolve(response.data);
            }).catch(function(err){
                console.log(err);
                reject(response);
            })
        })
    }
}

module.exports = RanchAndSectionController;