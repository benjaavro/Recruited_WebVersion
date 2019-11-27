const axios = require('axios')

class VendorController{
    getVendors(){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/vendor')
            .then(function(response){
                console.log(response);
                resolve(response.data);
            }).catch(function(err){
                console.log(err);
                reject(response);
            })
        });
    }
}

module.exports = VendorController;